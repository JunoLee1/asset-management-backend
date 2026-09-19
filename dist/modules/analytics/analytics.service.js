"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsService = void 0;
const prisma_1 = require("../../lib/prisma");
// 상태별 가중치 (축 2: 하이브리드)
// OPERATING=100% 가동, IDLE=20% 활용, STANDBY=50%, REPAIR/PENDING_DISPOSAL=0%, RETIRED=제외
const STATUS_WEIGHTS = {
    OPERATING: 1.0,
    IDLE: 0.2,
    STANDBY: 0.5,
    REPAIR: 0.0,
    PENDING_DISPOSAL: 0.0,
    RETIRED: 0.0,
    UNDER_CONSTRUCTION: 0.0,
};
// 보유 기간 내 가동률 계산 (축 1: life-to-date, 축 2: 상태별 가중치)
// 가동률(%) = (Σ 상태별 시간 × 가중치) / 보유 기간
const calculateAssetUtilizationWithWeights = async (assetId) => {
    const asset = await prisma_1.prisma.asset.findUnique({
        where: { id: assetId },
        select: { id: true, createdAt: true, status: true },
    });
    if (!asset || asset.status === 'RETIRED')
        return 0;
    const now = new Date();
    const ownedMs = now.getTime() - asset.createdAt.getTime();
    const ownedDays = Math.max(1, ownedMs / (1000 * 60 * 60 * 24));
    // STATUS_CHANGED 이력 조회 (없으면 현재 status만 사용)
    const histories = await prisma_1.prisma.assetHistory.findMany({
        where: { assetId, action: 'STATUS_CHANGED' },
        orderBy: { createdAt: 'asc' },
        select: { createdAt: true, metadata: true },
    });
    if (histories.length === 0) {
        // 이력이 없으면 현재 status로 전체 기간 근사
        const weight = STATUS_WEIGHTS[asset.status] ?? 0;
        return Math.round(weight * 1000) / 10;
    }
    // STATUS_CHANGED 시퀀스로 구간별 상태 계산
    let weightedTimeMs = 0;
    // 첫 status_changed까지의 시간 (기본: createdAt status)
    const firstChangeAt = new Date(histories[0].createdAt);
    const initialStatus = histories[0].metadata?.from || asset.status;
    const initialWeight = STATUS_WEIGHTS[initialStatus] ?? 0;
    weightedTimeMs += (firstChangeAt.getTime() - asset.createdAt.getTime()) * initialWeight;
    // 각 구간별 가중시간 계산
    for (let i = 0; i < histories.length; i++) {
        const currentHistory = histories[i];
        const nextHistory = histories[i + 1];
        const statusAtThisChange = currentHistory.metadata?.to || asset.status;
        const weight = STATUS_WEIGHTS[statusAtThisChange] ?? 0;
        const startTime = currentHistory.createdAt.getTime();
        const endTime = nextHistory ? new Date(nextHistory.createdAt).getTime() : now.getTime();
        weightedTimeMs += (endTime - startTime) * weight;
    }
    const weightedDays = weightedTimeMs / (1000 * 60 * 60 * 24);
    return Math.round((weightedDays / ownedDays) * 1000) / 10;
};
const getDistribution = async () => {
    const [byStatusRaw, byConditionRaw, byClassRaw] = await Promise.all([
        prisma_1.prisma.asset.groupBy({ by: ['status'], where: { status: { not: 'RETIRED' } }, _count: true }),
        prisma_1.prisma.asset.groupBy({
            by: ['condition'],
            where: { status: { not: 'RETIRED' } },
            _count: true,
        }),
        prisma_1.prisma.asset.groupBy({ by: ['class'], where: { status: { not: 'RETIRED' } }, _count: true }),
    ]);
    return {
        byStatus: byStatusRaw.map((r) => ({ name: r.status, count: r._count })),
        byCondition: byConditionRaw.map((r) => ({ name: r.condition, count: r._count })),
        byClass: byClassRaw.map((r) => ({ name: r.class, count: r._count })),
    };
};
const getUtilization = async () => {
    const assets = await prisma_1.prisma.asset.findMany({
        where: { status: { not: 'RETIRED' } },
        include: {
            category: { select: { name: true } },
            histories: {
                where: { action: { in: ['ASSIGNED', 'MAINTENANCE_STARTED'] } },
                orderBy: { createdAt: 'desc' },
                take: 1,
                select: { createdAt: true },
            },
        },
    });
    const IDLE_THRESHOLD_DAYS = 30;
    const now = new Date();
    // 각 자산의 가동률 계산 (상태별 가중치 적용)
    const items = await Promise.all(assets.map(async (asset) => {
        const utilizationPct = await calculateAssetUtilizationWithWeights(asset.id);
        const lastUsedAt = asset.histories[0]?.createdAt ?? null;
        const daysSinceLastUse = lastUsedAt
            ? (now.getTime() - lastUsedAt.getTime()) / (1000 * 60 * 60 * 24)
            : null;
        const isIdle = asset.status === 'IDLE' ||
            (daysSinceLastUse !== null && daysSinceLastUse >= IDLE_THRESHOLD_DAYS);
        return {
            assetId: asset.id,
            assetCode: asset.assetCode,
            name: asset.name,
            categoryName: asset.category?.name ?? '-',
            utilizationPct,
            lastUsedAt: lastUsedAt ? lastUsedAt.toISOString() : null,
            isIdle,
        };
    }));
    const idleCount = items.filter((i) => i.isIdle).length;
    const avgUtilizationPct = items.length > 0
        ? Math.round((items.reduce((s, i) => s + i.utilizationPct, 0) / items.length) * 10) / 10
        : 0;
    // ── 가동률 (시점 비율) ────────────────────────────────────────────────
    // 가동률(%) = 운영중 자산 수 ÷ 자산대장 등록 자산 수 × 100
    //  · 분자: OPERATING (실제 가동·업무 투입 중)
    //  · 분모: 회계상 자산 = OPERATING + IDLE + STANDBY + REPAIR + PENDING_DISPOSAL
    //    (UNDER_CONSTRUCTION 은 CIP — 자산 인식 전, RETIRED 는 자산대장에서 제외)
    const [activeOpsCount, totalRegisteredCount] = await Promise.all([
        prisma_1.prisma.asset.count({ where: { status: 'OPERATING' } }),
        prisma_1.prisma.asset.count({
            where: {
                status: { in: ['OPERATING', 'IDLE', 'STANDBY', 'REPAIR', 'PENDING_DISPOSAL'] },
            },
        }),
    ]);
    const utilizationRatePct = totalRegisteredCount > 0
        ? Math.round((activeOpsCount / totalRegisteredCount) * 1000) / 10
        : 0;
    return {
        assets: items,
        idleCount,
        avgUtilizationPct,
        utilizationRatePct,
        activeOpsCount,
        totalRegisteredCount,
    };
};
const getDepartmentValue = async () => {
    const departments = await prisma_1.prisma.department.findMany({
        include: {
            assets: {
                where: { status: { not: 'RETIRED' } },
                select: { currentValue: true, purchasePrice: true },
            },
            teams: {
                include: { users: { where: { isActive: true }, select: { id: true } } },
            },
        },
    });
    const items = departments.map((dept) => {
        const totalValue = dept.assets.reduce((sum, a) => {
            const val = a.currentValue ?? a.purchasePrice;
            return sum + Number(val);
        }, 0);
        const memberCount = dept.teams.reduce((s, t) => s + t.users.length, 0);
        return {
            departmentId: dept.id,
            name: dept.name,
            assetCount: dept.assets.length,
            totalValue: Math.round(totalValue),
            memberCount,
            valuePerMember: memberCount > 0 ? Math.round(totalValue / memberCount) : 0,
        };
    });
    items.sort((a, b) => b.totalValue - a.totalValue);
    const totalValue = items.reduce((s, d) => s + d.totalValue, 0);
    return { departments: items, totalValue };
};
// 부서별 가동률 — 자산 페이지 4 분할 각 탭 상단 KPI 카드용.
// class 미지정 시 전체 자산 기준. 지정 시 해당 AssetClass 만.
// 공식은 getUtilization 의 utilizationRatePct 와 동일 (b66bb60 commit).
const getUtilizationByDepartment = async (assetClass) => {
    const REGISTERED_STATUSES = ['OPERATING', 'IDLE', 'STANDBY', 'REPAIR', 'PENDING_DISPOSAL'];
    const baseWhere = assetClass ? { class: assetClass } : {};
    // 부서별 분모 (자산대장 등록) + 분자 (OPERATING)
    const [registered, operating] = await Promise.all([
        prisma_1.prisma.asset.groupBy({
            by: ['departmentId'],
            where: { ...baseWhere, status: { in: [...REGISTERED_STATUSES] } },
            _count: true,
        }),
        prisma_1.prisma.asset.groupBy({
            by: ['departmentId'],
            where: { ...baseWhere, status: 'OPERATING' },
            _count: true,
        }),
    ]);
    const operatingByDept = new Map(operating.map((r) => [r.departmentId, r._count]));
    const departmentIds = registered.map((r) => r.departmentId);
    const departments = await prisma_1.prisma.department.findMany({
        where: { id: { in: departmentIds } },
        select: { id: true, name: true },
    });
    const nameById = new Map(departments.map((d) => [d.id, d.name]));
    const items = registered.map((r) => {
        const activeOpsCount = operatingByDept.get(r.departmentId) ?? 0;
        const totalRegisteredCount = r._count;
        const utilizationRatePct = totalRegisteredCount > 0
            ? Math.round((activeOpsCount / totalRegisteredCount) * 1000) / 10
            : 0;
        return {
            departmentId: r.departmentId,
            departmentName: nameById.get(r.departmentId) ?? '-',
            activeOpsCount,
            totalRegisteredCount,
            utilizationRatePct,
        };
    });
    items.sort((a, b) => b.utilizationRatePct - a.utilizationRatePct);
    const overallActive = items.reduce((s, d) => s + d.activeOpsCount, 0);
    const overallTotal = items.reduce((s, d) => s + d.totalRegisteredCount, 0);
    return {
        departments: items,
        overall: {
            activeOpsCount: overallActive,
            totalRegisteredCount: overallTotal,
            utilizationRatePct: overallTotal > 0 ? Math.round((overallActive / overallTotal) * 1000) / 10 : 0,
        },
    };
};
const getMaintenanceCost = async (from, to) => {
    const dateFilter = {};
    if (from)
        dateFilter.gte = new Date(from);
    if (to)
        dateFilter.lte = new Date(to);
    const maintenances = await prisma_1.prisma.maintenance.findMany({
        where: {
            status: 'COMPLETED',
            cost: { not: null },
            ...(from || to ? { completedAt: dateFilter } : {}),
        },
        select: {
            assetId: true,
            cost: true,
            completedAt: true,
            asset: {
                select: {
                    assetCode: true,
                    name: true,
                    purchasePrice: true,
                },
            },
        },
    });
    // 자산별 집계
    const assetMap = new Map();
    for (const m of maintenances) {
        const cost = Number(m.cost ?? 0);
        const existing = assetMap.get(m.assetId);
        if (existing) {
            existing.totalCost += cost;
            existing.count += 1;
        }
        else {
            assetMap.set(m.assetId, {
                assetCode: m.asset.assetCode,
                name: m.asset.name,
                purchasePrice: Number(m.asset.purchasePrice),
                totalCost: cost,
                count: 1,
            });
        }
    }
    const topAssets = Array.from(assetMap.entries())
        .map(([assetId, data]) => ({
        assetId,
        assetCode: data.assetCode,
        name: data.name,
        purchasePrice: data.purchasePrice,
        totalCost: Math.round(data.totalCost),
        costRatio: data.purchasePrice > 0 ? Math.round((data.totalCost / data.purchasePrice) * 1000) / 10 : 0,
        maintenanceCount: data.count,
    }))
        .sort((a, b) => b.totalCost - a.totalCost)
        .slice(0, 20);
    // 월별 추이
    const trendMap = new Map();
    for (const m of maintenances) {
        if (!m.completedAt)
            continue;
        const monthKey = m.completedAt.toISOString().slice(0, 7);
        trendMap.set(monthKey, (trendMap.get(monthKey) ?? 0) + Number(m.cost ?? 0));
    }
    const trend = Array.from(trendMap.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .slice(-12)
        .map(([month, totalCost]) => ({ month, totalCost: Math.round(totalCost) }));
    const totalCost = maintenances.reduce((s, m) => s + Number(m.cost ?? 0), 0);
    return { topAssets, trend, totalCost: Math.round(totalCost) };
};
const getComplianceExpiry = async () => {
    const now = new Date();
    const in30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    // 만료된 항목 + 30일 내 만료 임박 둘 다 포함 (gte 제약 제거)
    // daysLeft < 0 이면 이미 만료, 0 ≤ daysLeft ≤ 30 이면 임박
    const [hardwareAssets, licenses] = await Promise.all([
        prisma_1.prisma.hardwareAsset.findMany({
            where: { warrantyEnd: { lte: in30, not: null } },
            include: { asset: { select: { assetCode: true, name: true } } },
            orderBy: { warrantyEnd: 'asc' },
        }),
        prisma_1.prisma.license.findMany({
            where: { expiryDate: { lte: in30, not: null } },
            // 활성 시트(회수되지 않은 할당)만 카운트 — license.service 와 일관
            include: { _count: { select: { assignments: { where: { unassignedAt: null } } } } },
            orderBy: { expiryDate: 'asc' },
        }),
    ]);
    const allLicensesForOverseated = await prisma_1.prisma.license.findMany({
        // 활성 시트만으로 컴플라이언스 위반 판정 — 회수된 할당은 제외
        include: { _count: { select: { assignments: { where: { unassignedAt: null } } } } },
    });
    const warrantyExpiry = hardwareAssets.map((hw) => ({
        assetId: hw.assetId,
        assetCode: hw.asset.assetCode,
        name: hw.asset.name,
        warrantyEnd: hw.warrantyEnd.toISOString(),
        daysLeft: Math.ceil((new Date(hw.warrantyEnd).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
    }));
    const licenseExpiry = licenses.map((lic) => ({
        licenseId: lic.id,
        name: lic.name,
        expiryDate: lic.expiryDate.toISOString(),
        daysLeft: Math.ceil((new Date(lic.expiryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        seatsTotal: lic.seatsTotal,
        seatsUsed: lic._count.assignments,
    }));
    const overseated = allLicensesForOverseated
        .filter((lic) => lic._count.assignments > lic.seatsTotal)
        .map((lic) => ({
        licenseId: lic.id,
        name: lic.name,
        seatsTotal: lic.seatsTotal,
        seatsUsed: lic._count.assignments,
    }));
    return { warrantyExpiry, licenseExpiry, overseated };
};
exports.analyticsService = {
    getDistribution,
    getUtilization,
    getUtilizationByDepartment,
    getDepartmentValue,
    getMaintenanceCost,
    getComplianceExpiry,
};
//# sourceMappingURL=analytics.service.js.map