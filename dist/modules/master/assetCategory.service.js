"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetCategoryService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const master_helpers_1 = require("./master.helpers");
const list = async (options) => prisma_1.prisma.assetCategory.findMany({
    where: (0, master_helpers_1.buildSoftDeleteWhere)(options),
    orderBy: [{ class: 'asc' }, { name: 'asc' }],
    include: { _count: { select: { assets: true, children: true } } },
});
const getById = async (id) => {
    const row = await prisma_1.prisma.assetCategory.findUnique({
        where: { id },
        include: { parent: true, children: true },
    });
    if (!row)
        throw new AppError_1.AppError(404, '카테고리를 찾을 수 없습니다.');
    return row;
};
const create = async (dto) => {
    const existing = await prisma_1.prisma.assetCategory.findUnique({ where: { code: dto.code } });
    if (existing)
        throw new AppError_1.AppError(409, '이미 사용 중인 카테고리 코드입니다.');
    if (dto.parentId) {
        const parent = await prisma_1.prisma.assetCategory.findUnique({ where: { id: dto.parentId } });
        if (!parent)
            throw new AppError_1.AppError(400, '부모 카테고리를 찾을 수 없습니다.');
        // 부모에 class가 있으면 자식도 같은 class여야 함. 부모가 null(품목)이면 자유롭게 지정 가능
        if (parent.class !== null && parent.class !== dto.class) {
            throw new AppError_1.AppError(400, `부모 카테고리의 분류(${parent.class})와 다릅니다.`);
        }
    }
    return prisma_1.prisma.assetCategory.create({ data: dto });
};
const update = async (id, dto) => {
    const current = await prisma_1.prisma.assetCategory.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '카테고리를 찾을 수 없습니다.');
    if (dto.code && dto.code !== current.code) { // current.code(수정 요청전 코드)와 자산 코드가 다른 경우
        const duplicate = await prisma_1.prisma.assetCategory.findUnique({ where: { code: dto.code } });
        if (duplicate)
            throw new AppError_1.AppError(409, '이미 사용 중인 카테고리 코드입니다.');
    }
    if (dto.parentId && dto.parentId !== current.parentId) {
        if (dto.parentId === id)
            throw new AppError_1.AppError(400, '자기 자신을 부모로 지정할 수 없습니다.');
        const parent = await prisma_1.prisma.assetCategory.findUnique({ where: { id: dto.parentId } });
        if (!parent)
            throw new AppError_1.AppError(400, '부모 카테고리를 찾을 수 없습니다.');
        if (parent.class !== null && parent.class !== current.class) {
            throw new AppError_1.AppError(400, `부모 카테고리의 분류(${parent.class})와 다릅니다.`);
        }
    }
    return prisma_1.prisma.assetCategory.update({ where: { id }, data: dto });
};
// unique 제약이 있어서 트랜잭션이 없어도 데이터 무결성 보장이됨.
const softDelete = async (id) => {
    const current = await prisma_1.prisma.assetCategory.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '카테고리를 찾을 수 없습니다.');
    if (current.deletedAt)
        throw new AppError_1.AppError(400, '이미 삭제된 카테고리입니다.');
    const childCount = await prisma_1.prisma.assetCategory.count({
        where: { parentId: id, deletedAt: null },
    });
    if (childCount > 0) {
        throw new AppError_1.AppError(409, `이 카테고리에 자식 카테고리 ${childCount}개가 있어 삭제할 수 없습니다. 먼저 자식을 삭제하세요.`);
    }
    const assetCount = await prisma_1.prisma.asset.count({ where: { categoryId: id } });
    if (assetCount > 0) {
        throw new AppError_1.AppError(409, `이 카테고리에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`);
    }
    return prisma_1.prisma.assetCategory.update({ where: { id }, data: { deletedAt: new Date() } });
};
const restore = async (id) => {
    const current = await prisma_1.prisma.assetCategory.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '카테고리를 찾을 수 없습니다.');
    if (!current.deletedAt)
        throw new AppError_1.AppError(400, '이미 활성 상태인 카테고리입니다.');
    return prisma_1.prisma.assetCategory.update({ where: { id }, data: { deletedAt: null } });
};
exports.assetCategoryService = { list, getById, create, update, softDelete, restore };
//# sourceMappingURL=assetCategory.service.js.map