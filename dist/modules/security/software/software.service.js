"use strict";
// ADR 0002 — Software (Shadow IT 인벤토리) service
//
// 핵심 책임:
//   - list / getById: 카탈로그 조회 (instance 집계로 userCount/lastUsedAt 계산)
//   - update: 기본정보 (name·vendor·type·category·description·licenseCoverage)
//   - updatePermission: 허가유무 변경 — 별 라우트, AuditLog 자동 (PERMISSION_GRANT/REVOKE/REVIEW)
//   - remove: 카탈로그 삭제 (instance + override + linkRel CASCADE)
//   - ingest: endpoint agent push — upsert Software+Instance+Device, AuditLog SOFTWARE_DISCOVERED
//
// ADR 0002 결정 4 (AND 규칙) 는 list 에서 base 상태만 노출 (override 합산 = detail 또는 별 API).
// 가정 4: 자동 License 매칭 없음. SoftwareLicenseLink 는 ASSET_MANAGER 가 수동.
Object.defineProperty(exports, "__esModule", { value: true });
exports.softwareService = void 0;
const enums_1 = require("../../../generated/prisma/enums");
const prisma_1 = require("../../../lib/prisma");
const AppError_1 = require("../../../lib/AppError");
const audit_service_1 = require("../audit/audit.service");
const notification_service_1 = require("../../notifications/notification.service");
// 권한 가드 — 메뉴 노출 가드와 별도. service 진입 시 강제.
const requireSoftwareReader = (requester) => {
    const allowed = [
        'ADMIN',
        'TEAM_LEAD',
        'ASSET_MANAGER',
        'SECURITY_OFFICER',
    ];
    if (!allowed.includes(requester.role)) {
        throw new AppError_1.AppError(403, 'Software 인벤토리 접근 권한이 없습니다.');
    }
};
// 카테고리/타입/기본정보 수정 권한 = ASSET_MANAGER 이상
const requireSoftwareEditor = (requester) => {
    const allowed = ['ADMIN', 'ASSET_MANAGER'];
    if (!allowed.includes(requester.role)) {
        throw new AppError_1.AppError(403, 'Software 정보 수정 권한이 없습니다.');
    }
};
// 허가유무 변경 권한 = SECURITY_OFFICER (또는 ADMIN 대행) — ADR 0002 결정 2
const requirePermissionDecider = (requester) => {
    const allowed = ['ADMIN', 'SECURITY_OFFICER'];
    if (!allowed.includes(requester.role)) {
        throw new AppError_1.AppError(403, '허가유무 변경 권한이 없습니다 (SECURITY_OFFICER 또는 ADMIN).');
    }
};
// 카탈로그 수동 등록 권한 — 사용자 결정 (2026-06-18): SECURITY_OFFICER 포함
const requireSoftwareCreator = (requester) => {
    const allowed = ['ADMIN', 'ASSET_MANAGER', 'SECURITY_OFFICER'];
    if (!allowed.includes(requester.role)) {
        throw new AppError_1.AppError(403, 'Software 카탈로그 등록 권한이 없습니다.');
    }
};
// list — 모든 Software + base permission + instance 집계
const list = async (query, requester) => {
    requireSoftwareReader(requester);
    const where = {};
    if (query.type)
        where.type = query.type;
    if (query.q) {
        where.OR = [
            { name: { contains: query.q, mode: 'insensitive' } },
            { vendor: { contains: query.q, mode: 'insensitive' } },
            { category: { contains: query.q, mode: 'insensitive' } },
        ];
    }
    if (query.permissionStatus) {
        where.basePermission = { status: query.permissionStatus };
    }
    if (query.licenseCoverage !== undefined) {
        where.licenseCoverage = query.licenseCoverage;
    }
    const rows = await prisma_1.prisma.software.findMany({
        where,
        include: {
            basePermission: true,
            instances: {
                select: { userId: true, executedOs: true, firstDiscoveredAt: true, lastUsedAt: true },
            },
        },
        orderBy: { name: 'asc' },
    });
    // 모든 software의 라이선스 할당 사용자를 한 번에 조회 (N+1 방지)
    const softwareIds = rows.map((r) => r.id);
    const licenseUsers = await prisma_1.prisma.softwareLicenseLink.findMany({
        where: { softwareId: { in: softwareIds } },
        include: {
            license: {
                include: {
                    assignments: { select: { userId: true } },
                },
            },
        },
    });
    // softwareId 별로 사용자 매핑
    const licenseUsersBySwId = new Map();
    for (const link of licenseUsers) {
        if (!licenseUsersBySwId.has(link.softwareId)) {
            licenseUsersBySwId.set(link.softwareId, new Set());
        }
        for (const assignment of link.license.assignments) {
            if (assignment.userId) {
                licenseUsersBySwId.get(link.softwareId)?.add(assignment.userId);
            }
        }
    }
    return rows.map((sw) => {
        // instances의 userId (실제 사용 데이터)
        const instanceUserIds = [];
        for (const i of sw.instances) {
            if (i.userId) {
                instanceUserIds.push(i.userId);
            }
        }
        // license 할당 사용자와 병합
        const userIds = new Set(instanceUserIds);
        const licenseUserIds = licenseUsersBySwId.get(sw.id);
        if (licenseUserIds) {
            licenseUserIds.forEach((uid) => userIds.add(uid));
        }
        const oses = sw.instances.map((i) => i.executedOs);
        const firsts = sw.instances.map((i) => i.firstDiscoveredAt.getTime());
        const lasts = sw.instances.map((i) => i.lastUsedAt.getTime());
        return {
            id: sw.id,
            name: sw.name,
            vendor: sw.vendor,
            type: sw.type,
            category: sw.category,
            executedOs: oses[0] ?? null,
            userCount: userIds.size,
            firstDiscoveredAt: firsts.length > 0 ? new Date(Math.min(...firsts)) : null,
            lastUsedAt: lasts.length > 0 ? new Date(Math.max(...lasts)) : null,
            permissionStatus: sw.basePermission?.status ?? enums_1.SoftwarePermissionStatus.UNCLASSIFIED,
            licenseCoverage: sw.licenseCoverage,
        };
    });
};
const getById = async (id, requester) => {
    requireSoftwareReader(requester);
    const sw = await prisma_1.prisma.software.findUnique({
        where: { id },
        include: {
            basePermission: true,
            instances: {
                select: { userId: true, executedOs: true, firstDiscoveredAt: true, lastUsedAt: true },
            },
            licenseLinks: {
                include: {
                    license: {
                        include: {
                            assignments: {
                                select: { userId: true },
                            },
                        },
                    },
                },
            },
        },
    });
    if (!sw)
        throw new AppError_1.AppError(404, 'Software 를 찾을 수 없습니다.');
    // instances의 userId (실제 사용 데이터)
    const instanceUserIds = [];
    for (const i of sw.instances) {
        if (i.userId) {
            instanceUserIds.push(i.userId);
        }
    }
    // license 할당 사용자 병합
    const userIds = new Set(instanceUserIds);
    for (const link of sw.licenseLinks) {
        for (const assignment of link.license.assignments) {
            if (assignment.userId) {
                userIds.add(assignment.userId);
            }
        }
    }
    const oses = sw.instances.map((i) => i.executedOs);
    const firsts = sw.instances.map((i) => i.firstDiscoveredAt.getTime());
    const lasts = sw.instances.map((i) => i.lastUsedAt.getTime());
    return {
        id: sw.id,
        name: sw.name,
        vendor: sw.vendor,
        type: sw.type,
        category: sw.category,
        description: sw.description,
        licenseCoverage: sw.licenseCoverage,
        executedOs: oses[0] ?? null,
        userCount: userIds.size,
        firstDiscoveredAt: firsts.length > 0 ? new Date(Math.min(...firsts)) : null,
        lastUsedAt: lasts.length > 0 ? new Date(Math.max(...lasts)) : null,
        permissionStatus: sw.basePermission?.status ?? enums_1.SoftwarePermissionStatus.UNCLASSIFIED,
        createdAt: sw.createdAt,
        updatedAt: sw.updatedAt,
    };
};
// 사용자 결정 (2026-06-18): 기본정보 변경도 AuditLog 남김.
//   action=SOFTWARE_UPDATE / detail={changed:{field:{prev,next}}} / noise=diff 후만 / tx 묶음
const AUDIT_FIELDS = [
    'name',
    'vendor',
    'type',
    'category',
    'description',
    'licenseCoverage',
];
const update = async (id, input, requester) => {
    requireSoftwareEditor(requester);
    const before = await prisma_1.prisma.software.findUnique({ where: { id } });
    if (!before)
        throw new AppError_1.AppError(404, 'Software 를 찾을 수 없습니다.');
    // dirty 분야만 detail 에 담음 (옵션 C-🅑 — service layer 에서 diff)
    const changed = {};
    for (const f of AUDIT_FIELDS) {
        const field = f;
        if (input[field] === undefined)
            continue;
        const prev = before[field];
        const next = input[field];
        if (prev !== next) {
            changed[field] = { prev, next };
        }
    }
    if (Object.keys(changed).length === 0) {
        // 의미 있는 변경 없음 — DB write 도 audit 도 생략
        return getById(id, requester);
    }
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.software.update({
            where: { id },
            data: Object.fromEntries(Object.entries(changed).map(([k, v]) => [k, v.next])),
        });
        await (0, audit_service_1.logAudit)({
            action: enums_1.AuditAction.SOFTWARE_UPDATE,
            targetType: 'Software',
            targetId: id,
            performedById: requester.id,
            performedByRole: requester.role,
            detail: { changed },
            tx,
        });
    });
    return getById(id, requester);
};
// updatePermission — ADR 0002 결정 2 (2단계 판정)
//   미분류 → 허가됨/미허가  : SECURITY_OFFICER 가 2차 판정
//   허가됨/미허가 → 다른 상태  : SECURITY_OFFICER 가 재판정
const updatePermission = async (id, input, requester) => {
    requirePermissionDecider(requester);
    const sw = await prisma_1.prisma.software.findUnique({
        where: { id },
        include: { basePermission: true },
    });
    if (!sw)
        throw new AppError_1.AppError(404, 'Software 를 찾을 수 없습니다.');
    const prevStatus = sw.basePermission?.status ?? enums_1.SoftwarePermissionStatus.UNCLASSIFIED;
    // 같은 상태로 변경 시도는 무시 (AuditLog 노이즈 방지)
    if (prevStatus === input.status) {
        return getById(id, requester);
    }
    // AuditLog action 결정 — ADR 0002 결정 3 의 action enum
    const auditAction = (() => {
        if (input.status === enums_1.SoftwarePermissionStatus.ALLOWED)
            return enums_1.AuditAction.PERMISSION_GRANT;
        if (input.status === enums_1.SoftwarePermissionStatus.DISALLOWED)
            return enums_1.AuditAction.PERMISSION_REVOKE;
        return enums_1.AuditAction.PERMISSION_REVIEW;
    })();
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.softwarePermission.upsert({
            where: { softwareId: id },
            create: {
                softwareId: id,
                status: input.status,
                prevStatus,
                decidedById: requester.id,
                decidedByRole: requester.role,
                decidedAt: new Date(),
                reason: input.reason,
            },
            update: {
                status: input.status,
                prevStatus,
                decidedById: requester.id,
                decidedByRole: requester.role,
                decidedAt: new Date(),
                reason: input.reason,
            },
        });
        await (0, audit_service_1.logAudit)({
            action: auditAction,
            targetType: 'Software',
            targetId: id,
            performedById: requester.id,
            performedByRole: requester.role,
            detail: {
                prevStatus,
                nextStatus: input.status,
                reason: input.reason ?? null,
            },
            tx,
        });
    });
    return getById(id, requester);
};
const remove = async (id, requester) => {
    requireSoftwareEditor(requester);
    await prisma_1.prisma.software.delete({ where: { id } });
};
// 수동 카탈로그 등록 — basePermission=UNCLASSIFIED, instance/device 없는 빈 카탈로그
//   dedup: name+vendor 같으면 409 (ingest 의 findFirst 매칭 룰과 일치)
//   audit: SOFTWARE_CREATED, detail={ source:'manual', name, vendor, type, category, licenseCoverage }
const create = async (input, requester) => {
    requireSoftwareCreator(requester);
    const duplicate = await prisma_1.prisma.software.findFirst({
        where: { name: input.name, vendor: input.vendor ?? null },
        select: { id: true },
    });
    if (duplicate) {
        throw new AppError_1.AppError(409, '같은 이름·제조사의 Software 카탈로그가 이미 있습니다.');
    }
    const created = await prisma_1.prisma.$transaction(async (tx) => {
        const sw = await tx.software.create({
            data: {
                name: input.name,
                vendor: input.vendor ?? null,
                type: input.type ?? enums_1.SoftwareType.Other,
                category: input.category ?? '기타',
                description: input.description ?? null,
                licenseCoverage: input.licenseCoverage ?? null,
                basePermission: {
                    create: { status: enums_1.SoftwarePermissionStatus.UNCLASSIFIED },
                },
            },
        });
        await (0, audit_service_1.logAudit)({
            action: enums_1.AuditAction.SOFTWARE_CREATED,
            targetType: 'Software',
            targetId: sw.id,
            performedById: requester.id,
            performedByRole: requester.role,
            detail: {
                source: 'manual',
                name: sw.name,
                vendor: sw.vendor,
                type: sw.type,
                category: sw.category,
                licenseCoverage: sw.licenseCoverage,
            },
            tx,
        });
        return sw;
    });
    return getById(created.id, requester);
};
// ingest — endpoint agent push
//   가정 3: 신규 SW 분류 = type Other, category 기타, permission UNCLASSIFIED, licenseCoverage null
//   가정 4: 자동 License 매칭 없음
const ingest = async (payload, requester) => {
    // ingest 호출자 = 관리자 또는 SECURITY_OFFICER (가정 1: 기존 JWT)
    requireSoftwareReader(requester);
    let newSoftwareCount = 0;
    let newInstanceCount = 0;
    let updatedInstanceCount = 0;
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        // Device upsert (hostname unique)
        const device = await tx.device.upsert({
            where: { hostname: payload.hostname },
            create: {
                hostname: payload.hostname,
                userId: payload.userId ?? null,
                lastSeenAt: new Date(),
            },
            update: {
                userId: payload.userId ?? null,
                lastSeenAt: new Date(),
            },
        });
        for (const item of payload.items) {
            // Software 카탈로그 — (name) 매칭. 이름이 같으면 같은 SW 로 본다.
            let software = await tx.software.findFirst({
                where: { name: item.name, vendor: item.vendor ?? null },
            });
            let isNewSoftware = false;
            if (!software) {
                software = await tx.software.create({
                    data: {
                        name: item.name,
                        vendor: item.vendor ?? null,
                        type: enums_1.SoftwareType.Other, // 가정 3
                        category: '기타', // 가정 3
                        licenseCoverage: null, // 가정 3
                        basePermission: {
                            create: { status: enums_1.SoftwarePermissionStatus.UNCLASSIFIED },
                        },
                    },
                });
                isNewSoftware = true;
                newSoftwareCount += 1;
            }
            // Instance upsert (softwareId × deviceId unique)
            const existing = await tx.softwareInstance.findUnique({
                where: { softwareId_deviceId: { softwareId: software.id, deviceId: device.id } },
            });
            const lastUsedAt = item.lastUsedAt ? new Date(item.lastUsedAt) : new Date();
            const firstSeenAt = item.firstSeenAt ? new Date(item.firstSeenAt) : new Date();
            if (existing) {
                await tx.softwareInstance.update({
                    where: { id: existing.id },
                    data: { lastUsedAt, executedOs: item.executedOs },
                });
                updatedInstanceCount += 1;
            }
            else {
                await tx.softwareInstance.create({
                    data: {
                        softwareId: software.id,
                        deviceId: device.id,
                        userId: payload.userId ?? null,
                        executedOs: item.executedOs,
                        firstDiscoveredAt: firstSeenAt,
                        lastUsedAt,
                    },
                });
                newInstanceCount += 1;
            }
            // raw usage event 1 row (durationSec 있으면 적재)
            if (item.durationSec !== undefined) {
                const inst = await tx.softwareInstance.findUnique({
                    where: { softwareId_deviceId: { softwareId: software.id, deviceId: device.id } },
                    select: { id: true },
                });
                if (inst) {
                    await tx.softwareUsageEvent.create({
                        data: {
                            instanceId: inst.id,
                            occurredAt: lastUsedAt,
                            durationSec: item.durationSec,
                        },
                    });
                }
            }
            // AuditLog — 신규 카탈로그 발견만 기록 (Stage 0)
            if (isNewSoftware) {
                await (0, audit_service_1.logAudit)({
                    action: enums_1.AuditAction.SOFTWARE_DISCOVERED,
                    targetType: 'Software',
                    targetId: software.id,
                    performedById: requester.id,
                    performedByRole: requester.role,
                    detail: {
                        name: item.name,
                        vendor: item.vendor ?? null,
                        executedOs: item.executedOs,
                        hostname: payload.hostname,
                        discoveredUserId: payload.userId ?? null,
                    },
                    tx,
                });
                // SECURITY_OFFICER 전원에게 분류 검토 요청 알림 (tx 밖에서 best-effort)
                const securityOfficers = await prisma_1.prisma.user.findMany({
                    where: { role: 'SECURITY_OFFICER', isActive: true },
                    select: { id: true },
                });
                const notifBody = `${item.name}${item.vendor ? ` (${item.vendor})` : ''} 소프트웨어가 ${payload.hostname}에서 새로 발견되었습니다. 허가 여부를 분류해주세요.`;
                const notifMeta = { softwareId: software.id, name: item.name, vendor: item.vendor ?? null, hostname: payload.hostname, source: 'software_discovery' };
                for (const officer of securityOfficers) {
                    await notification_service_1.notificationService.createInApp({
                        type: 'COMPLIANCE_URGENT',
                        title: '미분류 소프트웨어 발견 — 검토 필요',
                        body: notifBody,
                        metadata: notifMeta,
                        recipientId: officer.id,
                    });
                }
            }
        }
        return device.id;
    });
    return {
        deviceId: result,
        newSoftwareCount,
        newInstanceCount,
        updatedInstanceCount,
    };
};
exports.softwareService = {
    list,
    getById,
    create,
    update,
    updatePermission,
    remove,
    ingest,
};
//# sourceMappingURL=software.service.js.map