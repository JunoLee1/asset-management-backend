"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetService = void 0;
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const assetCodeGenerator_1 = require("./assetCodeGenerator");
const sensitiveAuditLog_1 = require("../../lib/sensitiveAuditLog");
const logger_1 = require("../../lib/logger");
const depreciation_service_1 = require("../depreciation/depreciation.service");
const create = async (dto, requesterId) => {
    // 자산 자체는 트랜잭션으로 강하게 생성, 자동 감가상각은 트랜잭션 외부에서 best-effort 처리
    // (감가상각 prisma 에러가 자산 트랜잭션을 abort 시키지 않도록 격리)
    const isAutoCode = !dto.assetCode || dto.assetCode.trim() === '';
    // 1. 수동 입력 시만 사전 중복 검사 (자동 채번은 트랜잭션 내 atomic이라 불필요)
    if (!isAutoCode) {
        const existing = await prisma_1.prisma.asset.findUnique({ where: { assetCode: dto.assetCode } });
        if (existing)
            throw new AppError_1.AppError(409, '이미 사용 중인 자산 코드입니다.');
    }
    // OPERATING(운영중) 상태는 담당자 필수
    if (dto.status === 'OPERATING' && !dto.assignedUserId) {
        throw new AppError_1.AppError(400, '운영중(OPERATING) 상태의 자산은 담당자를 지정해야 합니다.');
    }
    // FK 사전 검증 — 시드 재실행 등으로 master data ID 가 stale 한 경우 친절한 메시지 제공
    // prisma P2003 (Foreign key constraint violation) 을 트랜잭션 안에서 받기 전에 미리 차단
    const [deptExists, locExists, catExists] = await Promise.all([
        prisma_1.prisma.department.findUnique({ where: { id: dto.departmentId }, select: { id: true } }),
        prisma_1.prisma.location.findUnique({ where: { id: dto.locationId }, select: { id: true } }),
        prisma_1.prisma.assetCategory.findUnique({ where: { id: dto.categoryId }, select: { id: true } }),
    ]);
    if (!deptExists) {
        throw new AppError_1.AppError(400, '선택한 부서가 더 이상 존재하지 않습니다. 페이지를 새로고침한 후 다시 선택해 주세요.');
    }
    if (!locExists) {
        throw new AppError_1.AppError(400, '선택한 위치가 더 이상 존재하지 않습니다. 페이지를 새로고침한 후 다시 선택해 주세요.');
    }
    if (!catExists) {
        throw new AppError_1.AppError(400, '선택한 카테고리가 더 이상 존재하지 않습니다. 페이지를 새로고침한 후 다시 선택해 주세요.');
    }
    // 2. 코어 + 전용테이블 + AssetHistory 한 트랜잭션
    const createdAsset = await prisma_1.prisma.$transaction(async (tx) => {
        const assetCode = isAutoCode ? await (0, assetCodeGenerator_1.generateAssetCode)(tx, dto.class) : dto.assetCode;
        const asset = await tx.asset.create({
            data: {
                assetCode,
                name: dto.name,
                description: dto.description ?? null,
                class: dto.class,
                status: dto.status ?? 'IDLE',
                condition: dto.condition ?? 'GOOD',
                conditionAssessedAt: dto.conditionAssessedAt ? new Date(dto.conditionAssessedAt) : null,
                ownershipType: dto.ownershipType ?? 'COMPANY_OWNED',
                purchaseDate: new Date(dto.purchaseDate),
                purchasePrice: dto.purchasePrice,
                currentValue: dto.currentValue ?? null,
                imageUrl: dto.imageUrl ?? null,
                categoryId: dto.categoryId,
                departmentId: dto.departmentId,
                locationId: dto.locationId,
                vendorId: dto.vendorId ?? null,
                assignedUserId: dto.assignedUserId ?? null,
            },
        });
        // IT_ASSET 인 경우 category.subType 으로 전용테이블 분기
        const category = await tx.assetCategory.findUnique({ where: { id: dto.categoryId } });
        const subType = category?.subType ?? null;
        if (subType === 'HARDWARE') {
            if (!dto.hardware)
                throw new AppError_1.AppError(400, '하드웨어 정보가 필요합니다.');
            const SPEC_REQUIRED_CODES = ['LAPTOP', 'DESKTOP', 'SERVER'];
            if (SPEC_REQUIRED_CODES.includes(category?.code ?? '')) {
                if (!dto.hardware.cpu)
                    throw new AppError_1.AppError(400, 'CPU는 필수입니다. (노트북·데스크탑·서버)');
                if (!dto.hardware.ramGb)
                    throw new AppError_1.AppError(400, 'RAM은 필수입니다. (노트북·데스크탑·서버)');
                if (!dto.hardware.storageGb)
                    throw new AppError_1.AppError(400, '저장공간은 필수입니다. (노트북·데스크탑·서버)');
            }
            await tx.hardwareAsset.create({
                data: {
                    assetId: asset.id,
                    serialNo: dto.hardware.serialNo,
                    macAddr: dto.hardware.macAddr ?? null,
                    ipAddr: dto.hardware.ipAddr ?? null,
                    cpu: dto.hardware.cpu ?? null,
                    ramGb: dto.hardware.ramGb ?? null,
                    storageGb: dto.hardware.storageGb ?? null,
                    warrantyEnd: dto.hardware.warrantyEnd ? new Date(dto.hardware.warrantyEnd) : null,
                },
            });
        }
        else if (subType === 'SOFTWARE') {
            if (!dto.software)
                throw new AppError_1.AppError(400, '소프트웨어 정보가 필요합니다.');
            await tx.softwareAsset.create({
                data: {
                    assetId: asset.id,
                    licenseKey: dto.software.licenseKey,
                    licenseSeats: dto.software.licenseSeats,
                    installedCount: dto.software.installedCount ?? 0,
                    expiryDate: dto.software.expiryDate ? new Date(dto.software.expiryDate) : null,
                    version: dto.software.version ?? null,
                },
            });
        }
        else if (subType === 'PERIPHERAL') {
            await tx.peripheralAsset.create({
                data: {
                    assetId: asset.id,
                    serialNo: dto.peripheral?.serialNo ?? null,
                    quantity: dto.peripheral?.quantity ?? 1,
                },
            });
        }
        // OFFICE_ASSET / FACILITY_ASSET: 전용 상세 테이블 없음 — 코어 필드만 사용
        // HARDWARE subType 자산 등록 시 감가상각 자동 생성 (정액법·5년·잔존가치 0원)
        if (subType === 'HARDWARE') {
            const method = 'STRAIGHT_LINE';
            const usefulLifeYears = 5;
            const salvageValue = 0;
            const annualRate = depreciation_service_1.depreciationService.defaultAnnualRate(method, usefulLifeYears);
            const purchasePrice = Number(dto.purchasePrice);
            const startYear = new Date(dto.purchaseDate).getFullYear();
            const dep = await tx.depreciation.create({
                data: { assetId: asset.id, method, usefulLifeYears, salvageValue, annualRate },
            });
            const simulated = depreciation_service_1.depreciationService.simulate({
                method, usefulLifeYears, purchasePrice, salvageValue, annualRate, startYear,
            });
            await tx.depreciationRecord.createMany({
                data: simulated.map((r) => ({
                    depreciationId: dep.id,
                    fiscalYear: r.fiscalYear,
                    depreciationAmount: r.depreciationAmount,
                    bookValue: r.bookValue,
                })),
            });
            // 현재 연도 장부가액 → asset.currentValue 동기화
            const currentYear = new Date().getFullYear();
            const currentRecord = simulated.find((r) => r.fiscalYear === currentYear) ?? simulated[simulated.length - 1];
            if (currentRecord) {
                await tx.asset.update({
                    where: { id: asset.id },
                    data: { currentValue: currentRecord.bookValue },
                });
            }
        }
        // OFFICE_ASSET: 동일 제품 다수 보유 시 식별 위해 모델명 필수
        if (dto.class === 'OFFICE_ASSET') {
            if (!dto.office?.modelName) {
                throw new AppError_1.AppError(400, '사무 자산의 모델명은 필수입니다.');
            }
            await tx.officeAsset.create({
                data: { assetId: asset.id, modelName: dto.office.modelName },
            });
        }
        // FACILITY_ASSET: 법정 점검 추적 (설치 위치/일자/점검 주기)
        if (dto.class === 'FACILITY_ASSET') {
            const f = dto.facility;
            if (!f?.installLocationDetail ||
                !f.installDate ||
                !f.inspectionCycleMonths ||
                !f.nextInspectionDate) {
                throw new AppError_1.AppError(400, '시설 자산의 설치 위치·설치일·점검 주기·다음 점검일은 필수입니다.');
            }
            await tx.facilityAsset.create({
                data: {
                    assetId: asset.id,
                    installLocationDetail: f.installLocationDetail,
                    installDate: new Date(f.installDate),
                    inspectionCycleMonths: f.inspectionCycleMonths,
                    nextInspectionDate: new Date(f.nextInspectionDate),
                },
            });
        }
        // NETWORK_ASSET: 라우터·스위치·AP — IP/MAC/VLAN/Port 추적 (모두 선택)
        if (dto.class === 'NETWORK_ASSET') {
            await tx.networkAsset.create({
                data: {
                    assetId: asset.id,
                    ipAddress: dto.network?.ipAddress ?? null,
                    macAddress: dto.network?.macAddress ?? null,
                    vlan: dto.network?.vlan ?? null,
                    port: dto.network?.port ?? null,
                },
            });
        }
        await tx.assetHistory.create({
            data: {
                assetId: asset.id,
                action: 'CREATED',
                description: `자산 등록: ${asset.assetCode} (${asset.name})`,
                performedById: requesterId,
            },
        });
        return { asset, category };
    });
    // 트랜잭션 후 자동 감가상각 — 실패해도 자산은 이미 commit됨 (best-effort)
    const { asset, category: cat } = createdAsset;
    if (cat?.defaultDepreciationMethod && cat?.defaultUsefulLifeYears) {
        try {
            const method = cat.defaultDepreciationMethod;
            const usefulLifeYears = cat.defaultUsefulLifeYears;
            const salvageRatio = cat.defaultSalvageValueRatio ? Number(cat.defaultSalvageValueRatio) : 0;
            const purchasePrice = Number(dto.purchasePrice);
            const salvageValue = Math.round(purchasePrice * salvageRatio);
            const annualRate = depreciation_service_1.depreciationService.defaultAnnualRate(method, usefulLifeYears);
            const purchaseDateObj = new Date(dto.purchaseDate);
            const startYear = purchaseDateObj.getFullYear();
            const startMonth = purchaseDateObj.getMonth() + 1;
            const dep = await prisma_1.prisma.depreciation.create({
                data: { assetId: asset.id, method, usefulLifeYears, salvageValue, annualRate },
            });
            const simulated = depreciation_service_1.depreciationService.simulate({
                method,
                usefulLifeYears,
                purchasePrice,
                salvageValue,
                annualRate,
                startYear,
                startMonth,
            });
            await prisma_1.prisma.depreciationRecord.createMany({
                data: simulated.map((r) => ({
                    depreciationId: dep.id,
                    fiscalYear: r.fiscalYear,
                    depreciationAmount: r.depreciationAmount,
                    bookValue: r.bookValue,
                })),
            });
            const currentYear = new Date().getFullYear();
            const currentRecord = simulated.find((r) => r.fiscalYear === currentYear) ?? simulated[simulated.length - 1];
            if (currentRecord) {
                await prisma_1.prisma.asset.update({
                    where: { id: asset.id },
                    data: { currentValue: currentRecord.bookValue },
                });
            }
        }
        catch (depErr) {
            logger_1.logger.error({ event: 'asset_create_depreciation_failed', err: depErr, assetId: asset.id }, '자산 자동 감가상각 실패 — 수동 등록 필요');
        }
    }
    return asset;
};
const list = async (query, requester) => {
    const where = {
        status: query.status ?? { not: 'RETIRED' },
    };
    if (query.class)
        where.class = query.class;
    if (query.condition)
        where.condition = query.condition;
    if (query.categoryId)
        where.categoryId = query.categoryId;
    if (query.departmentId)
        where.departmentId = query.departmentId;
    if (query.locationId)
        where.locationId = query.locationId;
    // P3-B: available=true 면 USER 도 모든 AVAILABLE 자산 조회 (대여 신청 위해)
    // 정책: 심사 단계(PENDING_MANAGER/PENDING_ADMIN)는 우선순위로 다중 신청 허용,
    //       APPROVED 부터(최종 승인 = 출고 확정 단계) 잠금
    if (query.available) {
        where.status = 'IDLE';
        // 정책: 대여 가능 자산은 IT 자산만. 사무·시설은 대여 대상이 아님.
        where.class = 'IT_ASSET';
        where.loans = {
            none: {
                status: {
                    in: [
                        'APPROVED',
                        'CHECKED_OUT',
                        'RECEIVED',
                        'PENDING_INSPECTION',
                        'INSPECTED',
                        'PENDING_RETURN_ADMIN',
                    ],
                },
            },
        };
        // assignedUserId 필터 미적용 (모든 사용자 자산)
    }
    else if (requester.role === 'USER') {
        // 일반 조회: USER 는 본인 배정 자산만 (privacy)
        where.assignedUserId = requester.id;
    }
    else if (query.assignedUserId) {
        where.assignedUserId = query.assignedUserId;
    }
    if (query.q) {
        where.OR = [
            { name: { contains: query.q, mode: 'insensitive' } },
            { assetCode: { contains: query.q, mode: 'insensitive' } },
        ];
    }
    const skip = (query.page - 1) * query.pageSize;
    const [rows, total] = await Promise.all([
        prisma_1.prisma.asset.findMany({
            where,
            skip,
            take: query.pageSize,
            orderBy: { updatedAt: 'desc' },
            include: {
                category: { select: { name: true, glAccountCode: true } },
                department: { select: { name: true } },
                location: { select: { name: true } },
                assignedUser: { select: { id: true, name: true } },
            },
        }),
        prisma_1.prisma.asset.count({ where }),
    ]);
    const items = rows.map((r) => ({
        id: r.id,
        assetCode: r.assetCode,
        name: r.name,
        class: r.class,
        status: r.status,
        condition: r.condition,
        categoryName: r.category.name,
        glAccountCode: r.category.glAccountCode,
        departmentName: r.department.name,
        locationName: r.location.name,
        assignedUserName: r.assignedUser?.name ?? null,
        updatedAt: r.updatedAt,
    }));
    return {
        items,
        total,
        page: query.page,
        pageSize: query.pageSize,
        totalPages: Math.ceil(total / query.pageSize),
    };
};
const detailInclude = {
    category: {
        select: { id: true, name: true, code: true, glAccountCode: true, glAccountName: true },
    },
    department: { select: { id: true, name: true, code: true } },
    location: { select: { id: true, name: true, building: true } },
    vendor: { select: { id: true, name: true } },
    assignedUser: { select: { id: true, name: true, email: true } },
    histories: {
        take: 20,
        orderBy: { createdAt: 'desc' },
        include: { performedBy: { select: { id: true, name: true } } },
    },
    hardware: true,
    software: true,
    peripheral: true,
    office: true,
    facility: true,
};
const toDetail = (
//DB 결과 API 응답으로 정제 하는 단계
row) => ({
    id: row.id,
    assetCode: row.assetCode,
    name: row.name,
    description: row.description,
    class: row.class,
    status: row.status,
    condition: row.condition,
    conditionAssessedAt: row.conditionAssessedAt,
    ownershipType: row.ownershipType,
    purchaseDate: row.purchaseDate,
    purchasePrice: Number(row.purchasePrice),
    currentValue: row.currentValue ? Number(row.currentValue) : null,
    imageUrl: row.imageUrl,
    category: row.category,
    department: row.department,
    location: row.location,
    vendor: row.vendor,
    assignedUser: row.assignedUser,
    hardware: row.hardware,
    software: row.software,
    peripheral: row.peripheral,
    office: row.office,
    facility: row.facility,
    histories: row.histories ?? [],
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
});
const getById = async (id, requester) => {
    const row = await prisma_1.prisma.asset.findUnique({ where: { id }, include: detailInclude });
    if (!row)
        throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
    // P3-B: USER 는 본인 할당 OR AVAILABLE 자산 조회 가능 (대여 신청 위해 detail 봐야 함)
    if (requester.role === 'USER' && row.assignedUserId !== requester.id && row.status !== 'IDLE') {
        throw new AppError_1.AppError(403, '본인 할당 또는 대여 가능 자산만 조회할 수 있습니다.');
    }
    return toDetail(row);
};
const update = async (id, dto, requesterId) => {
    return prisma_1.prisma.$transaction(async (tx) => {
        const current = await tx.asset.findUnique({ where: { id } });
        if (!current)
            throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
        // 전용 필드는 category.subType 과 일치해야 함
        const { hardware, software, peripheral, reason, ...coreDto } = dto;
        const currentCategory = await tx.assetCategory.findUnique({ where: { id: current.categoryId } });
        const currentSubType = currentCategory?.subType ?? null;
        const SPEC_SUBTYPE = {
            hardware: 'HARDWARE',
            software: 'SOFTWARE',
            peripheral: 'PERIPHERAL',
        };
        for (const [key, value] of Object.entries({ hardware, software, peripheral })) {
            if (value === undefined)
                continue;
            const expectedSubType = SPEC_SUBTYPE[key];
            if (currentSubType !== expectedSubType) {
                throw new AppError_1.AppError(400, `카테고리 유형(${currentSubType ?? '없음'})과 일치하지 않는 전용 필드입니다.`);
            }
        }
        // 코어 필드 변경 추출 (변경 전/후 기록용)
        const changes = {};
        const updateData = {};
        for (const [key, value] of Object.entries(coreDto)) {
            const before = current[key];
            if (before !== value) {
                changes[key] = { from: before, to: value };
                updateData[key] = value;
            }
        }
        // 위치·배정 변경 시 이동 사유 필수
        const isMovement = 'locationId' in changes || 'assignedUserId' in changes;
        if (isMovement && !reason) {
            throw new AppError_1.AppError(400, '위치 또는 배정 변경 시 이동 사유를 입력해야 합니다.');
        }
        // 업데이트 후 확정될 status/assignedUserId 기준으로 OPERATING 정합성 검증
        const effectiveStatus = (coreDto.status ?? current.status);
        const effectiveAssignedUserId = 'assignedUserId' in coreDto ? coreDto.assignedUserId : current.assignedUserId;
        if (effectiveStatus === 'OPERATING' && !effectiveAssignedUserId) {
            throw new AppError_1.AppError(400, '운영중(OPERATING) 상태의 자산은 담당자를 지정해야 합니다.');
        }
        const updated = await tx.asset.update({ where: { id }, data: updateData });
        // 전용 필드 업데이트 — class별 분기
        if (hardware) {
            if (hardware.serialNo !== undefined) {
                const dup = await tx.hardwareAsset.findUnique({ where: { serialNo: hardware.serialNo } });
                if (dup && dup.assetId !== id) {
                    throw new AppError_1.AppError(409, '이미 사용 중인 시리얼 번호입니다.');
                }
            }
            const before = await tx.hardwareAsset.findUnique({ where: { assetId: id } });
            const data = {};
            for (const [key, value] of Object.entries(hardware)) {
                if (value === undefined)
                    continue;
                const beforeVal = before?.[key];
                if (beforeVal !== value) {
                    changes[`hardware.${key}`] = { from: beforeVal, to: value };
                    data[key] = value;
                }
            }
            if (Object.keys(data).length > 0) {
                await tx.hardwareAsset.update({ where: { assetId: id }, data });
            }
        }
        if (software) {
            const before = await tx.softwareAsset.findUnique({ where: { assetId: id } });
            const data = {};
            for (const [key, value] of Object.entries(software)) {
                if (value === undefined)
                    continue; // JSON.stringify의 replacer 가 undefined를 반환 -> JSON 문자열에 안실리는 경우에 통과 방지
                // JSON. stringify({a: 1, b: undefined, c:"x"})
                // {"a":1 , "c": "x"} 가 되고 그대로 실행이 됨..
                const beforeVal = before?.[key];
                if (beforeVal !== value) {
                    changes[`software.${key}`] = { from: beforeVal, to: value };
                    data[key] = value;
                }
            }
            if (Object.keys(data).length > 0) {
                await tx.softwareAsset.update({ where: { assetId: id }, data });
            }
        }
        if (peripheral) {
            const before = await tx.peripheralAsset.findUnique({ where: { assetId: id } });
            const data = {};
            for (const [key, value] of Object.entries(peripheral)) {
                if (value === undefined)
                    continue;
                const beforeVal = before?.[key];
                if (beforeVal !== value) {
                    changes[`peripheral.${key}`] = { from: beforeVal, to: value };
                    data[key] = value;
                }
            }
            if (Object.keys(data).length > 0) {
                await tx.peripheralAsset.update({ where: { assetId: id }, data });
            }
        }
        // 위치 변경 > 배정 변경 > 일반 수정 순 우선순위
        let action = 'UPDATED';
        if ('locationId' in changes) {
            action = 'TRANSFERRED';
        }
        else if ('assignedUserId' in changes) {
            action = changes.assignedUserId.to ? 'ASSIGNED' : 'UNASSIGNED';
        }
        await tx.assetHistory.create({
            data: {
                assetId: id,
                action,
                description: action === 'TRANSFERRED'
                    ? `위치 이전: ${updated.assetCode}`
                    : `자산 수정: ${updated.assetCode}`,
                metadata: { changes, ...(reason ? { reason } : {}) },
                performedById: requesterId,
            },
        });
        return updated;
    });
};
const retire = async (id, requester, reason) => {
    const result = await prisma_1.prisma.$transaction(async (tx) => {
        const current = await tx.asset.findUnique({ where: { id } });
        if (!current)
            throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
        if (current.status === 'RETIRED')
            throw new AppError_1.AppError(400, '이미 폐기된 자산입니다.');
        const updated = await tx.asset.update({ where: { id }, data: { status: 'RETIRED' } });
        await tx.assetHistory.create({
            data: {
                assetId: id,
                action: 'RETIRED',
                description: reason ?? `자산 폐기: ${updated.assetCode}`,
                performedById: requester.id,
            },
        });
        return updated;
    });
    (0, sensitiveAuditLog_1.logSensitiveAction)({
        action: 'ASSET_RETIRE',
        performedById: requester.id,
        performedByRole: requester.role,
        targetId: id,
        targetType: 'Asset',
        detail: `자산코드: ${result.assetCode}`,
        timestamp: new Date().toISOString(),
    });
    return result;
};
const getHistory = async (id, page, requester) => {
    const asset = await prisma_1.prisma.asset.findUnique({ where: { id } });
    if (!asset)
        throw new AppError_1.AppError(404, '자산을 찾을 수 없습니다.');
    if (requester.role === 'USER' &&
        asset.assignedUserId !== requester.id &&
        asset.status !== 'IDLE') {
        throw new AppError_1.AppError(403, '본인 할당 또는 대여 가능 자산만 조회할 수 있습니다.');
    }
    const pageSize = 20;
    const skip = (page - 1) * pageSize;
    const [rows, total] = await Promise.all([
        prisma_1.prisma.assetHistory.findMany({
            where: { assetId: id },
            orderBy: { createdAt: 'desc' },
            skip,
            take: pageSize,
            include: { performedBy: { select: { id: true, name: true } } },
        }),
        prisma_1.prisma.assetHistory.count({ where: { assetId: id } }),
    ]);
    const locationIds = new Set();
    const userIds = new Set();
    for (const row of rows) {
        const meta = row.metadata;
        const changes = meta?.changes ?? {};
        if (changes.locationId?.from)
            locationIds.add(String(changes.locationId.from));
        if (changes.locationId?.to)
            locationIds.add(String(changes.locationId.to));
        if (changes.assignedUserId?.from)
            userIds.add(String(changes.assignedUserId.from));
        if (changes.assignedUserId?.to)
            userIds.add(String(changes.assignedUserId.to));
    }
    const [locations, users] = await Promise.all([
        locationIds.size > 0
            ? prisma_1.prisma.location.findMany({
                where: { id: { in: [...locationIds] } },
                select: { id: true, name: true },
            })
            : [],
        userIds.size > 0
            ? prisma_1.prisma.user.findMany({
                where: { id: { in: [...userIds] } },
                select: { id: true, name: true },
            })
            : [],
    ]);
    const locMap = new Map(locations.map((l) => [l.id, l.name]));
    const userMap = new Map(users.map((u) => [u.id, u.name]));
    const items = rows.map((row) => {
        const meta = row.metadata;
        if (!meta?.changes)
            return { ...row, metadata: meta };
        const changes = { ...meta.changes };
        if (changes.locationId) {
            changes.locationId = {
                ...changes.locationId,
                fromName: changes.locationId.from
                    ? (locMap.get(String(changes.locationId.from)) ?? null)
                    : null,
                toName: changes.locationId.to ? (locMap.get(String(changes.locationId.to)) ?? null) : null,
            };
        }
        if (changes.assignedUserId) {
            changes.assignedUserId = {
                ...changes.assignedUserId,
                fromName: changes.assignedUserId.from
                    ? (userMap.get(String(changes.assignedUserId.from)) ?? null)
                    : null,
                toName: changes.assignedUserId.to
                    ? (userMap.get(String(changes.assignedUserId.to)) ?? null)
                    : null,
            };
        }
        return { ...row, metadata: { ...meta, changes } };
    });
    return { items, total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
};
exports.assetService = { create, list, getById, update, retire, getHistory };
//# sourceMappingURL=asset.service.js.map