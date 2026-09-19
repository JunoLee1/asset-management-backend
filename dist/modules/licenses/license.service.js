"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const logger_1 = require("../../lib/logger");
const pagination_1 = require("../../lib/pagination");
const licenseKey_1 = require("../../lib/licenseKey");
const sensitiveAuditLog_1 = require("../../lib/sensitiveAuditLog");
const notification_service_1 = require("../notifications/notification.service");
const license_types_1 = require("./license.types");
const requireManager = (requester) => {
    if (requester.role !== 'ADMIN' && requester.role !== 'TEAM_LEAD') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
};
const countActiveSeats = async (licenseId) => prisma_1.prisma.licenseAssignment.count({ where: { licenseId, unassignedAt: null } });
const list = async (query, requester) => {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;
    const where = {};
    if (query.vendorId)
        where['vendorId'] = query.vendorId;
    if (query.q)
        where['name'] = { contains: query.q, mode: 'insensitive' };
    // USER 는 본인이 할당받은 라이선스만 조회
    if (requester.role === 'USER') {
        where['assignments'] = { some: { userId: requester.id, unassignedAt: null } };
    }
    const [rows, total] = await Promise.all([
        prisma_1.prisma.license.findMany({
            where,
            include: {
                vendor: { select: { name: true } },
                _count: { select: { assignments: { where: { unassignedAt: null } } } },
            },
            orderBy: [{ expiryDate: 'asc' }, { createdAt: 'desc' }],
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.license.count({ where }),
    ]);
    return (0, pagination_1.paginate)(rows.map((r) => ({
        id: r.id,
        name: r.name,
        vendorName: r.vendor?.name ?? null,
        seatsTotal: r.seatsTotal,
        seatsUsed: r._count.assignments,
        coverage: (0, license_types_1.calculateLicenseCoverage)(r._count.assignments, r.seatsTotal, r.expiryDate),
        expiryDate: r.expiryDate,
        purchaseDate: r.purchaseDate,
        cost: r.cost ? Number(r.cost) : null,
        productKeyMask: r.productKeyMask,
        createdAt: r.createdAt,
    })), total, page, pageSize);
};
const getById = async (id, requester) => {
    const row = await prisma_1.prisma.license.findUnique({
        where: { id },
        include: {
            vendor: { select: { id: true, name: true } },
            assignments: {
                where: { unassignedAt: null },
                include: {
                    user: { select: { id: true, name: true, email: true } },
                    asset: { select: { id: true, assetCode: true, name: true } },
                },
                orderBy: { assignedAt: 'desc' },
            },
        },
    });
    if (!row)
        throw new AppError_1.AppError(404, '라이선스를 찾을 수 없습니다.');
    // USER 는 본인이 할당된 경우만 조회 가능
    if (requester.role === 'USER') {
        const isAssigned = row.assignments.some((a) => a.userId === requester.id);
        if (!isAssigned)
            throw new AppError_1.AppError(403, '조회 권한이 없습니다.');
    }
    // productKey 평문은 ADMIN만 reveal (MANAGER/USER 는 마스킹만)
    let productKey = null;
    if (requester.role === 'ADMIN' && row.productKey) {
        productKey = (0, licenseKey_1.decryptLicenseKey)(row.productKey);
        (0, sensitiveAuditLog_1.logSensitiveAction)({
            action: 'LICENSE_KEY_ACCESS',
            performedById: requester.id,
            performedByRole: requester.role,
            targetId: row.id,
            targetType: 'License',
            detail: `라이선스: ${row.name}`,
            timestamp: new Date().toISOString(),
        });
    }
    return {
        id: row.id,
        name: row.name,
        vendorId: row.vendor?.id ?? null,
        vendorName: row.vendor?.name ?? null,
        seatsTotal: row.seatsTotal,
        seatsUsed: row.assignments.length,
        coverage: (0, license_types_1.calculateLicenseCoverage)(row.assignments.length, row.seatsTotal, row.expiryDate),
        purchaseDate: row.purchaseDate,
        expiryDate: row.expiryDate,
        cost: row.cost ? Number(row.cost) : null,
        productKey,
        productKeyMask: row.productKeyMask,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        assignments: row.assignments.map((a) => ({
            id: a.id,
            userId: a.userId,
            userName: a.user.name,
            userEmail: a.user.email,
            assetId: a.asset?.id ?? null,
            assetCode: a.asset?.assetCode ?? null,
            assetName: a.asset?.name ?? null,
            assignedAt: a.assignedAt,
            unassignedAt: a.unassignedAt,
        })),
    };
};
const create = async (input, requester) => {
    requireManager(requester);
    const created = await prisma_1.prisma.license.create({
        data: {
            name: input.name,
            productKey: input.productKey ? (0, licenseKey_1.encryptLicenseKey)(input.productKey) : null,
            productKeyMask: input.productKey ? (0, licenseKey_1.maskLicenseKey)(input.productKey) : null,
            vendorId: input.vendorId ?? null,
            seatsTotal: input.seatsTotal,
            purchaseDate: input.purchaseDate,
            expiryDate: input.expiryDate ?? null,
            cost: input.cost ?? null,
        },
    });
    logger_1.logger.info({ event: 'license_created', id: created.id, name: created.name }, '라이선스 등록');
    return getById(created.id, requester);
};
const update = async (id, input, requester) => {
    requireManager(requester);
    const current = await prisma_1.prisma.license.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '라이선스를 찾을 수 없습니다.');
    // seatsTotal 줄일 때는 활성 할당 수 이상이어야 함
    if (input.seatsTotal !== undefined) {
        const active = await countActiveSeats(id);
        if (input.seatsTotal < active) {
            throw new AppError_1.AppError(400, `현재 할당된 시트(${active})보다 작은 값으로 줄일 수 없습니다.`);
        }
    }
    // purchaseDate 또는 expiryDate 한쪽만 변경될 때 기존 값과 조합해서 만료일 >= 구매일 보장
    if (input.purchaseDate !== undefined || input.expiryDate !== undefined) {
        const effPurchase = input.purchaseDate ?? current.purchaseDate.toISOString();
        const effExpiry = input.expiryDate === undefined
            ? (current.expiryDate?.toISOString() ?? null)
            : input.expiryDate;
        if (effExpiry !== null && effExpiry < effPurchase) {
            throw new AppError_1.AppError(400, '만료일은 구매일 이전일 수 없습니다.');
        }
    }
    const data = {};
    if (input.name !== undefined)
        data['name'] = input.name;
    if (input.vendorId !== undefined)
        data['vendorId'] = input.vendorId;
    if (input.seatsTotal !== undefined)
        data['seatsTotal'] = input.seatsTotal;
    if (input.purchaseDate !== undefined)
        data['purchaseDate'] = input.purchaseDate;
    if (input.expiryDate !== undefined)
        data['expiryDate'] = input.expiryDate;
    if (input.cost !== undefined)
        data['cost'] = input.cost;
    if (input.productKey !== undefined) {
        data['productKey'] = input.productKey ? (0, licenseKey_1.encryptLicenseKey)(input.productKey) : null;
        data['productKeyMask'] = input.productKey ? (0, licenseKey_1.maskLicenseKey)(input.productKey) : null;
    }
    await prisma_1.prisma.license.update({ where: { id }, data });
    return getById(id, requester);
};
const remove = async (id, requester) => {
    requireManager(requester);
    const active = await countActiveSeats(id);
    if (active > 0) {
        throw new AppError_1.AppError(400, `활성 할당이 ${active}건 있어 삭제할 수 없습니다. 먼저 회수하세요.`);
    }
    await prisma_1.prisma.license.delete({ where: { id } });
    logger_1.logger.info({ event: 'license_deleted', id }, '라이선스 삭제');
};
const assign = async (licenseId, input, requester) => {
    requireManager(requester);
    const license = await prisma_1.prisma.license.findUnique({ where: { id: licenseId } });
    if (!license)
        throw new AppError_1.AppError(404, '라이선스를 찾을 수 없습니다.');
    const active = await countActiveSeats(licenseId);
    if (active >= license.seatsTotal) {
        throw new AppError_1.AppError(400, `잔여 시트가 없습니다. (${active}/${license.seatsTotal})`);
    }
    const dup = await prisma_1.prisma.licenseAssignment.findFirst({
        where: { licenseId, userId: input.userId, unassignedAt: null },
    });
    if (dup)
        throw new AppError_1.AppError(400, '이미 할당된 사용자입니다.');
    if (input.assetId) {
        const asset = await prisma_1.prisma.asset.findUnique({ where: { id: input.assetId } });
        if (!asset)
            throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
    }
    const user = await prisma_1.prisma.user.findUnique({ where: { id: input.userId } });
    if (!user)
        throw new AppError_1.AppError(404, '사용자를 찾을 수 없습니다.');
    await prisma_1.prisma.licenseAssignment.create({
        data: {
            licenseId,
            userId: input.userId,
            assetId: input.assetId ?? null,
        },
    });
    logger_1.logger.info({ event: 'license_assigned', licenseId, userId: input.userId, assetId: input.assetId }, '라이선스 할당');
    // 할당 후 시트가 가득 찼는지 확인하여 운영자 알림
    const updatedActive = await countActiveSeats(licenseId);
    if (updatedActive >= license.seatsTotal) {
        await notification_service_1.notificationService.createLicenseFullNotification({
            licenseId,
            licenseName: license.name,
            seatsTotal: license.seatsTotal,
        });
        logger_1.logger.info({ event: 'license_full_notified', licenseId }, '라이선스 시트 가득 참 알림 발송');
    }
    return getById(licenseId, requester);
};
const unassign = async (licenseId, assignmentId, requester) => {
    requireManager(requester);
    const assignment = await prisma_1.prisma.licenseAssignment.findUnique({ where: { id: assignmentId } });
    if (!assignment || assignment.licenseId !== licenseId) {
        throw new AppError_1.AppError(404, '할당을 찾을 수 없습니다.');
    }
    if (assignment.unassignedAt)
        throw new AppError_1.AppError(400, '이미 회수된 할당입니다.');
    await prisma_1.prisma.licenseAssignment.update({
        where: { id: assignmentId },
        data: { unassignedAt: new Date() },
    });
    logger_1.logger.info({ event: 'license_unassigned', licenseId, assignmentId }, '라이선스 회수');
    return getById(licenseId, requester);
};
exports.licenseService = { list, getById, create, update, remove, assign, unassign };
//# sourceMappingURL=license.service.js.map