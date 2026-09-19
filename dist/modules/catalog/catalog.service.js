"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogService = void 0;
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
    if (query.class)
        where['class'] = query.class;
    if (query.categoryId)
        where['categoryId'] = query.categoryId;
    if (typeof query.isActive === 'boolean')
        where['isActive'] = query.isActive;
    if (query.q) {
        where['OR'] = [
            { name: { contains: query.q, mode: 'insensitive' } },
            { manufacturer: { contains: query.q, mode: 'insensitive' } },
            { modelCode: { contains: query.q, mode: 'insensitive' } },
        ];
    }
    const [rows, total] = await Promise.all([
        prisma_1.prisma.assetCatalog.findMany({
            where,
            include: {
                category: { select: { name: true, code: true } },
                manufacturerMaster: { select: { name: true } },
            },
            orderBy: [{ class: 'asc' }, { name: 'asc' }],
            skip,
            take: pageSize,
        }),
        prisma_1.prisma.assetCatalog.count({ where }),
    ]);
    return (0, pagination_1.paginate)(rows.map((r) => ({
        id: r.id,
        name: r.name,
        manufacturerId: r.manufacturerId,
        manufacturerName: r.manufacturerMaster?.name ?? null,
        modelCode: r.modelCode,
        class: r.class,
        categoryId: r.categoryId,
        categoryName: r.category?.name ?? null,
        categoryCode: r.category?.code ?? null,
        specs: r.specs ?? {},
        imageUrl: r.imageUrl,
        isActive: r.isActive,
        createdAt: r.createdAt,
    })), total, page, pageSize);
};
const getById = async (id, _requester) => {
    const row = await prisma_1.prisma.assetCatalog.findUnique({
        where: { id },
        include: {
            category: { select: { name: true, code: true } },
            manufacturerMaster: { select: { name: true } },
        },
    });
    if (!row)
        throw new AppError_1.AppError(404, '카탈로그를 찾을 수 없습니다.');
    return {
        id: row.id,
        name: row.name,
        manufacturerId: row.manufacturerId,
        manufacturerName: row.manufacturerMaster?.name ?? null,
        modelCode: row.modelCode,
        class: row.class,
        categoryId: row.categoryId,
        categoryName: row.category?.name ?? null,
        categoryCode: row.category?.code ?? null,
        specs: row.specs ?? {},
        imageUrl: row.imageUrl,
        isActive: row.isActive,
        createdAt: row.createdAt,
    };
};
const validateManufacturer = async (manufacturerId) => {
    const master = await prisma_1.prisma.manufacturer.findUnique({ where: { id: manufacturerId } });
    if (!master)
        throw new AppError_1.AppError(404, '제조사 마스터를 찾을 수 없습니다.');
};
const create = async (input, requester) => {
    requireAdmin(requester);
    if (!input.categoryId)
        throw new AppError_1.AppError(400, '카탈로그 등록 시 카테고리는 필수입니다.');
    const cat = await prisma_1.prisma.assetCategory.findUnique({ where: { id: input.categoryId } });
    if (!cat)
        throw new AppError_1.AppError(404, '카테고리를 찾을 수 없습니다.');
    const manufacturerId = input.manufacturerId ?? null;
    if (manufacturerId)
        await validateManufacturer(manufacturerId);
    const created = await prisma_1.prisma.assetCatalog.create({
        data: {
            name: input.name,
            manufacturerId,
            modelCode: input.modelCode ?? null,
            class: input.class,
            categoryId: input.categoryId ?? null,
            specs: (input.specs ?? {}),
            imageUrl: input.imageUrl ?? null,
        },
    });
    logger_1.logger.info({ event: 'catalog_created', id: created.id, name: created.name }, '카탈로그 등록');
    return getById(created.id, requester);
};
const update = async (id, input, requester) => {
    requireAdmin(requester);
    const existing = await prisma_1.prisma.assetCatalog.findUnique({ where: { id } });
    if (!existing)
        throw new AppError_1.AppError(404, '카탈로그를 찾을 수 없습니다.');
    const data = {};
    if (input.name !== undefined)
        data['name'] = input.name;
    if (input.modelCode !== undefined)
        data['modelCode'] = input.modelCode;
    if (input.class !== undefined)
        data['class'] = input.class;
    if (input.categoryId !== undefined)
        data['categoryId'] = input.categoryId;
    if (input.specs !== undefined)
        data['specs'] = input.specs;
    if (input.imageUrl !== undefined)
        data['imageUrl'] = input.imageUrl;
    if (input.isActive !== undefined)
        data['isActive'] = input.isActive;
    if (input.manufacturerId === null) {
        data['manufacturerId'] = null;
    }
    else if (input.manufacturerId) {
        await validateManufacturer(input.manufacturerId);
        data['manufacturerId'] = input.manufacturerId;
    }
    await prisma_1.prisma.assetCatalog.update({ where: { id }, data });
    return getById(id, requester);
};
const remove = async (id, requester) => {
    requireAdmin(requester);
    const used = await prisma_1.prisma.asset.count({ where: { catalogId: id } });
    if (used > 0) {
        throw new AppError_1.AppError(400, `이 카탈로그를 사용하는 자산이 ${used}건 있어 삭제할 수 없습니다. (isActive=false 로 비활성화하세요)`);
    }
    await prisma_1.prisma.assetCatalog.delete({ where: { id } });
    logger_1.logger.info({ event: 'catalog_deleted', id }, '카탈로그 삭제');
};
exports.catalogService = { list, getById, create, update, remove };
//# sourceMappingURL=catalog.service.js.map