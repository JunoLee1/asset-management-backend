"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const master_helpers_1 = require("./master.helpers");
const list = async (options) => prisma_1.prisma.location.findMany({
    where: (0, master_helpers_1.buildSoftDeleteWhere)(options),
    orderBy: [{ building: 'asc' }, { name: 'asc' }],
});
const getById = async (id) => {
    const row = await prisma_1.prisma.location.findUnique({ where: { id } });
    if (!row)
        throw new AppError_1.AppError(404, '위치를 찾을 수 없습니다.');
    return row;
};
const create = async (dto) => prisma_1.prisma.location.create({ data: dto });
const update = async (id, dto) => {
    const current = await prisma_1.prisma.location.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '위치를 찾을 수 없습니다.');
    return prisma_1.prisma.location.update({ where: { id }, data: dto });
};
const softDelete = async (id) => {
    const current = await prisma_1.prisma.location.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '위치를 찾을 수 없습니다.');
    if (current.deletedAt)
        throw new AppError_1.AppError(400, '이미 삭제된 위치입니다.');
    const assetCount = await prisma_1.prisma.asset.count({ where: { locationId: id } });
    if (assetCount > 0) {
        throw new AppError_1.AppError(409, `이 위치에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`);
    }
    return prisma_1.prisma.location.update({ where: { id }, data: { deletedAt: new Date() } });
};
const restore = async (id) => {
    const current = await prisma_1.prisma.location.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '위치를 찾을 수 없습니다.');
    if (!current.deletedAt)
        throw new AppError_1.AppError(400, '이미 활성 상태인 위치입니다.');
    return prisma_1.prisma.location.update({ where: { id }, data: { deletedAt: null } });
};
exports.locationService = { list, getById, create, update, softDelete, restore };
//# sourceMappingURL=location.service.js.map