"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const master_helpers_1 = require("./master.helpers");
const list = async (options) => {
    return prisma_1.prisma.team.findMany({
        where: (0, master_helpers_1.buildSoftDeleteWhere)(options),
        orderBy: { name: 'asc' },
        include: {
            _count: { select: { teams: { where: { deletedAt: null } } } },
        },
    });
};
const getById = async (id) => {
    const row = await prisma_1.prisma.department.findUnique({
        where: { id },
        include: {
            _count: { select: { teams: { where: { deletedAt: null } } } },
        },
    });
    if (!row)
        throw new AppError_1.AppError(404, '부서를 찾을 수 없습니다.');
    return row;
};
const create = async (dto) => {
    const existing = await prisma_1.prisma.team.findUnique({ where: { code: dto.code } });
    if (existing)
        throw new AppError_1.AppError(409, '이미 사용 중인 부서 코드입니다.');
    return prisma_1.prisma.department.create({
        data: { name: dto.name, code: dto.code },
    });
};
const update = async (id, dto) => {
    const current = await prisma_1.prisma.team.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '부서를 찾을 수 없습니다.');
    if (dto.code && dto.code !== current.code) {
        const duplicate = await prisma_1.prisma.team.findUnique({ where: { code: dto.code } });
        if (duplicate)
            throw new AppError_1.AppError(409, '이미 사용 중인 부서 코드입니다.');
    }
    return prisma_1.prisma.team.update({ where: { id }, data: dto });
};
const softDelete = async (id) => {
    const current = await prisma_1.prisma.team.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '부서를 찾을 수 없습니다.');
    if (current.deletedAt)
        throw new AppError_1.AppError(400, '이미 삭제된 부서입니다.');
    const [assetCount, teamCount] = await Promise.all([
        prisma_1.prisma.asset.count({ where: { departmentId: id } }),
        prisma_1.prisma.team.count({ where: { departmentId: id, deletedAt: null } }),
    ]);
    if (assetCount > 0) {
        throw new AppError_1.AppError(409, `이 부서에 연결된 자산 ${assetCount}건이 있어 삭제할 수 없습니다.`);
    }
    if (teamCount > 0) {
        throw new AppError_1.AppError(409, `이 부서에 소속된 팀 ${teamCount}개가 있어 삭제할 수 없습니다. 팀을 먼저 정리해 주세요.`);
    }
    return prisma_1.prisma.team.update({ where: { id }, data: { deletedAt: new Date() } });
};
const restore = async (id) => {
    const current = await prisma_1.prisma.team.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '부서를 찾을 수 없습니다.');
    if (!current.deletedAt)
        throw new AppError_1.AppError(400, '이미 활성 상태인 부서입니다.');
    return prisma_1.prisma.team.update({ where: { id }, data: { deletedAt: null } });
};
exports.departmentService = { list, getById, create, update, softDelete, restore };
//# sourceMappingURL=department.service.js.map