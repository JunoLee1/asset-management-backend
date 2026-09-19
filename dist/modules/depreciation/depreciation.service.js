"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depreciationService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const logger_1 = require("../../lib/logger");
const requireManager = (requester) => {
    if (requester.role !== 'ADMIN' && requester.role !== 'TEAM_LEAD') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
};
// 연 상각률 자동 계산 (사용자 미입력 시)
const defaultAnnualRate = (method, usefulLifeYears) => {
    if (method === 'STRAIGHT_LINE')
        return 1 / usefulLifeYears;
    // 정률법: 1 - (잔존가/취득가)^(1/N) 같은 방식도 있지만, 단순화 위해 STRAIGHT_LINE 의 2배 (200% 정률법)
    return Math.min(0.9999, 2 / usefulLifeYears);
};
const simulate = (params) => {
    const { method, usefulLifeYears, purchasePrice, salvageValue, annualRate, startYear, startMonth = 1, } = params;
    const monthsInFirstYear = 13 - startMonth; // M=1 → 12 (full), M=7 → 6
    const hasTailYear = monthsInFirstYear < 12; // 첫해가 부분이면 마지막에 1년 더 필요
    const totalYears = hasTailYear ? usefulLifeYears + 1 : usefulLifeYears;
    const records = [];
    let bookValue = purchasePrice;
    for (let i = 1; i <= totalYears; i++) {
        const ratio = i === 1
            ? monthsInFirstYear / 12
            : hasTailYear && i === totalYears
                ? (startMonth - 1) / 12
                : 1;
        let amount;
        if (method === 'STRAIGHT_LINE') {
            amount = ((purchasePrice - salvageValue) / usefulLifeYears) * ratio;
        }
        else {
            // 정률법: 이전 장부가액 × annualRate × 안분비율
            amount = bookValue * annualRate * ratio;
            if (bookValue - amount < salvageValue)
                amount = bookValue - salvageValue;
        }
        amount = Math.max(0, Math.round(amount));
        let nextBookValue = Math.max(salvageValue, bookValue - amount);
        // 마지막 회차: 잔존가로 정확히 맞추기 (반올림 오차 보정)
        if (i === totalYears) {
            amount = Math.max(0, bookValue - salvageValue);
            nextBookValue = salvageValue;
        }
        records.push({
            fiscalYear: startYear + i - 1,
            depreciationAmount: amount,
            bookValue: nextBookValue,
        });
        bookValue = nextBookValue;
    }
    return records;
};
const getByAssetId = async (assetId, _requester) => {
    const row = await prisma_1.prisma.depreciation.findUnique({
        where: { assetId },
        include: {
            asset: { select: { assetCode: true, name: true, purchasePrice: true, purchaseDate: true } },
            records: { orderBy: { fiscalYear: 'asc' } },
        },
    });
    if (!row)
        return null;
    const records = row.records.map((r) => ({
        fiscalYear: r.fiscalYear,
        depreciationAmount: Number(r.depreciationAmount),
        bookValue: Number(r.bookValue),
        recordedAt: r.recordedAt,
    }));
    const currentYear = new Date().getFullYear();
    const currentRecord = records.find((r) => r.fiscalYear === currentYear) ?? records[records.length - 1];
    return {
        id: row.id,
        assetId: row.assetId,
        assetCode: row.asset.assetCode,
        assetName: row.asset.name,
        method: row.method,
        usefulLifeYears: row.usefulLifeYears,
        salvageValue: Number(row.salvageValue),
        annualRate: Number(row.annualRate),
        purchasePrice: row.asset.purchasePrice ? Number(row.asset.purchasePrice) : null,
        purchaseDate: row.asset.purchaseDate,
        currentBookValue: currentRecord ? currentRecord.bookValue : null,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
        records,
    };
};
// 자산별 감가상각 등록/수정. 등록 즉시 연도별 records 전체 생성 + 자산 currentValue 동기화
const upsert = async (input, requester) => {
    requireManager(requester);
    const asset = await prisma_1.prisma.asset.findUnique({ where: { id: input.assetId } });
    if (!asset)
        throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
    if (!asset.purchasePrice || !asset.purchaseDate) {
        throw new AppError_1.AppError(400, '자산에 구매가/구매일이 등록되어 있어야 감가상각을 적용할 수 있습니다.');
    }
    const purchasePrice = Number(asset.purchasePrice);
    if (input.salvageValue >= purchasePrice) {
        throw new AppError_1.AppError(400, '잔존가액은 구매가액보다 작아야 합니다.');
    }
    const annualRate = input.annualRate ?? defaultAnnualRate(input.method, input.usefulLifeYears);
    const startYear = asset.purchaseDate.getFullYear();
    const startMonth = asset.purchaseDate.getMonth() + 1;
    const simulated = simulate({
        method: input.method,
        usefulLifeYears: input.usefulLifeYears,
        purchasePrice,
        salvageValue: input.salvageValue,
        annualRate,
        startYear,
        startMonth,
    });
    await prisma_1.prisma.$transaction(async (tx) => {
        // upsert
        const dep = await tx.depreciation.upsert({
            where: { assetId: input.assetId },
            update: {
                method: input.method,
                usefulLifeYears: input.usefulLifeYears,
                salvageValue: input.salvageValue,
                annualRate,
            },
            create: {
                assetId: input.assetId,
                method: input.method,
                usefulLifeYears: input.usefulLifeYears,
                salvageValue: input.salvageValue,
                annualRate,
            },
        });
        // 기존 records 제거 후 재생성 (재계산)
        await tx.depreciationRecord.deleteMany({ where: { depreciationId: dep.id } });
        await tx.depreciationRecord.createMany({
            data: simulated.map((r) => ({
                depreciationId: dep.id,
                fiscalYear: r.fiscalYear,
                depreciationAmount: r.depreciationAmount,
                bookValue: r.bookValue,
            })),
        });
        // 자산 currentValue 자동 동기화 (가장 최근 연도의 bookValue)
        const currentYear = new Date().getFullYear();
        const currentRecord = simulated.find((r) => r.fiscalYear === currentYear) ?? simulated[simulated.length - 1];
        if (currentRecord) {
            await tx.asset.update({
                where: { id: input.assetId },
                data: { currentValue: currentRecord.bookValue },
            });
        }
    });
    logger_1.logger.info({ event: 'depreciation_upsert', assetId: input.assetId, method: input.method, records: simulated.length }, '감가상각 등록/수정');
    const result = await getByAssetId(input.assetId, requester);
    if (!result)
        throw new AppError_1.AppError(500, '조회 실패');
    return result;
};
const remove = async (assetId, requester) => {
    requireManager(requester);
    const existing = await prisma_1.prisma.depreciation.findUnique({ where: { assetId } });
    if (!existing)
        throw new AppError_1.AppError(404, '감가상각 설정을 찾을 수 없습니다.');
    const asset = await prisma_1.prisma.asset.findUnique({ where: { id: assetId }, select: { currentValue: true } });
    const lastBookValue = asset?.currentValue != null ? Number(asset.currentValue) : null;
    await prisma_1.prisma.$transaction(async (tx) => {
        await tx.depreciation.delete({ where: { assetId } });
        await tx.asset.update({ where: { id: assetId }, data: { currentValue: null } });
        await tx.assetHistory.create({
            data: {
                assetId,
                action: 'UPDATED',
                description: '감가상각 설정 삭제',
                metadata: { event: 'depreciation_removed', lastBookValue },
                performedById: requester.id,
            },
        });
    });
    logger_1.logger.info({ event: 'depreciation_deleted', assetId }, '감가상각 삭제');
};
exports.depreciationService = { getByAssetId, upsert, remove, simulate, defaultAnnualRate };
//# sourceMappingURL=depreciation.service.js.map