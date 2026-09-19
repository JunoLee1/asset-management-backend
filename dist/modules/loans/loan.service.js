"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const logger_1 = require("../../lib/logger");
const pagination_1 = require("../../lib/pagination");
const loan_types_1 = require("./loan.types");
const notification_service_1 = require("../notifications/notification.service");
// 대여 상태 전이 매트릭스 — ADR 0003: PENDING_DEPT 단계 추가 (3단계 결재)
// PENDING_MANAGER 는 부서장 미배정 시 PENDING_ADMIN 으로도 가능 (fallback)
const ALLOWED_TRANSITIONS = {
    PENDING_MANAGER: ['PENDING_DEPT', 'PENDING_ADMIN', 'REJECTED', 'CANCELLED'],
    PENDING_DEPT: ['PENDING_ADMIN', 'REJECTED', 'CANCELLED'],
    PENDING_ADMIN: ['APPROVED', 'REJECTED'],
    APPROVED: ['CHECKED_OUT', 'REJECTED'],
    CHECKED_OUT: ['RECEIVED', 'RECALLED'],
    RECEIVED: ['PENDING_INSPECTION', 'RECALLED'],
    PENDING_INSPECTION: ['INSPECTED'],
    INSPECTED: ['PENDING_RETURN_ADMIN'],
    PENDING_RETURN_ADMIN: ['RETURNED'],
    RETURNED: [],
    REJECTED: [],
    CANCELLED: [],
    RECALLED: [],
};
const LOAN_INCLUDE = {
    asset: {
        select: {
            id: true,
            assetCode: true,
            name: true,
            class: true,
            condition: true,
            status: true,
            assignedUserId: true,
            category: { select: { name: true } },
        },
    },
    user: {
        select: {
            id: true,
            name: true,
            email: true,
            team: {
                select: {
                    name: true,
                    teamLeadId: true,
                    teamLead: { select: { id: true, name: true, isOutOfOffice: true } },
                },
            },
        },
    },
    checkoutLocation: { select: { id: true, name: true } },
    loanReturn: {
        include: {
            inspectedBy: { select: { id: true, name: true } }, // 검수자 (ASSET_MANAGER/ADMIN)
            returnApprovedBy: { select: { id: true, name: true } }, // 반납 1차 승인자 (MANAGER)
            finalizedBy: { select: { id: true, name: true } }, // 최종 회수 처리자 (ADMIN)
        },
    },
};
// ─────────────────────────────────────────
// Response mapping
// ─────────────────────────────────────────
const toListItem = (row) => ({
    id: row.id,
    status: row.status,
    assetId: row.assetId,
    assetCode: row.asset.assetCode,
    assetName: row.asset.name,
    assetClass: row.asset.class,
    assetCategoryName: row.asset.category?.name ?? null,
    assetCondition: row.asset.condition,
    userId: row.userId,
    userName: row.user.name,
    userEmail: row.user.email,
    userDepartmentName: row.user.team?.name ?? null,
    departmentManagerName: row.user.team?.teamLead?.name ?? null,
    departmentManagerId: row.user.team?.teamLeadId ?? null,
    departmentManagerIsOutOfOffice: row.user.team?.teamLead?.isOutOfOffice ?? false,
    purpose: row.purpose,
    dueDate: row.dueDate,
    checkedOutAt: row.checkedOutAt,
    receivedAt: row.receivedAt,
    returnedAt: row.loanReturn?.finalizedAt ?? null,
    rejectReason: row.rejectReason,
    recallReason: row.recallReason,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
});
// T2: 검수 전부터 부분 정보 노출 (PENDING_INSPECTION 단계부터 LoanReturn row 있음)
const toReturnDetail = (row) => {
    const r = row.loanReturn;
    if (!r)
        return null; // 반납의 기록이 없는 경우도 정상이기에 null
    return {
        id: r.id,
        returnRequestedAt: r.returnRequestedAt,
        conditionBefore: row.asset.condition,
        inspectedAt: r.inspectedAt,
        inspectedByName: r.inspectedBy?.name ?? null,
        conditionAfter: r.condition ? loan_types_1.CONDITION_MAP[r.condition] : null,
        damageNote: r.damageNote,
        resultAction: r.condition ? loan_types_1.ACTION_MAP[r.condition] : null,
        returnApprovedAt: r.returnApprovedAt,
        returnApprovedByName: r.returnApprovedBy?.name ?? null,
        finalizedAt: r.finalizedAt,
        finalizedByName: r.finalizedBy?.name ?? null,
        // 기존 호환
        returnedAt: r.finalizedAt,
        receivedByName: r.finalizedBy?.name ?? r.inspectedBy?.name ?? '',
    };
};
const toDetail = (row) => ({
    ...toListItem(row),
    rejectReason: row.rejectReason,
    recallReason: row.recallReason,
    checkoutMemo: row.checkoutMemo,
    checkoutLocationId: row.checkoutLocationId,
    checkoutLocationName: row.checkoutLocation?.name ?? null,
    // L4: 대여 timeline (상세에서만 노출)
    managerApprovedAt: row.managerApprovedAt,
    adminApprovedAt: row.adminApprovedAt,
    cancelledAt: row.cancelledAt,
    rejectedAt: row.rejectedAt,
    recalledAt: row.recalledAt,
    loanReturn: toReturnDetail(row),
});
// ─────────────────────────────────────────
// Guards
// ─────────────────────────────────────────
const assertTransition = (from, to) => {
    if (!ALLOWED_TRANSITIONS[from].includes(to)) {
        throw new AppError_1.AppError(400, `${from} → ${to} 전이는 허용되지 않습니다.`);
    }
};
const assertNotSelfApprove = (loan, requester) => {
    if (loan.userId === requester.id) {
        throw new AppError_1.AppError(403, '대여 승인/거절은 본인이 할 수 없습니다.');
    }
};
// ─────────────────────────────────────────
// EDF (W3) — 큐 상태 (PENDING_MANAGER / PENDING_ADMIN) 정렬용
// bucket 0 = 신입(30일 이내) AND 본인 보유 기기 IN_PROGRESS maintenance 존재
// bucket 1 = 그 외. 같은 bucket 안에서는 maintenance.estimatedCompletionDate 임박순.
// ETA 없으면 createdAt fallback.
// ─────────────────────────────────────────
const NEWBIE_WINDOW_DAYS = 30;
const NEWBIE_WINDOW_MS = NEWBIE_WINDOW_DAYS * 24 * 60 * 60 * 1000;
const isQueueStatus = (s) => s === 'PENDING_MANAGER' || s === 'PENDING_DEPT' || s === 'PENDING_ADMIN';
const computeEdfMetrics = (row, now) => {
    // hireDate 없으면 hireMs=0 (1970-01-01) → now-0 > NEWBIE_WINDOW_MS → isNewbie=false 자연
    const hireMs = row.user.hireDate?.getTime() ?? 0;
    const isNewbie = now - hireMs <= NEWBIE_WINDOW_MS;
    const etaList = row.user.assignedAssets
        .flatMap((a) => a.maintenances) // 검수 완료된 모든 기기 조회
        .map((m) => m.estimatedCompletionDate?.getTime() ?? null) //
        .filter((t) => t !== null); // type guard to be narrow number[]
    const hasInProgressMaint = row.user.assignedAssets.some((a) => a.maintenances.length > 0);
    const earliestEta = etaList.length > 0 ? Math.min(...etaList) : null;
    const bucket = isNewbie && hasInProgressMaint ? 0 : 1; // 0 = emergency, 1 = normal
    const deadline = earliestEta ?? row.createdAt.getTime();
    return { bucket, deadline };
};
// 알림 hook 들은 notificationService 로 직접 wiring (Phase C 완료)
// ─────────────────────────────────────────
// Read
// ─────────────────────────────────────────
const list = async (query, requester) => {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;
    const where = {};
    // role/keyword 두 OR 조건이 겹칠 수 있으므로 AND 배열에 누적
    const andConditions = [];
    if (query.status)
        where['status'] = query.status;
    if (query.userId)
        where['userId'] = query.userId;
    if (query.assetId)
        where['assetId'] = query.assetId;
    if (query.overdueOnly) {
        where['status'] = { in: ['CHECKED_OUT', 'RECEIVED'] };
        where['dueDate'] = { lt: new Date() };
    }
    if (requester.role === 'USER') {
        andConditions.push({
            OR: [{ userId: requester.id }, { asset: { assignedUserId: requester.id } }],
        });
    }
    if (requester.role === 'TEAM_LEAD') {
        const managedTeams = await prisma_1.prisma.team.findMany({
            where: { teamLeadId: requester.id },
            select: { id: true },
        });
        const managedIds = managedTeams.map((d) => d.id);
        andConditions.push({
            OR: [
                { user: { teamId: { in: managedIds } } },
                { asset: { assignedUser: { teamId: { in: managedIds } } } },
            ],
        });
    }
    if (query.keyword) {
        const q = query.keyword;
        andConditions.push({
            OR: [
                { user: { name: { contains: q, mode: 'insensitive' } } },
                { asset: { name: { contains: q, mode: 'insensitive' } } },
                { asset: { assetCode: { contains: q, mode: 'insensitive' } } },
            ],
        });
    }
    if (andConditions.length > 0)
        where['AND'] = andConditions;
    // EDF (W3): 큐 상태 조회 시에만 별도 분기 — 메모리 정렬
    if (isQueueStatus(query.status)) {
        const rows = await prisma_1.prisma.loan.findMany({
            where,
            include: {
                ...LOAN_INCLUDE,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        team: {
                            select: {
                                name: true,
                                teamLeadId: true,
                                teamLead: { select: { id: true, name: true, isOutOfOffice: true } },
                            },
                        },
                        hireDate: true,
                        assignedAssets: {
                            select: {
                                maintenances: {
                                    where: { status: 'IN_PROGRESS' },
                                    select: { estimatedCompletionDate: true },
                                },
                            },
                        },
                    },
                },
            },
        });
        const now = Date.now();
        const sorted = rows
            .map((r) => ({ row: r, metrics: computeEdfMetrics(r, now) }))
            .sort((a, b) => {
            if (a.metrics.bucket !== b.metrics.bucket)
                return a.metrics.bucket - b.metrics.bucket;
            return a.metrics.deadline - b.metrics.deadline;
        });
        const total = sorted.length;
        const items = sorted.slice(skip, skip + pageSize).map((x) => toListItem(x.row));
        return (0, pagination_1.paginate)(items, total, page, pageSize);
    }
    // 일반 list — createdAt desc
    const [rows, total] = await Promise.all([
        prisma_1.prisma.loan.findMany({
            where,
            include: LOAN_INCLUDE,
            orderBy: { createdAt: 'desc' },
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.loan.count({ where }),
    ]);
    return (0, pagination_1.paginate)(rows.map(toListItem), total, page, pageSize);
};
const getById = async (id, requester) => {
    const row = await prisma_1.prisma.loan.findUnique({ where: { id }, include: LOAN_INCLUDE });
    if (!row)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (requester.role === 'USER' &&
        row.userId !== requester.id &&
        row.asset.assignedUserId !== requester.id) {
        throw new AppError_1.AppError(403, '조회 권한이 없습니다.');
    }
    return toDetail(row);
};
const my = async (requester) => {
    const rows = await prisma_1.prisma.loan.findMany({
        where: { userId: requester.id },
        include: LOAN_INCLUDE,
        orderBy: { createdAt: 'desc' },
    });
    return rows.map(toListItem);
};
const overdue = async (requester) => {
    const where = {
        status: { in: ['CHECKED_OUT', 'RECEIVED'] },
        dueDate: { lt: new Date() },
    };
    if (requester.role === 'USER') {
        where['OR'] = [{ userId: requester.id }, { asset: { assignedUserId: requester.id } }];
    }
    if (requester.role === 'TEAM_LEAD') {
        const managedTeams = await prisma_1.prisma.team.findMany({
            where: { teamLeadId: requester.id },
            select: { id: true },
        });
        const managedIds = managedTeams.map((d) => d.id);
        where['OR'] = [
            { user: { teamId: { in: managedIds } } },
            { asset: { assignedUser: { teamId: { in: managedIds } } } },
        ];
    }
    const rows = await prisma_1.prisma.loan.findMany({
        where,
        include: LOAN_INCLUDE,
        orderBy: { dueDate: 'asc' },
    });
    return rows.map(toListItem);
};
// QR 디코드 후 호출: assetCode 로 본인의 active CHECKED_OUT loan 찾기
const lookup = async (assetCode, requester) => {
    const row = await prisma_1.prisma.loan.findFirst({
        where: {
            asset: { assetCode },
            userId: requester.id,
            status: 'CHECKED_OUT',
        },
        include: LOAN_INCLUDE,
    });
    if (!row) {
        throw new AppError_1.AppError(404, '해당 자산의 수령 대기 중인 본인 대여를 찾을 수 없습니다.');
    }
    return toDetail(row);
};
// ─────────────────────────────────────────
// Write — 대여 흐름
// ─────────────────────────────────────────
const create = async (input, requester) => {
    const asset = await prisma_1.prisma.asset.findUnique({ where: { id: input.assetId } });
    if (!asset)
        throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
    // 정책: IT 자산만 대여 가능. 사무 자산은 담당자 배정만, 시설 자산은 회사 인프라.
    if (asset.class !== 'IT_ASSET') {
        throw new AppError_1.AppError(400, asset.class === 'FACILITY_ASSET'
            ? '시설 자산은 대여할 수 없습니다.'
            : '사무 자산은 대여할 수 없습니다. (담당자 배정만 가능)');
    }
    if (asset.status !== 'IDLE') {
        throw new AppError_1.AppError(400, '대여 가능 상태가 아닌 자산입니다.');
    }
    if (asset.assignedUserId === requester.id) {
        throw new AppError_1.AppError(400, '이미 본인에게 할당된 자산입니다.');
    }
    const created = await prisma_1.prisma.loan.create({
        data: {
            assetId: input.assetId,
            userId: requester.id,
            purpose: input.purpose,
            dueDate: input.dueDate
                ? new Date(input.dueDate)
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            status: 'PENDING_MANAGER',
        },
    });
    logger_1.logger.info({ event: 'loan_created', id: created.id, assetId: input.assetId, userId: requester.id }, '대여 신청');
    // 1차 승인자에게 알림 (실패해도 대여 신청은 성공으로 처리)
    try {
        const applicant = await prisma_1.prisma.user.findUnique({
            where: { id: requester.id },
            select: { name: true, teamId: true },
        });
        await notification_service_1.notificationService.createLoanRequestedNotifications({
            loanId: created.id,
            assetCode: asset.assetCode,
            assetName: asset.name,
            applicantName: applicant?.name ?? '신청자',
            applicantTeamId: applicant?.teamId ?? null,
            applicantId: requester.id,
        });
    }
    catch (err) {
        logger_1.logger.warn({ event: 'loan_request_notify_failed', loanId: created.id, err }, '대여 신청 알림 발송 실패');
    }
    return getById(created.id, requester);
};
// S1 — 4개 endpoint 분리 (grill-me #1 결과). 각 단계의 의도가 endpoint 자체로 명확.
// 대여 1차 승인 — PENDING_MANAGER → PENDING_ADMIN
const approveManager = async (id, body, requester) => {
    if (requester.role !== 'TEAM_LEAD' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '매니저 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    teamId: true,
                    team: {
                        select: {
                            teamLeadId: true,
                            teamLead: { select: { id: true, isOutOfOffice: true } },
                            department: {
                                select: { id: true, leaderId: true },
                            },
                        },
                    },
                },
            },
        },
    });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (requester.role === 'TEAM_LEAD') {
        const managedTeams = await prisma_1.prisma.team.findMany({
            where: { teamLeadId: requester.id },
            select: { id: true },
        });
        const managedIds = managedTeams.map((d) => d.id);
        if (!loan.user.teamId || !managedIds.includes(loan.user.teamId)) {
            throw new AppError_1.AppError(403, '담당 부서의 대여만 승인할 수 있습니다.');
        }
    }
    if (requester.role === 'ADMIN') {
        const mgr = loan.user.team?.teamLead;
        if (mgr && !mgr.isOutOfOffice) {
            throw new AppError_1.AppError(403, '담당 팀장이 재직 중입니다. 팀장을 통해 승인하세요.');
        }
    }
    assertNotSelfApprove(loan, requester);
    if (loan.status !== 'PENDING_MANAGER') {
        throw new AppError_1.AppError(400, `PENDING_MANAGER 상태에서만 호출 가능 (현재: ${loan.status})`);
    }
    // ADR 0003 — 부서장(DEPT_LEAD) 미배정 또는 신청자가 곧 부서장이면 PENDING_DEPT 단계 스킵
    const deptLeaderId = loan.user.team?.department?.leaderId ?? null;
    const skipDept = !deptLeaderId || deptLeaderId === loan.userId;
    const nextStatus = skipDept ? 'PENDING_ADMIN' : 'PENDING_DEPT';
    assertTransition(loan.status, nextStatus);
    await prisma_1.prisma.loan.update({
        where: { id },
        data: {
            status: nextStatus,
            managerApprovedAt: new Date(),
            managerApprovedById: requester.id,
            checkoutLocationId: body.checkoutLocationId ?? loan.checkoutLocationId,
            checkoutMemo: body.checkoutMemo ?? loan.checkoutMemo,
        },
    });
    logger_1.logger.info({ event: 'loan_approved_manager', id, by: requester.id, nextStatus }, '대여 MANAGER 승인');
    // 다음 단계 책임자에게 알림 — PENDING_DEPT 면 부서장, PENDING_ADMIN 이면 ADMIN 전원
    try {
        const detail = await prisma_1.prisma.loan.findUnique({
            where: { id },
            include: {
                asset: { select: { assetCode: true, name: true } },
                user: { select: { name: true } },
            },
        });
        if (detail && nextStatus === 'PENDING_ADMIN') {
            await notification_service_1.notificationService.createLoanPendingAdminNotifications({
                loanId: id,
                assetCode: detail.asset.assetCode,
                assetName: detail.asset.name,
                applicantName: detail.user.name,
            });
        }
        // PENDING_DEPT 알림은 notification service 에 helper 추가 후 — 이번 PR 범위 외 (TODO)
    }
    catch (err) {
        logger_1.logger.warn({ event: 'loan_post_manager_notify_failed', id, err }, '관리자 승인 후 알림 실패');
    }
    return getById(id, requester);
};
// 대여 2차 승인 — PENDING_DEPT → PENDING_ADMIN (ADR 0003)
// DEPT_LEAD 본인 부서만, ADMIN 은 부서장 부재 시 대행 가능
const approveDept = async (id, body, requester) => {
    if (requester.role !== 'DEPT_LEAD' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '부서장 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    team: {
                        select: {
                            department: {
                                select: { id: true, leaderId: true },
                            },
                        },
                    },
                },
            },
        },
    });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    const departmentId = loan.user.team?.department?.id ?? null;
    const deptLeaderId = loan.user.team?.department?.leaderId ?? null;
    if (requester.role === 'DEPT_LEAD') {
        if (!departmentId || deptLeaderId !== requester.id) {
            throw new AppError_1.AppError(403, '담당 부서의 대여만 승인할 수 있습니다.');
        }
    }
    if (requester.role === 'ADMIN' && deptLeaderId) {
        // 부서장이 배정되어 있는데 ADMIN 이 직접 누르려는 경우 — 부재 룰 확장 여지 (지금은 막음)
        throw new AppError_1.AppError(403, '담당 부서장이 배정되어 있습니다. 부서장을 통해 승인하세요.');
    }
    assertNotSelfApprove(loan, requester);
    if (loan.status !== 'PENDING_DEPT') {
        throw new AppError_1.AppError(400, `PENDING_DEPT 상태에서만 호출 가능 (현재: ${loan.status})`);
    }
    assertTransition(loan.status, 'PENDING_ADMIN');
    await prisma_1.prisma.loan.update({
        where: { id },
        data: {
            status: 'PENDING_ADMIN',
            deptApprovedAt: new Date(),
            deptApprovedById: requester.id,
            checkoutLocationId: body.checkoutLocationId ?? loan.checkoutLocationId,
            checkoutMemo: body.checkoutMemo ?? loan.checkoutMemo,
        },
    });
    logger_1.logger.info({ event: 'loan_approved_dept', id, by: requester.id }, '대여 DEPT 승인');
    // ADMIN 전원에게 최종 승인 대기 알림
    try {
        const detail = await prisma_1.prisma.loan.findUnique({
            where: { id },
            include: {
                asset: { select: { assetCode: true, name: true } },
                user: { select: { name: true } },
            },
        });
        if (detail) {
            await notification_service_1.notificationService.createLoanPendingAdminNotifications({
                loanId: id,
                assetCode: detail.asset.assetCode,
                assetName: detail.asset.name,
                applicantName: detail.user.name,
            });
        }
    }
    catch (err) {
        logger_1.logger.warn({ event: 'loan_pending_admin_notify_failed', id, err }, '최종 승인 대기 알림 실패');
    }
    return getById(id, requester);
};
// 대여 2차 승인 — PENDING_ADMIN → APPROVED + 사원에게 알림
const approveAdmin = async (id, body, requester) => {
    if (requester.role !== 'ASSET_MANAGER' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '자산담당자 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    assertNotSelfApprove(loan, requester);
    // ASSET_MANAGER 본인 대여 — ADMIN 전용 승인 (다른 ASSET_MANAGER 불가)
    const requester_user = await prisma_1.prisma.user.findUnique({
        where: { id: loan.userId },
        select: { role: true },
    });
    if (requester_user?.role === 'ASSET_MANAGER' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '자산관리자 본인 대여는 ADMIN만 승인할 수 있습니다.');
    }
    if (loan.status !== 'PENDING_ADMIN') {
        throw new AppError_1.AppError(400, `PENDING_ADMIN 상태에서만 호출 가능 (현재: ${loan.status})`);
    }
    assertTransition(loan.status, 'APPROVED');
    await prisma_1.prisma.loan.update({
        where: { id },
        data: {
            status: 'APPROVED',
            adminApprovedAt: new Date(),
            adminApprovedById: requester.id,
            checkoutLocationId: body.checkoutLocationId ?? loan.checkoutLocationId,
            checkoutMemo: body.checkoutMemo ?? loan.checkoutMemo,
        },
    });
    logger_1.logger.info({ event: 'loan_approved_admin', id, by: requester.id }, '대여 ADMIN 승인');
    // T-AB: APPROVED 시점에 사원에게 알림 (X3 outbox — best effort)
    const assetInfo = await prisma_1.prisma.asset.findUnique({
        where: { id: loan.assetId },
        select: { assetCode: true, name: true },
    });
    if (assetInfo) {
        await notification_service_1.notificationService.createLoanApprovedNotification({
            loanId: id,
            recipientUserId: loan.userId,
            assetCode: assetInfo.assetCode,
            assetName: assetInfo.name,
        });
    }
    return getById(id, requester);
};
// 반납 1차 승인 — INSPECTED → PENDING_RETURN_ADMIN (MANAGER 검수 결과 확인)
const approveReturnManager = async (id, requester) => {
    if (requester.role !== 'TEAM_LEAD' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '매니저 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    teamId: true,
                    team: {
                        select: {
                            teamLeadId: true,
                            teamLead: { select: { id: true, isOutOfOffice: true } },
                        },
                    },
                },
            },
        },
    });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (requester.role === 'TEAM_LEAD') {
        const managedTeams = await prisma_1.prisma.team.findMany({
            where: { teamLeadId: requester.id },
            select: { id: true },
        });
        const managedIds = managedTeams.map((t) => t.id);
        if (!loan.user.teamId || !managedIds.includes(loan.user.teamId)) {
            throw new AppError_1.AppError(403, '담당 부서의 반납만 승인할 수 있습니다.');
        }
    }
    if (requester.role === 'ADMIN') {
        const mgr = loan.user.team?.teamLead;
        if (mgr && !mgr.isOutOfOffice) {
            throw new AppError_1.AppError(403, '담당 팀장이 재직 중입니다. 팀장을 통해 승인하세요.');
        }
    }
    assertNotSelfApprove(loan, requester);
    if (loan.status !== 'INSPECTED') {
        throw new AppError_1.AppError(400, `INSPECTED 상태에서만 호출 가능 (현재: ${loan.status})`);
    }
    assertTransition(loan.status, 'PENDING_RETURN_ADMIN');
    await prisma_1.prisma.$transaction([
        prisma_1.prisma.loan.update({ where: { id }, data: { status: 'PENDING_RETURN_ADMIN' } }),
        prisma_1.prisma.loanReturn.update({
            where: { loanId: id },
            data: { returnApprovedAt: new Date(), returnApprovedById: requester.id },
        }),
    ]);
    logger_1.logger.info({ event: 'loan_return_approved_manager', id, by: requester.id }, '반납 MANAGER 승인');
    return getById(id, requester);
};
// 반납 최종 — PENDING_RETURN_ADMIN → RETURNED + Asset 갱신 + 이력
const finalizeReturn = async (id, requester) => {
    if (requester.role !== 'ASSET_MANAGER' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '자산담당자 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    assertNotSelfApprove(loan, requester);
    if (loan.status !== 'PENDING_RETURN_ADMIN') {
        throw new AppError_1.AppError(400, `PENDING_RETURN_ADMIN 상태에서만 호출 가능 (현재: ${loan.status})`);
    }
    assertTransition(loan.status, 'RETURNED');
    await prisma_1.prisma.$transaction(async (tx) => {
        const lr = await tx.loanReturn.findUnique({ where: { loanId: id } });
        if (!lr || !lr.condition) {
            throw new AppError_1.AppError(500, '검수 결과가 없습니다.');
        }
        const newAssetCondition = loan_types_1.CONDITION_MAP[lr.condition];
        const isLost = lr.condition === 'LOST';
        const needsRepair = loan_types_1.ACTION_MAP[lr.condition] === 'NEEDS_REPAIR';
        const newAssetStatus = isLost ? 'RETIRED' : needsRepair ? 'REPAIR' : 'IDLE';
        await tx.loan.update({ where: { id }, data: { status: 'RETURNED' } });
        await tx.loanReturn.update({
            where: { loanId: id },
            data: { finalizedAt: new Date(), finalizedById: requester.id },
        });
        await tx.asset.update({
            where: { id: loan.assetId },
            data: {
                status: newAssetStatus,
                assignedUserId: null,
                condition: newAssetCondition,
                conditionAssessedAt: new Date(),
            },
        });
        await tx.assetHistory.create({
            data: {
                assetId: loan.assetId,
                action: 'UNASSIGNED',
                description: `반납 회수 (loan ${id})`,
                metadata: { loanId: id, condition: lr.condition, damageNote: lr.damageNote },
                performedById: requester.id,
            },
        });
        if (needsRepair) {
            // inspect 단계에서 이미 maintenance 가 생성됐는지 확인 (description 의 (loan:ID) 토큰)
            const existing = await tx.maintenance.findFirst({
                where: { assetId: loan.assetId, description: { contains: `(loan:${id})` } },
                select: { id: true },
            });
            if (!existing) {
                await tx.maintenance.create({
                    data: {
                        assetId: loan.assetId,
                        title: '반납 검수 후 수리',
                        description: `${lr.damageNote ?? `반납 검수 결과 ${lr.condition} — 수리 필요`} (loan:${id})`,
                        status: 'APPROVED',
                        scheduledAt: new Date(),
                        requestedById: requester.id,
                    },
                });
            }
        }
    });
    logger_1.logger.info({ event: 'loan_returned', id, by: requester.id }, '반납 ADMIN 회수');
    return getById(id, requester);
};
// ADMIN 출고 처리: APPROVED → CHECKED_OUT
const checkout = async (id, body, requester) => {
    if (requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    assertTransition(loan.status, 'CHECKED_OUT');
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.loan.update({
            where: { id },
            data: {
                status: 'CHECKED_OUT',
                checkedOutAt: new Date(),
                checkedOutById: requester.id,
                checkoutLocationId: body.checkoutLocationId ?? loan.checkoutLocationId,
                checkoutMemo: body.checkoutMemo ?? loan.checkoutMemo,
            },
        });
        await tx.asset.update({
            where: { id: loan.assetId },
            data: { status: 'OPERATING', assignedUserId: loan.userId },
        });
        await tx.assetHistory.create({
            data: {
                assetId: loan.assetId,
                action: 'ASSIGNED',
                description: `대여 출고 (loan ${id})`,
                metadata: { loanId: id, userId: loan.userId },
                performedById: requester.id,
            },
        });
    });
    logger_1.logger.info({ event: 'loan_checked_out', id, by: requester.id }, '대여 출고');
    // T-AB: CHECKED_OUT 시점에 사원에게 알림 (X3 outbox — best effort)
    const checkoutAssetInfo = await prisma_1.prisma.asset.findUnique({
        where: { id: loan.assetId },
        select: { assetCode: true, name: true },
    });
    if (checkoutAssetInfo) {
        await notification_service_1.notificationService.createLoanCheckedOutNotification({
            loanId: id,
            recipientUserId: loan.userId,
            assetCode: checkoutAssetInfo.assetCode,
            assetName: checkoutAssetInfo.name,
        });
    }
    return getById(id, requester);
};
// R-1: 사원 QR 스캔 수령 확정 — CHECKED_OUT → RECEIVED
const receive = async (id, requester) => {
    const loan = await prisma_1.prisma.loan.findUnique({
        where: { id },
        include: { asset: { select: { assetCode: true, name: true } } },
    });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (loan.userId !== requester.id) {
        throw new AppError_1.AppError(403, '본인이 대여한 건만 수령 확정할 수 있습니다.');
    }
    if (loan.status !== 'CHECKED_OUT') {
        throw new AppError_1.AppError(400, 'CHECKED_OUT 상태의 대여만 수령 확정할 수 있습니다.');
    }
    assertTransition(loan.status, 'RECEIVED');
    await prisma_1.prisma.loan.update({
        where: { id },
        data: {
            status: 'RECEIVED',
            receivedAt: new Date(),
            receivedById: requester.id,
        },
    });
    logger_1.logger.info({ event: 'loan_received', id, by: requester.id }, '대여 수령 확정');
    // MANAGER/ADMIN 에게 알림 (X3 outbox — best effort)
    const receiverUser = await prisma_1.prisma.user.findUnique({
        where: { id: requester.id },
        select: { name: true },
    });
    await notification_service_1.notificationService.createLoanReceivedNotifications({
        loanId: id,
        assetCode: loan.asset.assetCode,
        assetName: loan.asset.name,
        receiverName: receiverUser?.name ?? '',
    });
    return getById(id, requester);
};
const reject = async (id, body, requester) => {
    if (requester.role !== 'TEAM_LEAD' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '매니저 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    assertNotSelfApprove(loan, requester);
    if (!ALLOWED_TRANSITIONS[loan.status].includes('REJECTED')) {
        throw new AppError_1.AppError(400, `현재 상태(${loan.status})에서는 거절할 수 없습니다.`);
    }
    await prisma_1.prisma.loan.update({
        where: { id },
        data: {
            status: 'REJECTED',
            rejectReason: body.reason,
            rejectedAt: new Date(),
            rejectedById: requester.id,
        },
    });
    logger_1.logger.info({ event: 'loan_rejected', id, by: requester.id }, '대여 거절');
    return getById(id, requester);
};
const cancel = async (id, requester) => {
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (loan.userId !== requester.id) {
        throw new AppError_1.AppError(403, '본인이 신청한 대여만 취소할 수 있습니다.');
    }
    if (loan.status !== 'PENDING_MANAGER') {
        throw new AppError_1.AppError(400, '승인 절차가 시작된 후에는 취소할 수 없습니다.');
    }
    await prisma_1.prisma.loan.update({
        where: { id },
        data: { status: 'CANCELLED', cancelledAt: new Date() },
    });
    logger_1.logger.info({ event: 'loan_cancelled', id, by: requester.id }, '대여 취소');
    return getById(id, requester);
};
const recall = async (id, body, requester) => {
    if (requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    // R-1: RECEIVED 상태도 강제 회수 가능 (CHECKED_OUT → RECALLED 또는 RECEIVED → RECALLED)
    if (loan.status !== 'CHECKED_OUT' && loan.status !== 'RECEIVED') {
        throw new AppError_1.AppError(400, 'CHECKED_OUT 또는 RECEIVED 상태의 대여만 강제 회수할 수 있습니다.');
    }
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.loan.update({
            where: { id },
            data: {
                status: 'RECALLED',
                recallReason: body.reason,
                recalledAt: new Date(),
                recalledById: requester.id,
            },
        });
        await tx.asset.update({
            where: { id: loan.assetId },
            data: { status: 'REPAIR', assignedUserId: null },
        });
        await tx.assetHistory.create({
            data: {
                assetId: loan.assetId,
                action: 'UNASSIGNED',
                description: `강제 회수 (loan ${id})`,
                metadata: { loanId: id, reason: body.reason },
                performedById: requester.id,
            },
        });
        await tx.maintenance.create({
            data: {
                assetId: loan.assetId,
                title: '강제 회수 후 검수',
                description: `강제 회수 사유: ${body.reason}`,
                status: 'APPROVED',
                scheduledAt: new Date(),
                requestedById: requester.id,
            },
        });
    });
    logger_1.logger.info({ event: 'loan_recalled', id, by: requester.id }, '대여 강제 회수');
    return getById(id, requester);
};
// ─────────────────────────────────────────
// Write — 반납 흐름
// ─────────────────────────────────────────
const requestReturn = async (id, requester) => {
    const loan = await prisma_1.prisma.loan.findUnique({
        where: { id },
        include: { asset: { select: { assetCode: true, name: true } } },
    });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (loan.userId !== requester.id) {
        throw new AppError_1.AppError(403, '본인이 대여한 건만 반납 요청할 수 있습니다.');
    }
    // R-1: RECEIVED 상태에서만 반납 요청 (CHECKED_OUT 은 미수령 상태라 반납 의미 X)
    if (loan.status !== 'RECEIVED') {
        throw new AppError_1.AppError(400, '기기 수령 시에만 반납 요청할 수 있습니다.');
    }
    assertTransition(loan.status, 'PENDING_INSPECTION');
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.loan.update({ where: { id }, data: { status: 'PENDING_INSPECTION' } });
        await tx.loanReturn.upsert({
            where: { loanId: id },
            create: { loanId: id },
            update: {},
        });
        // 반납 점검 maintenance 자동 생성 — 검수 단계에서 condition 에 따라 status 업데이트됨
        // (loan:${id}) 토큰 — inspect/finalizeReturn 에서 중복 방지·식별용
        const existing = await tx.maintenance.findFirst({
            where: { assetId: loan.assetId, description: { contains: `(loan:${id})` } },
            select: { id: true },
        });
        if (!existing) {
            await tx.maintenance.create({
                data: {
                    assetId: loan.assetId,
                    title: '반납 점검',
                    description: `${loan.asset.assetCode} (${loan.asset.name}) 반납 점검 대기 (loan:${id})`,
                    status: 'PENDING_MANAGER',
                    scheduledAt: new Date(),
                    requestedById: requester.id,
                },
            });
        }
    });
    logger_1.logger.info({ event: 'loan_return_requested', id, by: requester.id }, '반납 요청');
    // 검수자(ASSET_MANAGER/ADMIN)에게 검수 대기 알림 (best-effort)
    try {
        const applicant = await prisma_1.prisma.user.findUnique({
            where: { id: requester.id },
            select: { name: true },
        });
        await notification_service_1.notificationService.createLoanReturnRequestedNotifications({
            loanId: id,
            assetCode: loan.asset.assetCode,
            assetName: loan.asset.name,
            applicantName: applicant?.name ?? '사원',
        });
    }
    catch (err) {
        logger_1.logger.warn({ event: 'loan_return_notify_failed', loanId: id, err }, '반납 검수 대기 알림 발송 실패');
    }
    return getById(id, requester);
};
const inspect = async (id, body, requester) => {
    if (requester.role !== 'ASSET_MANAGER' && requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '자산담당자 또는 관리자 권한이 필요합니다.');
    }
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    assertNotSelfApprove(loan, requester);
    if (loan.status !== 'PENDING_INSPECTION') {
        throw new AppError_1.AppError(400, 'PENDING_INSPECTION 상태의 대여만 검수할 수 있습니다.');
    }
    assertTransition(loan.status, 'INSPECTED');
    // 손상(NEEDS_REPAIR) 판정 시 자동 maintenance 생성
    // 자산 status 는 아직 OPERATING 유지 (실제 회수는 finalizeReturn 단계)
    const needsRepair = loan_types_1.ACTION_MAP[body.condition] === 'NEEDS_REPAIR';
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.loan.update({ where: { id }, data: { status: 'INSPECTED' } });
        await tx.loanReturn.update({
            where: { loanId: id },
            data: {
                condition: body.condition,
                damageNote: body.damageNote ?? null,
                inspectedAt: new Date(),
                inspectedById: requester.id,
            },
        });
        // 반납 요청 시 생성된 maintenance 를 condition 에 맞춰 갱신
        // - needsRepair → APPROVED (수리 대기)
        // - GOOD / LOST → CANCELLED (수리 불필요 또는 폐기 대상)
        const existing = await tx.maintenance.findFirst({
            where: { assetId: loan.assetId, description: { contains: `(loan:${id})` } },
            select: { id: true },
        });
        const nextStatus = needsRepair ? 'APPROVED' : 'CANCELLED';
        const newDesc = needsRepair
            ? `${body.damageNote ?? `반납 검수 결과 ${body.condition} — 수리 필요`} (loan:${id})`
            : `반납 검수 결과 ${body.condition} — 수리 불필요 (loan:${id})`;
        if (existing) {
            await tx.maintenance.update({
                where: { id: existing.id },
                data: {
                    status: nextStatus,
                    title: needsRepair ? '반납 검수 후 수리' : '반납 점검 (완료)',
                    description: newDesc,
                },
            });
        }
        else if (needsRepair) {
            // 구버전 데이터 — requestReturn 시점에 maintenance 가 없던 경우 fallback 생성
            await tx.maintenance.create({
                data: {
                    assetId: loan.assetId,
                    title: '반납 검수 후 수리',
                    description: newDesc,
                    status: 'APPROVED',
                    scheduledAt: new Date(),
                    requestedById: requester.id,
                },
            });
        }
    });
    logger_1.logger.info({
        event: 'loan_inspected',
        id,
        by: requester.id,
        condition: body.condition,
        autoMaintenance: needsRepair,
    }, '반납 검수 완료');
    return getById(id, requester);
};
// ─────────────────────────────────────────
// 대여 연장 흐름 (팀장 → 관리자 2단계)
// ─────────────────────────────────────────
const requestExtension = async (id, days, requester) => {
    const loan = await prisma_1.prisma.loan.findUnique({ where: { id } });
    if (!loan)
        throw new AppError_1.AppError(404, '대여 건을 찾을 수 없습니다.');
    if (loan.userId !== requester.id)
        throw new AppError_1.AppError(403, '본인 대여만 연장 신청할 수 있습니다.');
    if (!['CHECKED_OUT', 'RECEIVED'].includes(loan.status))
        throw new AppError_1.AppError(400, '대여 중인 상태에서만 연장 신청할 수 있습니다.');
    if (days < 1 || days > 365)
        throw new AppError_1.AppError(400, '연장 기간은 1일 이상 365일 이하여야 합니다.');
    return prisma_1.prisma.loanExtension.create({
        data: { loanId: id, days, requestedById: requester.id, status: 'PENDING_MANAGER' },
    });
};
const approveExtensionManager = async (extensionId, requester) => {
    const ext = await prisma_1.prisma.loanExtension.findUnique({
        where: { id: extensionId },
        include: { loan: { include: { asset: { include: { department: true } } } } },
    });
    if (!ext)
        throw new AppError_1.AppError(404, '연장 신청을 찾을 수 없습니다.');
    if (ext.status !== 'PENDING_MANAGER')
        throw new AppError_1.AppError(400, '팀장 승인 대기 상태가 아닙니다.');
    if (requester.role === 'TEAM_LEAD') {
        const managedTeams = await prisma_1.prisma.team.findMany({
            where: { teamLeadId: requester.id },
            select: { departmentId: true },
        });
        const deptIds = managedTeams.map((t) => t.departmentId);
        if (!deptIds.includes(ext.loan.asset.departmentId))
            throw new AppError_1.AppError(403, '자산 소속 부서의 팀장만 승인할 수 있습니다.');
    }
    return prisma_1.prisma.loanExtension.update({
        where: { id: extensionId },
        data: {
            status: 'PENDING_ADMIN',
            managerApprovedById: requester.id,
            managerApprovedAt: new Date(),
        },
    });
};
const approveExtensionAdmin = async (extensionId, requester) => {
    if (requester.role !== 'ADMIN')
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    const ext = await prisma_1.prisma.loanExtension.findUnique({
        where: { id: extensionId },
        include: { loan: true },
    });
    if (!ext)
        throw new AppError_1.AppError(404, '연장 신청을 찾을 수 없습니다.');
    if (ext.status !== 'PENDING_ADMIN')
        throw new AppError_1.AppError(400, '관리자 승인 대기 상태가 아닙니다.');
    const currentDue = ext.loan.dueDate ?? new Date();
    const newDue = new Date(currentDue.getTime() + ext.days * 24 * 60 * 60 * 1000);
    return prisma_1.prisma.$transaction([
        prisma_1.prisma.loanExtension.update({
            where: { id: extensionId },
            data: { status: 'APPROVED', adminApprovedById: requester.id, adminApprovedAt: new Date() },
        }),
        prisma_1.prisma.loan.update({ where: { id: ext.loanId }, data: { dueDate: newDue } }),
    ]);
};
const rejectExtension = async (extensionId, reason, requester) => {
    const ext = await prisma_1.prisma.loanExtension.findUnique({ where: { id: extensionId } });
    if (!ext)
        throw new AppError_1.AppError(404, '연장 신청을 찾을 수 없습니다.');
    if (!['PENDING_MANAGER', 'PENDING_ADMIN'].includes(ext.status))
        throw new AppError_1.AppError(400, '승인 대기 상태가 아닙니다.');
    return prisma_1.prisma.loanExtension.update({
        where: { id: extensionId },
        data: {
            status: 'REJECTED',
            rejectionNote: reason,
            rejectedById: requester.id,
            rejectedAt: new Date(),
        },
    });
};
// D+1 / D+3 / D+7 연체 알림 발송
// CHECKED_OUT 또는 RECEIVED 상태이면서 dueDate 초과한 건을 대상으로 단계적 발송
const OVERDUE_STAGES = [
    { minDays: 1, count: 0 }, // count=0(미발송)이고 연체 1일 이상 → 1차 발송
    { minDays: 3, count: 1 }, // count=1이고 연체 3일 이상 → 2차 발송
    { minDays: 7, count: 2 }, // count=2이고 연체 7일 이상 → 3차 발송 (최종)
];
const notifyOverdueLoans = async () => {
    const now = new Date();
    let notified = 0;
    for (const stage of OVERDUE_STAGES) {
        const cutoff = new Date(now.getTime() - stage.minDays * 24 * 60 * 60 * 1000);
        const loans = await prisma_1.prisma.loan.findMany({
            where: {
                status: { in: ['CHECKED_OUT', 'RECEIVED'] },
                dueDate: { lt: cutoff },
                overdueNotifyCount: stage.count,
            },
            include: {
                user: { select: { id: true, name: true } },
                asset: { select: { name: true, assetCode: true } },
            },
        });
        for (const loan of loans) {
            const daysLabel = stage.count === 0 ? 'D+1' : stage.count === 1 ? 'D+3' : 'D+7';
            await notification_service_1.notificationService.createInApp({
                recipientId: loan.userId,
                type: 'LOAN_OVERDUE',
                title: `[연체 ${daysLabel}] ${loan.asset.name} 반납 기한 초과`,
                body: `${loan.user.name}님, ${loan.asset.assetCode} (${loan.asset.name}) 반납 기한이 지났습니다. 빠른 반납 부탁드립니다.`,
            });
            await prisma_1.prisma.loan.update({
                where: { id: loan.id },
                data: { overdueNotifyCount: { increment: 1 } },
            });
            notified++;
        }
    }
    return { notified };
};
exports.loanService = {
    list,
    getById,
    my,
    overdue,
    lookup,
    create,
    approveManager,
    approveDept,
    approveAdmin,
    approveReturnManager,
    finalizeReturn,
    checkout,
    receive,
    reject,
    cancel,
    recall,
    requestReturn,
    inspect,
    requestExtension,
    approveExtensionManager,
    approveExtensionAdmin,
    rejectExtension,
    notifyOverdueLoans,
};
//# sourceMappingURL=loan.service.js.map