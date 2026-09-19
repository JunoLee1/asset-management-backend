"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const master_helpers_1 = require("./master.helpers");
const list = async (options) => {
    return prisma_1.prisma.team.findMany({
        where: (0, master_helpers_1.buildSoftDeleteWhere)(options),
        orderBy: { name: 'asc' },
        include: { department: { select: { name: true } } },
    });
};
const getById = async (id) => {
    const row = await prisma_1.prisma.team.findUnique({
        where: { id },
        include: { department: { select: { name: true } } },
    });
    if (!row)
        throw new AppError_1.AppError(404, '팀을 찾을 수 없습니다.');
    return row;
};
// 팀은 부서와 별개로 생성/수정 가능하도록 (하지만 현재는 부서 생성 시 기본 팀 생성됨)
const create = async (dto) => {
    const existing = await prisma_1.prisma.team.findUnique({ where: { code: dto.code } });
    if (existing)
        throw new AppError_1.AppError(409, '이미 사용 중인 팀 코드입니다.');
    return prisma_1.prisma.team.create({
        data: {
            name: dto.name,
            code: dto.code,
            departmentId: dto.departmentId,
        },
    });
};
const update = async (id, dto) => {
    const current = await prisma_1.prisma.team.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '팀을 찾을 수 없습니다.');
    if (dto.code && dto.code !== current.code) {
        const duplicate = await prisma_1.prisma.team.findUnique({ where: { code: dto.code } });
        if (duplicate)
            throw new AppError_1.AppError(409, '이미 사용 중인 팀 코드입니다.');
    }
    return prisma_1.prisma.team.update({ where: { id }, data: dto });
};
const softDelete = async (id) => {
    const current = await prisma_1.prisma.team.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '팀을 찾을 수 없습니다.');
    if (current.deletedAt)
        throw new AppError_1.AppError(400, '이미 삭제된 팀입니다.');
    const userCount = await prisma_1.prisma.user.count({ where: { teamId: id, isActive: true } });
    if (userCount > 0) {
        throw new AppError_1.AppError(409, `이 팀에 소속된 사용자 ${userCount}명이 있어 삭제할 수 없습니다.`);
    }
    return prisma_1.prisma.team.update({ where: { id }, data: { deletedAt: new Date() } });
};
const restore = async (id) => {
    const current = await prisma_1.prisma.team.findUnique({ where: { id } });
    if (!current)
        throw new AppError_1.AppError(404, '팀을 찾을 수 없습니다.');
    if (!current.deletedAt)
        throw new AppError_1.AppError(400, '이미 활성 상태인 팀입니다.');
    return prisma_1.prisma.team.update({ where: { id }, data: { deletedAt: null } });
};
exports.teamService = { list, getById, create, update, softDelete, restore };
//# sourceMappingURL=team.service.js.map