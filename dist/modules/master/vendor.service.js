"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const master_helpers_1 = require("./master.helpers");
const fieldEncryption_1 = require("../../lib/fieldEncryption");
const sensitiveAuditLog_1 = require("../../lib/sensitiveAuditLog");
const ntsClient_1 = require("./ntsClient");
const list = async (options) => {
    const baseWhere = (0, master_helpers_1.buildSoftDeleteWhere)(options);
    const statusWhere = !options?.status || options.status === 'ALL' ? {} : { status: options.status };
    const typeWhere = options?.type ? { type: options.type } : {};
    const rows = await prisma_1.prisma.vendor.findMany({
        where: { ...baseWhere, ...statusWhere, ...typeWhere },
        orderBy: { name: 'asc' },
        include: { approvedBy: { select: { id: true, name: true } } },
    });
    // 암호화된 계좌번호 원문은 응답에서 제외 — mask만 반환
    return rows.map(({ bankAccountNumber: _omit, ...rest }) => rest);
};
const getById = async (id) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({
        where: { id },
        include: { approvedBy: { select: { id: true, name: true } } },
    });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    // 암호화된 계좌번호 원문은 응답에서 제외 — mask만 반환
    const { bankAccountNumber: _omit, ...rest } = vendorRecord;
    return rest;
};
const toDateTime = (v) => typeof v === 'string' && v ? new Date(v.includes('T') ? v : `${v}T00:00:00.000Z`) : undefined;
const create = async (dto) => {
    const data = { ...dto };
    if (dto.bankAccountNumber) {
        data['bankAccountNumber'] = (0, fieldEncryption_1.encryptField)(dto.bankAccountNumber, 'BANK_ACCOUNT_ENCRYPTION_KEY');
        data['bankAccountNumberMask'] = (0, fieldEncryption_1.maskBankAccount)(dto.bankAccountNumber);
    }
    if (dto.businessRegistrationNumber) {
        data['businessRegistrationNumber'] = (0, fieldEncryption_1.encryptField)(dto.businessRegistrationNumber, 'BUSINESS_REG_ENCRYPTION_KEY');
    }
    if (dto.contractStartDate)
        data['contractStartDate'] = toDateTime(dto.contractStartDate);
    if (dto.contractEndDate)
        data['contractEndDate'] = toDateTime(dto.contractEndDate);
    return prisma_1.prisma.vendor.create({ data: data });
};
const update = async (id, dto) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    // supportedClasses: null → 빈 배열로 초기화
    const { supportedClasses, ...rest } = dto;
    const data = supportedClasses === null
        ? { ...rest, supportedClasses: [] }
        : supportedClasses !== undefined
            ? { ...rest, supportedClasses }
            : { ...rest };
    if (dto.bankAccountNumber) {
        data['bankAccountNumber'] = (0, fieldEncryption_1.encryptField)(dto.bankAccountNumber, 'BANK_ACCOUNT_ENCRYPTION_KEY');
        data['bankAccountNumberMask'] = (0, fieldEncryption_1.maskBankAccount)(dto.bankAccountNumber);
    }
    if (dto.businessRegistrationNumber) {
        data['businessRegistrationNumber'] = (0, fieldEncryption_1.encryptField)(dto.businessRegistrationNumber, 'BUSINESS_REG_ENCRYPTION_KEY');
    }
    if (dto.contractStartDate)
        data['contractStartDate'] = toDateTime(dto.contractStartDate);
    if (dto.contractEndDate)
        data['contractEndDate'] = toDateTime(dto.contractEndDate);
    return prisma_1.prisma.vendor.update({
        where: { id },
        data: data,
    });
};
const approve = async (id, adminId) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    if (vendorRecord.status === 'APPROVED')
        throw new AppError_1.AppError(400, '이미 승인된 공급업체입니다.');
    if (vendorRecord.deletedAt)
        throw new AppError_1.AppError(400, '삭제된 공급업체는 승인할 수 없습니다.');
    const result = await prisma_1.prisma.vendor.update({
        where: { id },
        data: { status: 'APPROVED', approvedAt: new Date(), approvedById: adminId },
        include: { approvedBy: { select: { id: true, name: true } } },
    });
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: 'VENDOR_APPROVE',
        performedById: adminId,
        performedByRole: 'ADMIN',
        targetId: id,
        targetType: 'Vendor',
        detail: `업체명: ${vendorRecord.name}`,
        timestamp: new Date().toISOString(),
    });
    return result;
};
const inactivate = async (id) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    if (vendorRecord.status !== 'APPROVED')
        throw new AppError_1.AppError(400, '승인된 업체만 비활성화할 수 있습니다.');
    return prisma_1.prisma.vendor.update({ where: { id }, data: { status: 'INACTIVE' } });
};
const softDelete = async (id) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    if (vendorRecord.deletedAt)
        throw new AppError_1.AppError(400, '이미 삭제된 공급업체입니다.');
    const [assetCount, maintenanceCount] = await Promise.all([
        prisma_1.prisma.asset.count({ where: { vendorId: id } }),
        prisma_1.prisma.maintenance.count({ where: { vendorId: id } }),
    ]);
    if (assetCount > 0) {
        throw new AppError_1.AppError(409, `이 공급업체에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`);
    }
    if (maintenanceCount > 0) {
        throw new AppError_1.AppError(409, `이 공급업체에 연결된 유지보수 이력 ${maintenanceCount}건이 있어 삭제할 수 없습니다.`);
    }
    return prisma_1.prisma.vendor.update({ where: { id }, data: { deletedAt: new Date() } });
};
const restore = async (id) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    if (!vendorRecord.deletedAt)
        throw new AppError_1.AppError(400, '이미 활성 상태인 공급업체입니다.');
    return prisma_1.prisma.vendor.update({ where: { id }, data: { deletedAt: null } });
};
// ── DRAFT 생성 (register → submit 2단계) ──────────────────────────────────────
const createDraft = async (dto, createdById) => prisma_1.prisma.vendor.create({ data: { ...dto, status: 'DRAFT', createdById } });
// ── DRAFT → PENDING 제출 ──────────────────────────────────────────────────────
const submit = async (id) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    if (vendorRecord.status !== 'DRAFT')
        throw new AppError_1.AppError(400, '임시저장 상태에서만 제출 가능합니다.');
    // 필수 필드 검증
    if (!vendorRecord.name)
        throw new AppError_1.AppError(400, '업체명은 필수입니다.');
    if (!vendorRecord.businessRegistrationNumber)
        throw new AppError_1.AppError(400, '사업자등록번호는 필수입니다.');
    if (!vendorRecord.addressBusiness)
        throw new AppError_1.AppError(400, '사업장 주소는 필수입니다.');
    // 국세청 API로 사업자등록번호 검증 (상태: 활성/폐업/휴업)
    await (0, ntsClient_1.verifyBusinessRegistration)(vendorRecord.businessRegistrationNumber);
    // 중복 체크
    const duplicate = await prisma_1.prisma.vendor.findFirst({
        where: {
            businessRegistrationNumber: vendorRecord.businessRegistrationNumber,
            deletedAt: null,
            id: { not: id },
        },
    });
    if (duplicate)
        throw new AppError_1.AppError(409, '이미 등록된 사업자등록번호입니다.');
    return prisma_1.prisma.vendor.update({ where: { id }, data: { status: 'PENDING' } });
};
// ── PENDING → REJECTED ────────────────────────────────────────────────────────
const reject = async (id, adminId, reason) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    if (vendorRecord.status !== 'PENDING')
        throw new AppError_1.AppError(400, '검토 요청 상태에서만 반려 가능합니다.');
    const result = await prisma_1.prisma.vendor.update({
        where: { id },
        data: {
            status: 'REJECTED',
            rejectedAt: new Date(),
            rejectedById: adminId,
            rejectionNote: reason,
        },
    });
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: 'VENDOR_REJECT',
        performedById: adminId,
        performedByRole: 'ADMIN',
        targetId: id,
        targetType: 'Vendor',
        detail: `사유: ${reason}`,
        timestamp: new Date().toISOString(),
    });
    return result;
};
// ── APPROVED → SUSPENDED (블랙리스트) ─────────────────────────────────────────
const blacklist = async (id, adminId, reason) => {
    const vendorRecord = await prisma_1.prisma.vendor.findUnique({ where: { id } });
    if (!vendorRecord)
        throw new AppError_1.AppError(404, '공급업체를 찾을 수 없습니다.');
    const result = await prisma_1.prisma.vendor.update({
        where: { id },
        data: {
            isBlacklisted: true,
            blacklistReason: reason,
            blacklistedAt: new Date(),
            status: 'SUSPENDED',
        },
    });
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: 'VENDOR_BLACKLIST',
        performedById: adminId,
        performedByRole: 'ADMIN',
        targetId: id,
        targetType: 'Vendor',
        detail: `사유: ${reason}`,
        timestamp: new Date().toISOString(),
    });
    return result;
};
const saveDocument = async (vendorId, uploaderId, input) => {
    // 기존 같은 타입 서류 소프트 삭제
    await prisma_1.prisma.vendorDocument.updateMany({
        where: { vendorId, documentType: input.documentType, deletedAt: null },
        data: { deletedAt: new Date() },
    });
    return prisma_1.prisma.vendorDocument.create({
        data: {
            ...input,
            documentType: input.documentType,
            vendorId,
            uploadedById: uploaderId,
        },
    });
};
// ── 서류 목록 조회 ─────────────────────────────────────────────────────────────
const getDocuments = async (vendorId) => prisma_1.prisma.vendorDocument.findMany({
    where: { vendorId, deletedAt: null },
    include: { uploadedBy: { select: { id: true, name: true } } },
});
exports.vendorService = {
    list,
    getById,
    create,
    update,
    approve,
    inactivate,
    softDelete,
    restore,
    createDraft,
    submit,
    reject,
    blacklist,
    saveDocument,
    getDocuments,
};
//# sourceMappingURL=vendor.service.js.map