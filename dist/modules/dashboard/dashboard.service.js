"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const prisma_1 = require("../../lib/prisma");
const getDashboard = async (requester) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    // TEAM_LEAD: 자기 팀 ID 먼저 조회 (팀 없으면 null)
    const ledTeam = requester.role === 'TEAM_LEAD'
        ? await prisma_1.prisma.team.findFirst({ where: { teamLeadId: requester.id } })
        : null;
    // TEAM_LEAD: 자기 부서 ID로 자산 필터 (팀 없거나 부서 없으면 전사)
    const deptFilter = ledTeam?.departmentId ? { departmentId: ledTeam.departmentId } : {};
    const [totalAssets, activeAssets, underMaintenance, thisMonthRegistered, pendingApprovalCount, pendingInspectionCount,] = await Promise.all([
        prisma_1.prisma.asset.count({ where: { status: { not: 'RETIRED' } } }),
        prisma_1.prisma.asset.count({ where: { status: { in: ['IDLE', 'OPERATING'] }, ...deptFilter } }),
        // REPAIR — 정비 승인됨/작업 중 자산 (이전 PENDING_MAINTENANCE + UNDER_MAINTENANCE 통합)
        prisma_1.prisma.asset.count({
            where: { status: 'REPAIR', ...deptFilter },
        }),
        prisma_1.prisma.asset.count({
            where: { status: { not: 'RETIRED' }, createdAt: { gte: startOfMonth }, ...deptFilter },
        }),
        // TEAM_LEAD: 내 팀 PENDING_MANAGER 건만 / 나머지: 전사 합산
        requester.role === 'TEAM_LEAD'
            ? ledTeam
                ? prisma_1.prisma.loan.count({
                    where: {
                        status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] },
                        user: { teamId: ledTeam.id },
                    },
                })
                : Promise.resolve(0)
            : prisma_1.prisma.loan.count({ where: { status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN'] } } }),
        prisma_1.prisma.loan.count({ where: { status: 'PENDING_INSPECTION' } }),
    ]);
    const historyInclude = {
        asset: { select: { assetCode: true, name: true } },
        performedBy: { select: { name: true } },
    };
    const historyInclude = {
        asset: { select: { assetCode: true, name: true } },
        performedBy: { select: { name: true } },
    };
    const [categories, departments, maintenances, histories] = await Promise.all([
        prisma_1.prisma.assetCategory.findMany({
            where: { assets: { some: {} } },
            include: { _count: { select: { assets: true } } },
            orderBy: { assets: { _count: 'desc' } },
        }),
        prisma_1.prisma.department.findMany({
            where: { assets: { some: {} } },
            include: { _count: { select: { assets: true } } },
            orderBy: { assets: { _count: 'desc' } },
        }),
        prisma_1.prisma.maintenance.findMany({
            where: {
                status: { in: ['PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED', 'IN_PROGRESS'] },
                scheduledAt: { lte: sevenDaysLater },
            },
            include: { asset: { select: { assetCode: true, name: true } } },
            orderBy: { scheduledAt: 'asc' },
            take: 10,
        }),
        prisma_1.prisma.assetHistory.findMany({
            include: historyInclude,
            orderBy: { createdAt: 'desc' },
            take: 5,
        }),
    ]);
    // TEAM_LEAD 전용: 내 팀원이 수행한 이력 (histories와 동일 타입)
    const teamHistories = ledTeam
        ? await prisma_1.prisma.assetHistory.findMany({
            where: { performedBy: { teamId: ledTeam.id } },
            include: historyInclude,
            orderBy: { createdAt: 'desc' },
            take: 5,
        })
        : null;
    const mapHistory = (h) => ({
        id: h.id,
        assetCode: h.asset.assetCode,
        assetName: h.asset.name,
        action: h.action,
        performedBy: h.performedBy.name,
        createdAt: h.createdAt,
    });
    return {
        stats: {
            totalAssets,
            activeAssets,
            underMaintenance,
            thisMonthRegistered,
            pendingApprovalCount,
            pendingInspectionCount,
        },
        byCategory: categories.map((c) => ({
            name: c.name,
            count: c._count.assets,
            class: c.class,
        })),
        byDepartment: departments.map((d) => ({ name: d.name, count: d._count.assets })),
        alerts: maintenances.map((m) => ({
            id: m.id,
            assetCode: m.asset.assetCode,
            assetName: m.asset.name,
            title: m.title,
            status: m.status,
            scheduledAt: m.scheduledAt,
        })),
        recentHistory: histories.map(mapHistory),
        ...(teamHistories && { recentHistoryMyTeam: teamHistories.map(mapHistory) }),
    };
};
exports.dashboardService = { getDashboard };
//# sourceMappingURL=dashboard.service.js.map