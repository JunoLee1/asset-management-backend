import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/AppError";
import { logger } from "../../lib/logger";
import { paginate, fetchPage } from "../../lib/pagination";
import { notificationService } from "../notifications/notification.service";
import type {
  CreateMaintenanceInput,
  UpdateMaintenanceInput,
  ListMaintenancesQuery,
  MaintenanceListItem,
  MaintenanceDetail,
  RequesterContext,
  PaginatedResult,
} from "./maintenance.types";
import type {
  MaintenanceStatus,
  AssetStatus,
} from "../../generated/prisma/enums";

// list/my 공용 include — MaintenanceListItem 매핑에 필요한 관계만 select
const LIST_INCLUDE = {
  asset: { select: { assetCode: true, name: true } },
  manager: { select: { name: true } },
  requestedBy: { select: { name: true } },
  managerApprovedBy: { select: { name: true } },
  adminApprovedBy: { select: { name: true } },
} as const;

type MaintenanceListRow = Awaited<
  ReturnType<typeof prisma.maintenance.findFirstOrThrow<{ include: typeof LIST_INCLUDE }>>
>;

const toListItem = (row: MaintenanceListRow): MaintenanceListItem => ({
  id: row.id,
  title: row.title,
  status: row.status,
  assetCode: row.asset.assetCode,
  assetName: row.asset.name,
  managerName: row.manager?.name ?? "",
  requesterName: row.requestedBy?.name ?? null,
  // 최종 승인자 — ADMIN 2차 승인이 있으면 그것, 없으면 MANAGER 1차
  approverName: row.adminApprovedBy?.name ?? row.managerApprovedBy?.name ?? null,
  scheduledAt: row.scheduledAt,
  completedAt: row.completedAt,
  cost: row.cost ? Number(row.cost) : null,
  payerType: row.payerType,
  createdAt: row.createdAt,
  vendorReportBody: row.vendorReportBody,
  vendorReportParsedCost: row.vendorReportParsedCost ? Number(row.vendorReportParsedCost) : null,
  vendorReportReceivedAt: row.vendorReportReceivedAt,
});

// 상태 전이 허용 매트릭스 — ADR 0003: PENDING_DEPT 추가 (자산 부서 기준 3단계)
const ALLOWED_TRANSITIONS: Record<MaintenanceStatus, MaintenanceStatus[]> = {
  PENDING_MANAGER: ["PENDING_DEPT", "PENDING_ADMIN", "REJECTED", "CANCELLED"],
  PENDING_DEPT: ["PENDING_ADMIN", "REJECTED", "CANCELLED"],
  PENDING_ADMIN: ["APPROVED", "REJECTED"],
  APPROVED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
  REJECTED: [],
};

const requireManager = (requester: RequesterContext) => {
  if (
    requester.role !== "ADMIN" &&
    requester.role !== "TEAM_LEAD" &&
    requester.role !== "REPAIR_OWNER" &&
    requester.role !== "REPAIR_TECH" &&
    requester.role !== "ASSET_MANAGER"
  ) {
    throw new AppError(403, "관리자 권한이 필요합니다.");
  }
};

