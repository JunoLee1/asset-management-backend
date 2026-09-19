"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturerService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const logger_1 = require("../../lib/logger");
const pagination_1 = require("../../lib/pagination");
const requireAdmin = (requester) => {
    if (requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '관리자(ADMIN) 권한이 필요합니다.');
    }
};
const list = async (query, _requester) => {
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 20;
    const skip = (page - 1) * pageSize;
    const where = {};
    if (typeof query.isActive === 'boolean')
        where['isActive'] = query.isActive;
    if (query.q) {
        where['OR'] = [
            { name: { contains: query.q, mode: 'insensitive' } },
            { aliases: { has: query.q } },
        ];
    }
    const [rows, total] = await Promise.all([
        prisma_1.prisma.manufacturer.findMany({
            where,
            include: { _count: { select: { catalogs: true } } },
            orderBy: { name: 'asc' },
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.manufacturer.count({ where }),
    ]);
    return (0, pagination_1.paginate)(rows.map((r) => ({
        id: r.id,
        name: r.name,
        aliases: r.aliases,
        isActive: r.isActive,
        catalogCount: r._count.catalogs,
        createdAt: r.createdAt,
    })), total, page, pageSize);
};
const getById = async (id, _requester) => {
    const row = await prisma_1.prisma.manufacturer.findUnique({
        where: { id },
        include: { _count: { select: { catalogs: true } } },
    });
    if (!row)
        throw new AppError_1.AppError(404, '제조사를 찾을 수 없습니다.');
    return {
        id: row.id,
        name: row.name,
        aliases: row.aliases,
        isActive: row.isActive,
        catalogCount: row._count.catalogs,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
};
const create = async (input, requester) => {
    requireAdmin(requester);
    const existing = await prisma_1.prisma.manufacturer.findUnique({ where: { name: input.name } });
    if (existing)
        throw new AppError_1.AppError(409, '이미 등록된 제조사 이름입니다.');
    const created = await prisma_1.prisma.manufacturer.create({
        data: {
            name: input.name,
            aliases: input.aliases ?? [],
        },
    });
    logger_1.logger.info({ event: 'manufacturer_created', id: created.id, name: created.name }, '제조사 등록');
    return getById(created.id, requester);
};
const update = async (id, input, requester) => {
    requireAdmin(requester);
    const existing = await prisma_1.prisma.manufacturer.findUnique({ where: { id } });
    if (!existing)
        throw new AppError_1.AppError(404, '제조사를 찾을 수 없습니다.');
    if (input.name !== undefined && input.name !== existing.name) {
        const conflict = await prisma_1.prisma.manufacturer.findUnique({ where: { name: input.name } });
        if (conflict)
            throw new AppError_1.AppError(409, '이미 등록된 제조사 이름입니다.');
    }
    const data = {};
    if (input.name !== undefined)
        data['name'] = input.name;
    if (input.aliases !== undefined)
        data['aliases'] = input.aliases;
    if (input.isActive !== undefined)
        data['isActive'] = input.isActive;
    await prisma_1.prisma.manufacturer.update({ where: { id }, data });
    return getById(id, requester);
};
const remove = async (id, requester) => {
    requireAdmin(requester);
    const used = await prisma_1.prisma.assetCatalog.count({ where: { manufacturerId: id } });
    if (used > 0) {
        throw new AppError_1.AppError(400, `이 제조사를 사용하는 카탈로그가 ${used}건 있어 삭제할 수 없습니다. (isActive=false 로 비활성화하세요)`);
    }
    await prisma_1.prisma.manufacturer.delete({ where: { id } });
    logger_1.logger.info({ event: 'manufacturer_deleted', id }, '제조사 삭제');
};
exports.manufacturerService = { list, getById, create, update, remove };
//# sourceMappingURL=manufacturer.service.js.map