const list = async (
  query: ListMaintenancesQuery,
  requester: RequesterContext,
): Promise<PaginatedResult<MaintenanceListItem>> => {
  const page = query.page ?? 1;
  const pageSize = query.pageSize ?? 20;
  const skip = (page - 1) * pageSize;

  // USER 는 본인에게 할당된 자산의 정비만 볼 수 있음
  const baseWhere: Record<string, unknown> = {};
  if (query.assetId) baseWhere["assetId"] = query.assetId;
  if (query.status) baseWhere["status"] = query.status;
  if (query.managerId) baseWhere["managerId"] = query.managerId;
  if (query.vendorId) baseWhere["vendorId"] = query.vendorId;
  if (query.keyword) {
    baseWhere["OR"] = [
      { title: { contains: query.keyword, mode: "insensitive" } },
      {
        asset: { assetCode: { contains: query.keyword, mode: "insensitive" } },
      },
      { asset: { name: { contains: query.keyword, mode: "insensitive" } } },
    ];
  }
  if (requester.role === "USER") {
    // M2: 본인이 신청한 것 + 본인에게 할당된 자산의 정비 (둘 다)
    const userFilter = [
      { requestedById: requester.id },
      { asset: { assignedUserId: requester.id } },
    ];
    baseWhere["AND"] = [
      ...(baseWhere["OR"] ? [{ OR: baseWhere["OR"] }] : []),
      { OR: userFilter },
    ];
    delete baseWhere["OR"];
  } else if (requester.role === "TEAM_LEAD") {
    // M2: 자신의 부서 자산 정비만 조회 (departmentId가 있을 때만)
    if (requester.departmentId) {
      baseWhere["asset"] = { departmentId: requester.departmentId };
    }
  }

  const { rows, total } = await fetchPage(
    () =>
      prisma.maintenance.findMany({
        where: baseWhere,
        include: LIST_INCLUDE,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
    () => prisma.maintenance.count({ where: baseWhere }),
  );

  return paginate(rows.map(toListItem), total, page, pageSize);
};

// 내가 신청한 정비 — requestedById 기준, 페이지네이션 없음 (loan.service.my 와 동일 semantics)
const my = async (
  requester: RequesterContext,
): Promise<MaintenanceListItem[]> => {
  const rows = await prisma.maintenance.findMany({
    where: { requestedById: requester.id },
    include: LIST_INCLUDE,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toListItem);
};

const getById = async (
  id: string,
  requester: RequesterContext,
): Promise<MaintenanceDetail> => {
  const row = await prisma.maintenance.findUnique({
    where: { id },
    include: {
      asset: {
        select: {
          id: true,
          assetCode: true,
          name: true,
          assignedUserId: true,
          departmentId: true,
        },
      },
      requestedBy: { select: { id: true, name: true } },
      manager: { select: { id: true, name: true } },
      managerApprovedBy: { select: { id: true, name: true } },
      adminApprovedBy: { select: { id: true, name: true } },
      vendor: { select: { id: true, name: true } },
      payerUser: { select: { id: true, name: true } },
      completionReport: {
        include: {
          submittedBy: { select: { id: true, name: true } },
          parts: true,
        },
      },
    },
  });
  if (!row) throw new AppError(404, "유지보수 건을 찾을 수 없습니다.");

  // M2: USER 는 본인 신청 + 본인 할당 자산만 조회
  if (
    requester.role === "USER" &&
    row.requestedById !== requester.id &&
    row.asset.assignedUserId !== requester.id
  ) {
    throw new AppError(403, "조회 권한이 없습니다.");
  }

  // M2: TEAM_LEAD 는 자신의 부서 자산 정비만 조회 (departmentId가 있을 때만)
  if (
    requester.role === "TEAM_LEAD" &&
    requester.departmentId &&
    row.asset.departmentId !== requester.departmentId
  ) {
    throw new AppError(403, "자신의 부서 정비만 조회할 수 있습니다.");
  }

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    asset: {
      id: row.asset.id,
      assetCode: row.asset.assetCode,
      name: row.asset.name,
      assignedUserId: row.asset.assignedUserId,
    },
    requestedBy: row.requestedBy,
    manager: row.manager,
    managerApprovedBy: row.managerApprovedBy,
    adminApprovedBy: row.adminApprovedBy,
    vendor: row.vendor,
    serviceType: row.serviceType ?? null,
    isUserFault: row.isUserFault ?? null,
    scheduledAt: row.scheduledAt,
    completedAt: row.completedAt,
    cost: row.cost ? Number(row.cost) : null,
    payerType: row.payerType,
    payerUser: row.payerUser,
    payerNote: row.payerNote,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    vendorReportBody: row.vendorReportBody,
    vendorReportParsedCost: row.vendorReportParsedCost ? Number(row.vendorReportParsedCost) : null,
    vendorReportReceivedAt: row.vendorReportReceivedAt,
    completionReport: row.completionReport
      ? {
          id: row.completionReport.id,
          summaryText: row.completionReport.summaryText,
          laborHours: row.completionReport.laborHours,
          technicianName: row.completionReport.technicianName,
          fileUrl: row.completionReport.fileUrl,
          submittedBy: row.completionReport.submittedBy,
          parts: row.completionReport.parts.map((p) => ({
            id: p.id,
            name: p.name,
            quantity: p.quantity,
            unitPrice: p.unitPrice,
          })),
          createdAt: row.completionReport.createdAt,
        }
      : null,
  };
};

// M2: USER 신청 허용. 역할 기반 시작 상태 (D-2)
// USER → PENDING_MANAGER, MANAGER → PENDING_ADMIN (1차 자동), ADMIN → APPROVED (양 단계 자동)
const create = async (
  input: CreateMaintenanceInput,
  requester: RequesterContext,
): Promise<MaintenanceDetail> => {
  const asset = await prisma.asset.findUnique({ where: { id: input.assetId } });
  if (!asset) throw new AppError(404, "자산을 찾을 수 없습니다.");
  if (asset.status === "RETIRED") {
    throw new AppError(400, "폐기된 자산은 정비를 등록할 수 없습니다.");
  }
  // USER 는 본인에게 할당된 자산만 신청 가능
  if (requester.role === "USER" && asset.assignedUserId !== requester.id) {
    throw new AppError(403, "본인에게 할당된 자산만 정비 신청할 수 있습니다.");
  }

  const now = new Date();
  let startStatus: MaintenanceStatus;
  const approvalData: Record<string, unknown> = {};
  if (requester.role === "USER") {
    startStatus = "PENDING_MANAGER";
  } else if (requester.role === "TEAM_LEAD") {
    startStatus = "PENDING_ADMIN";
    approvalData["managerApprovedAt"] = now;
    approvalData["managerApprovedById"] = requester.id;
  } else if (requester.role === "ADMIN") {
    startStatus = "APPROVED";
    approvalData["managerApprovedAt"] = now;
    approvalData["managerApprovedById"] = requester.id;
    approvalData["adminApprovedAt"] = now;
    approvalData["adminApprovedById"] = requester.id;
  } else {
    // ASSET_MANAGER 등은 정비 신청 권한 없음
    throw new AppError(403, "정비 신청 권한이 없습니다.");
  }

  const maintenanceType = input.type ?? "REPAIR";
  const created = await prisma.maintenance.create({
    data: {
      assetId: input.assetId,
      title: input.title,
      description: input.description,
      scheduledAt: input.scheduledAt,
      vendorId: input.vendorId ?? null,
      requestedById: requester.id,
      // managerId (처리자) 는 IN_PROGRESS 전이 시 결정 — 신청 시점엔 null
      status: startStatus,
      type: maintenanceType,
      ...approvalData,
    },
  });
  logger.info(
    {
      event: "maintenance_created",
      id: created.id,
      assetId: input.assetId,
      startStatus,
      type: maintenanceType,
    },
    "정비 신청",
  );

  // REPAIR 인 경우 자산 컨디션 자동 강등 (FAIR)
  // 이미 더 나쁜 등급(FAIR/POOR)이면 유지 — 강등은 EXCELLENT/GOOD 만
  // INSPECTION/UPGRADE 는 자산 정상 가정이라 변경 X
  if (
    maintenanceType === "REPAIR" &&
    (asset.condition === "EXCELLENT" || asset.condition === "GOOD")
  ) {
    await prisma.asset.update({
      where: { id: input.assetId },
      data: { condition: "FAIR", conditionAssessedAt: now },
    });
    logger.info(
      {
        event: "asset_condition_auto_degraded",
        assetId: input.assetId,
        from: asset.condition,
        to: "FAIR",
      },
      "REPAIR 신청으로 자산 컨디션 자동 강등",
    );
  }
  // ADMIN 직접 등록 시 이미 APPROVED 상태이므로
  //   1) 자산을 PENDING_MAINTENANCE 로 잠금
  //   2) 수리업체에 자동 메일 발송
  if (startStatus === "APPROVED") {
    await prisma.asset.update({
      where: { id: input.assetId },
      data: { status: "REPAIR" },
    });
    await notifyVendorAfterApproval(created.id, requester.id);
  }
  return getById(created.id, requester);
};

const assertNotSelfApproveMaint = (
  maintenanceRecord: { requestedById: string | null },
  requester: RequesterContext,
): void => {
  if (
    maintenanceRecord.requestedById &&
    maintenanceRecord.requestedById === requester.id
  ) {
    throw new AppError(
      403,
      "자기 자신이 신청한 정비는 본인이 승인/거절할 수 없습니다.",
    );
  }
};

// ADMIN 최종 승인(APPROVED) 직후 수리업체에 자동 메일 발송.
// 실패해도 승인 트랜잭션은 깨뜨리지 않고 ERP 알림으로 후속 조치를 안내한다.
const notifyVendorAfterApproval = async (
  maintenanceId: string,
  adminUserId: string,
): Promise<void> => {
  const m = await prisma.maintenance.findUnique({
    where: { id: maintenanceId },
    include: {
      asset: {
        select: {
          assetCode: true,
          name: true,
          office: { select: { modelName: true } },
        },
      },
      vendor: { select: { email: true, contactName: true } },
    },
  });
  if (!m) return;

  // REPAIR_OWNER 모두에게 "정비 배정됨" 알림 (vendor 메일 발송과 독립)
  await notificationService.createMaintenanceAssignedToRepairNotifications({
    maintenanceId: m.id,
    assetCode: m.asset.assetCode,
    assetName: m.asset.name,
    title: m.title,
  });

  const admin = await prisma.user.findUnique({
    where: { id: adminUserId },
    select: { name: true, email: true },
  });

  const reason = !m.vendor
    ? "수리업체가 지정되지 않았습니다. 업체를 지정한 후 직접 연락이 필요합니다."
    : !m.vendor.email
      ? `지정된 업체에 이메일이 등록되어 있지 않습니다. 직접 연락이 필요합니다.`
      : null;

  if (reason) {
    await notificationService.createInApp({
      type: "MAINTENANCE_VENDOR_NOTIFY_FAILED",
      title: "수리업체 메일 발송 누락",
      body: `[${m.asset.assetCode}] ${m.asset.name} — ${reason}`,
      metadata: { maintenanceId, reason: "no_vendor_email" },
      recipientId: adminUserId,
    });
    logger.warn(
      { event: "vendor_email_skipped", maintenanceId, reason },
      "수리업체 메일 미발송",
    );
    return;
  }

  try {
    await notificationService.sendMaintenanceVendorRequest({
      vendorEmail: m.vendor!.email!,
      vendorContactName: m.vendor!.contactName,
      assetCode: m.asset.assetCode,
      assetName: m.asset.name,
      modelName: m.asset.office?.modelName ?? null,
      symptom: m.title,
      description: m.description,
      urgency: "MEDIUM",
      requesterName: admin?.name ?? "담당자",
      requesterEmail: admin?.email ?? "",
    });
  } catch (err) {
    await notificationService.createInApp({
      type: "MAINTENANCE_VENDOR_NOTIFY_FAILED",
      title: "수리업체 메일 발송 실패",
      body: `[${m.asset.assetCode}] ${m.asset.name} — 메일 발송 중 오류가 발생했습니다. 직접 연락 부탁드립니다.`,
      metadata: {
        maintenanceId,
        reason: "smtp_error",
        error: err instanceof Error ? err.message : String(err),
      },
      recipientId: adminUserId,
    });
    logger.error(
      { event: "vendor_email_failed", maintenanceId, err },
      "수리업체 메일 발송 실패",
    );
  }
};

// M2 승인 — caller role + 현재 status 자동 분기
interface ApproveOptions {
  // ADMIN 2차 승인 시 현장 확인 후 컨디션 정정 (선택)
  conditionOverride?: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
}

const approve = async (
  id: string,
  requester: RequesterContext,
  options: ApproveOptions = {},
): Promise<MaintenanceDetail> => {
  const maintenanceRecord = await prisma.maintenance.findUnique({
    where: { id },
  });
  if (!maintenanceRecord)
    throw new AppError(404, "유지보수 건을 찾을 수 없습니다.");
  assertNotSelfApproveMaint(maintenanceRecord, requester);

  if (maintenanceRecord.status === "PENDING_MANAGER") {
    if (requester.role !== "TEAM_LEAD" && requester.role !== "ADMIN") {
      throw new AppError(403, "매니저 또는 관리자 권한이 필요합니다.");
    }
    // ADR 0003 — 자산 부서 기준: 자산 소속 부서의 TEAM_LEAD 만 1차 승인 가능
    const asset = await prisma.asset.findUnique({
      where: { id: maintenanceRecord.assetId },
      select: {
        assetCode: true,
        name: true,
        departmentId: true,
        department: {
          select: {
            leaderId: true,
            leader: { select: { isOutOfOffice: true } },
          },
        },
      },
    });
    if (!asset) throw new AppError(404, "자산을 찾을 수 없습니다.");

    if (requester.role === "TEAM_LEAD") {
      const deptTeams = await prisma.team.findMany({
        where: { departmentId: asset.departmentId },
        select: { teamLeadId: true },
      });
      const deptTeamLeadIds = deptTeams.map((t) => t.teamLeadId).filter(Boolean);
      if (!deptTeamLeadIds.includes(requester.id)) {
        throw new AppError(403, "자산 소속 부서의 팀장만 정비를 승인할 수 있습니다.");
      }
    }

    // ADR 0003 — PENDING_DEPT 스킵 조건 (자산 부서 기준)
    const deptLeaderId = asset.department?.leaderId ?? null;
    const deptLeaderOOO = asset.department?.leader?.isOutOfOffice ?? false;
    const skipDept =
      !deptLeaderId ||
      deptLeaderOOO ||
      deptLeaderId === maintenanceRecord.requestedById;
    const nextStatus: MaintenanceStatus = skipDept ? "PENDING_ADMIN" : "PENDING_DEPT";

    if (!ALLOWED_TRANSITIONS[maintenanceRecord.status].includes(nextStatus)) {
      throw new AppError(400, `${maintenanceRecord.status} → ${nextStatus} 전이가 허용되지 않습니다.`);
    }
    await prisma.maintenance.update({
      where: { id },
      data: {
        status: nextStatus,
        managerApprovedAt: new Date(),
        managerApprovedById: requester.id,
      },
    });
    logger.info(
      { event: "maintenance_approved_manager", id, by: requester.id, nextStatus },
      "정비 MANAGER 승인",
    );

    if (nextStatus === "PENDING_DEPT" && deptLeaderId) {
      try {
        await notificationService.createMaintenancePendingDeptNotification({
          maintenanceId: id,
          assetCode: asset.assetCode,
          assetName: asset.name,
          deptLeaderId,
        });
      } catch (err) {
        logger.warn({ event: "maintenance_dept_notify_failed", id, err }, "정비 부서장 승인 알림 실패");
      }
    }
  } else if (maintenanceRecord.status === "PENDING_DEPT") {
    // ADR 0003 — 자산 부서 DEPT_LEAD 2차 승인. ADMIN 은 DEPT_LEAD OOO 시 대행
    if (requester.role !== "DEPT_LEAD" && requester.role !== "REPAIR_OWNER" && requester.role !== "ADMIN") {
      throw new AppError(403, "부서장 또는 관리자 권한이 필요합니다.");
    }
    const asset = await prisma.asset.findUnique({
      where: { id: maintenanceRecord.assetId },
      select: {
        department: {
          select: {
            leaderId: true,
            leader: { select: { isOutOfOffice: true } },
          },
        },
      },
    });
    if (!asset) throw new AppError(404, "자산을 찾을 수 없습니다.");
    const deptLeaderId = asset.department?.leaderId ?? null;
    const deptLeaderOOO = asset.department?.leader?.isOutOfOffice ?? false;

    if ((requester.role === "DEPT_LEAD" || requester.role === "REPAIR_OWNER") && deptLeaderId !== requester.id) {
      throw new AppError(403, "자산 소속 부서의 부서장만 정비를 승인할 수 있습니다.");
    }
    if (requester.role === "ADMIN" && deptLeaderId && !deptLeaderOOO) {
      throw new AppError(403, "담당 부서장이 재직 중입니다. 부서장을 통해 승인하세요.");
    }
    if (!ALLOWED_TRANSITIONS[maintenanceRecord.status].includes("PENDING_ADMIN")) {
      throw new AppError(400, `${maintenanceRecord.status} → PENDING_ADMIN 전이가 허용되지 않습니다.`);
    }
    await prisma.maintenance.update({
      where: { id },
      data: {
        status: "PENDING_ADMIN",
        deptApprovedAt: new Date(),
        deptApprovedById: requester.id,
      },
    });
    logger.info(
      { event: "maintenance_approved_dept", id, by: requester.id },
      "정비 DEPT 승인",
    );
  } else if (maintenanceRecord.status === "PENDING_ADMIN") {
    if (requester.role !== "ADMIN") {
      throw new AppError(403, "관리자 권한이 필요합니다.");
    }
    if (!ALLOWED_TRANSITIONS[maintenanceRecord.status].includes("APPROVED")) {
      throw new AppError(
        400,
        `${maintenanceRecord.status} → APPROVED 전이가 허용되지 않습니다.`,
      );
    }
    // 원자적 재확인 + 승인 — 동시에 여러 approve() 호출이 똑같이 PENDING_ADMIN을
    // 읽고 나란히 통과해버리는 걸 막기 위해, updateMany(where: status=PENDING_ADMIN)로
    // 조건부 업데이트하고 실제로 갱신된 건이 있을 때만 나머지를 진행한다.
    await prisma.$transaction(async (tx) => {
      const claimed = await tx.maintenance.updateMany({
        where: { id, status: "PENDING_ADMIN" },
        data: {
          status: "APPROVED",
          adminApprovedAt: new Date(),
          adminApprovedById: requester.id,
        },
      });
      if (claimed.count === 0) {
        throw new AppError(409, "이미 다른 요청으로 처리된 정비 건입니다.");
      }
      // 자산 잠금: APPROVED 시점에 PENDING_MAINTENANCE 로 전이 (대여 차단 + 분석 반영)
      // ADMIN이 conditionOverride를 보냈으면 함께 갱신 (현장 확인 결과)
      await tx.asset.update({
        where: { id: maintenanceRecord.assetId },
        data: options.conditionOverride
          ? {
              status: "REPAIR",
              condition: options.conditionOverride,
              conditionAssessedAt: new Date(),
            }
          : { status: "REPAIR" },
      });
    });
    logger.info(
      {
        event: "maintenance_approved_admin",
        id,
        by: requester.id,
        conditionOverride: options.conditionOverride,
      },
      "정비 ADMIN 승인",
    );

    // ADMIN 승인 직후 — 수리업체에 자동 메일 발송 (best-effort)
    // 실패 시 ERP 알림으로 승인자에게 "수동 처리 필요" 통보
    await notifyVendorAfterApproval(id, requester.id);
  } else {
    throw new AppError(
      400,
      `현재 상태(${maintenanceRecord.status})에서는 승인할 수 없습니다.`,
    );
  }
  return getById(id, requester);
};

// M2 거절 — MANAGER/ADMIN 모두, PENDING_* 단계에서만
const reject = async (
  id: string,
  body: { reason: string },
  requester: RequesterContext,
): Promise<MaintenanceDetail> => {
  if (requester.role !== "TEAM_LEAD" && requester.role !== "ADMIN") {
    throw new AppError(403, "매니저 또는 관리자 권한이 필요합니다.");
  }
  const maintenanceRecord = await prisma.maintenance.findUnique({
    where: { id },
  });
  if (!maintenanceRecord)
    throw new AppError(404, "유지보수 건을 찾을 수 없습니다.");
  assertNotSelfApproveMaint(maintenanceRecord, requester);
  if (!ALLOWED_TRANSITIONS[maintenanceRecord.status].includes("REJECTED")) {
    throw new AppError(
      400,
      `현재 상태(${maintenanceRecord.status})에서는 거절할 수 없습니다.`,
    );
  }
  await prisma.maintenance.update({
    where: { id },
    data: {
      status: "REJECTED",
      rejectReason: body.reason,
      rejectedAt: new Date(),
      rejectedById: requester.id,
    },
  });
  logger.info(
    { event: "maintenance_rejected", id, by: requester.id },
    "정비 거절",
  );
  return getById(id, requester);
};

// M2 취소 — 신청자(USER) 본인만, PENDING_MANAGER 단계에서만
const cancel = async (
  id: string,
  requester: RequesterContext,
): Promise<MaintenanceDetail> => {
  const maintenanceRecord = await prisma.maintenance.findUnique({
    where: { id },
  });
  if (!maintenanceRecord)
    throw new AppError(404, "유지보수 건을 찾을 수 없습니다.");
  if (maintenanceRecord.requestedById !== requester.id) {
    throw new AppError(403, "본인이 신청한 정비만 취소할 수 있습니다.");
  }
  if (maintenanceRecord.status !== "PENDING_MANAGER") {
    throw new AppError(400, "승인 절차가 시작된 후에는 취소할 수 없습니다.");
  }
  await prisma.maintenance.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  logger.info(
    { event: "maintenance_cancelled", id, by: requester.id },
    "정비 취소",
  );
  return getById(id, requester);
};

interface TransitionResult {
  prevStatus: MaintenanceStatus;
  nextStatus: MaintenanceStatus;
  assetStatusBefore: AssetStatus;
  newAssetStatus: AssetStatus | null;
}

// 상태 전이 + 자산 status 자동 연동 + AssetHistory 기록
const update = async (
  id: string,
  input: UpdateMaintenanceInput,
  requester: RequesterContext,
): Promise<MaintenanceDetail> => {
  requireManager(requester);
  const current = await prisma.maintenance.findUnique({
    // 지금 수리 하려고 하는 정비건 의 현재 상태
    where: { id },
    include: {
      asset: {
        select: {
          id: true,
          status: true,
          assetCode: true,
          name: true,
          assignedUserId: true,
        },
      },
    },
  });
  if (!current) throw new AppError(404, "유지보수 건을 찾을 수 없습니다.");

  // 종결 상태에서는 수정 불가
  if (current.status === "COMPLETED" || current.status === "CANCELLED") {
    throw new AppError(400, "종결된 정비는 수정할 수 없습니다.");
  }

  // 상태 전이 검증
  let transition: TransitionResult | null = null;
  if (input.status && input.status !== current.status) {
    // 상태 변경 시도 유무 체크
    const allowed = ALLOWED_TRANSITIONS[current.status];
    if (!allowed.includes(input.status)) {
      //ALLOWED_TRANSITIONS에 없는 모든 전이 차단
      //(예: PENDING → COMPLETED, COMPLETED → IN_PROGRESS, CANCELLED → 어디로든 등)
      throw new AppError(
        400,
        `${current.status} → ${input.status} 전이는 허용되지 않습니다.`,
      );
    }
    transition = {
      // change Set으로 status 변동 추적
      prevStatus: current.status,
      nextStatus: input.status,
      assetStatusBefore: current.asset.status,
      newAssetStatus: null,
    };
    // 자산 status 자동 변경
    if (input.status === "APPROVED") {
      // 정비 승인됨 — 아직 작업 시작 안 함. 대여 차단 + 운영 분석에 반영
      transition.newAssetStatus = "REPAIR";
    } else if (input.status === "IN_PROGRESS") {
      transition.newAssetStatus = "REPAIR"; // 실제 작업 시작
    } else if (input.status === "COMPLETED") {
      // 정비 종료 — REPAIR 였던 자산은 IDLE 로 복원
      const wasLocked = current.asset.status === "REPAIR";
      transition.newAssetStatus = wasLocked ? "IDLE" : current.asset.status;
    } else if (input.status === "CANCELLED") {
      // 취소 — REPAIR 였던 자산은 IDLE 로 복원
      const wasLocked = current.asset.status === "REPAIR";
      if (wasLocked) transition.newAssetStatus = "IDLE";
    }
  }

  // COMPLETED 전이 시 비용/지불자 검증
  if (input.status === "COMPLETED") {
    const cost = input.cost ?? current.cost;
    const payerType = input.payerType ?? current.payerType;
    if (cost === null || cost === undefined) {
      throw new AppError(400, "완료 처리 시 비용은 필수입니다.");
    }
    if (!payerType) {
      throw new AppError(400, "완료 처리 시 지불자(payerType)는 필수입니다.");
    }
    if (
      (payerType === "USER" || payerType === "SHARED") &&
      !(input.payerUserId ?? current.payerUserId)
    ) {
      throw new AppError(
        400,
        "개인/분담 부담 시 지불 사용자(payerUserId)는 필수입니다.",
      );
    }
    // 수리 완료 보고서 필수 (벤더 제출)
    if (!input.completionReport) {
      throw new AppError(400, "완료 처리 시 수리 완료 보고서(completionReport)는 필수입니다.");
    }
  }

  // 트랜잭션: Maintenance 업데이트 + Asset.status + AssetHistory
  const result = await prisma.$transaction(async (tx) => {
    const data: Record<string, unknown> = {};
    if (input.title !== undefined) data["title"] = input.title;
    if (input.description !== undefined)
      data["description"] = input.description;
    if (input.scheduledAt !== undefined)
      data["scheduledAt"] = input.scheduledAt;
    if (input.vendorId !== undefined) data["vendorId"] = input.vendorId;
    if (input.managerId !== undefined) data["managerId"] = input.managerId;
    if (input.serviceType !== undefined)
      data["serviceType"] = input.serviceType;
    if (input.isUserFault !== undefined)
      data["isUserFault"] = input.isUserFault;
    if (input.cost !== undefined) data["cost"] = input.cost;
    if (input.payerType !== undefined) data["payerType"] = input.payerType;
    if (input.payerUserId !== undefined)
      data["payerUserId"] = input.payerUserId;
    if (input.payerNote !== undefined) data["payerNote"] = input.payerNote;
    if (input.status !== undefined) {
      data["status"] = input.status;
      if (input.status === "COMPLETED") data["completedAt"] = new Date();
    }

    const updated = await tx.maintenance.update({ where: { id }, data });

    // COMPLETED 처리 시 자산관리자·수리기술자가 평가한 컨디션 반영
    // status 복원과 동일 트랜잭션에서 처리 (분석 차트 일관성)
    const shouldUpdateCondition =
      input.conditionAfter !== undefined && input.status === "COMPLETED";

    if (transition?.newAssetStatus || shouldUpdateCondition) {
      const assetUpdate: {
        status?: AssetStatus;
        condition?: typeof input.conditionAfter;
        conditionAssessedAt?: Date;
      } = {};
      if (transition?.newAssetStatus)
        assetUpdate.status = transition.newAssetStatus;
      if (shouldUpdateCondition) {
        assetUpdate.condition = input.conditionAfter;
        assetUpdate.conditionAssessedAt = new Date();
      }
      await tx.asset.update({
        where: { id: current.asset.id },
        data: assetUpdate,
      });
    }

    if (transition?.nextStatus === "IN_PROGRESS") {
      await tx.assetHistory.create({
        data: {
          assetId: current.asset.id,
          action: "MAINTENANCE_STARTED",
          description: updated.title,
          metadata: { maintenanceId: id },
          performedById: requester.id,
        },
      });
    } else if (transition?.nextStatus === "COMPLETED") {
      await tx.assetHistory.create({
        data: {
          assetId: current.asset.id,
          action: "MAINTENANCE_COMPLETED",
          description: updated.title,
          metadata: {
            maintenanceId: id,
            cost: updated.cost ? Number(updated.cost) : null,
            payerType: updated.payerType,
            payerUserId: updated.payerUserId,
          },
          performedById: requester.id,
        },
      });
      // 수리 완료 보고서 생성 (COMPLETED 가드에서 존재 검증 완료)
      const report = input.completionReport!
      await tx.repairCompletionReport.create({
        data: {
          maintenanceId: id,
          summaryText: report.summaryText,
          laborHours: report.laborHours,
          technicianName: report.technicianName,
          fileUrl: report.fileUrl,
          submittedById: requester.id,
          parts: {
            create: report.parts.map((p) => ({
              name: p.name,
              quantity: p.quantity,
              unitPrice: p.unitPrice,
            })),
          },
        },
      })
    }
    return updated;
  });

  // COMPLETED 전이 시 신청자(USER) + REPAIR_OWNER 에게 알림
  if (transition?.nextStatus === "COMPLETED") {
    await notificationService.createMaintenanceCompletedNotifications({
      maintenanceId: id,
      assetCode: current.asset.assetCode,
      assetName: current.asset.name,
      requesterId: current.requestedById,
    });
  }

  if (transition) {
    logger.info(
      {
        event: "maintenance_transition",
        id,
        from: transition.prevStatus,
        to: transition.nextStatus,
        assetStatus: transition.newAssetStatus,
      },
      "정비 상태 전이",
    );
  }

  // 과실 확정 + 비용 > 0 → 해당 사원에게 비용 청구 알림
  const updatedFault = input.isUserFault ?? current.isUserFault;
  const updatedCost =
    input.cost !== undefined
      ? input.cost
      : current.cost
        ? Number(current.cost)
        : null;
  const chargeTargetId =
    input.payerUserId ?? current.payerUserId ?? current.asset.assignedUserId;
  if (
    updatedFault === true &&
    updatedCost &&
    updatedCost > 0 &&
    chargeTargetId
  ) {
    await notificationService
      .createInApp({
        recipientId: chargeTargetId,
        type: "MAINTENANCE_CHARGE",
        title: "수리 비용 청구",
        body: `${current.asset.assetCode} 수리 비용 ${updatedCost.toLocaleString()}원이 청구되었습니다.`,
        metadata: { maintenanceId: id, cost: updatedCost },
      })
      .catch(() => {}); // 알림 실패는 메인 플로우 차단 안 함
  }

  return getById(result.id, requester);
};

// REPAIR_OWNER 가 PENDING_ADMIN 단계에서 외부 업체 또는 내부 기술자를 배정.
// 배정 행위 자체가 회사의 수리 결정으로 간주되어 PENDING_ADMIN → APPROVED 전이를 함께 수행.
// vendorId / technicianId 중 정확히 하나만 (XOR — zod 단에서 보장).
interface AssignInput {
  vendorId?: string;
  technicianId?: string;
}

const assign = async (
  id: string,
  input: AssignInput,
  requester: RequesterContext,
): Promise<MaintenanceDetail> => {
  if (requester.role !== "REPAIR_OWNER" && requester.role !== "ADMIN") {
    throw new AppError(403, "REPAIR_OWNER 또는 ADMIN 권한이 필요합니다.");
  }

  const m = await prisma.maintenance.findUnique({ where: { id } });
  if (!m) throw new AppError(404, "유지보수 건을 찾을 수 없습니다.");

  if (m.status !== "PENDING_ADMIN") {
    throw new AppError(
      400,
      `현재 상태(${m.status})에서는 배정할 수 없습니다. PENDING_ADMIN 단계에서만 가능합니다.`,
    );
  }
  if (!ALLOWED_TRANSITIONS[m.status].includes("APPROVED")) {
    throw new AppError(400, `${m.status} → APPROVED 전이가 허용되지 않습니다.`);
  }

  if (input.vendorId) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: input.vendorId },
      select: { id: true, status: true, deletedAt: true },
    });
    if (!vendor || vendor.deletedAt)
      throw new AppError(404, "업체를 찾을 수 없습니다.");
    if (vendor.status !== "APPROVED") {
      throw new AppError(400, "승인된 업체만 배정할 수 있습니다.");
    }
  }

  if (input.technicianId) {
    const technician = await prisma.user.findUnique({
      where: { id: input.technicianId },
      select: { id: true, isActive: true },
    });
    if (!technician) throw new AppError(404, "기술자를 찾을 수 없습니다.");
    if (!technician.isActive)
      throw new AppError(400, "비활성 사용자를 배정할 수 없습니다.");
  }

  // 원자적 재확인 + 배정 — approve()의 PENDING_ADMIN 분기와 동일한 이유로,
  // 동시에 여러 assign()/approve() 호출이 똑같이 PENDING_ADMIN을 보고
  // 나란히 통과하는 걸 조건부 UPDATE로 막는다.
  await prisma.$transaction(async (tx) => {
    const claimed = await tx.maintenance.updateMany({
      where: { id, status: "PENDING_ADMIN" },
      data: {
        status: "APPROVED",
        adminApprovedAt: new Date(),
        adminApprovedById: requester.id,
        ...(input.vendorId ? { vendorId: input.vendorId } : {}),
        ...(input.technicianId ? { managerId: input.technicianId } : {}),
      },
    });
    if (claimed.count === 0) {
      throw new AppError(409, "이미 다른 요청으로 처리된 정비 건입니다.");
    }
    // 자산 잠금 — APPROVED 시점에 대여 차단 + 분석 반영
    await tx.asset.update({
      where: { id: m.assetId },
      data: { status: "REPAIR" },
    });
  });

  logger.info(
    {
      event: input.vendorId
        ? "maintenance_assigned_vendor"
        : "maintenance_assigned_technician",
      id,
      by: requester.id,
      vendorId: input.vendorId,
      technicianId: input.technicianId,
    },
    "정비 REPAIR_OWNER 배정",
  );

  // vendor 배정 시에만 자동 메일 발송 (기존 approve 의 ADMIN 분기와 동일 패턴)
  if (input.vendorId) {
    await notifyVendorAfterApproval(id, requester.id);
  }

  return getById(id, requester);
};

export const maintenanceService = {
  list,
  my,
  getById,
  create,
  update,
  approve,
  reject,
  cancel,
  assign,
};
