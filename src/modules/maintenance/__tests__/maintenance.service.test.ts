import { AppError } from "../../../lib/AppError";
import { maintenanceService } from "../maintenance.service";

jest.mock("../../../lib/prisma", () => ({
  prisma: {
    maintenance: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    asset: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    assetHistory: {
      create: jest.fn(),
    },
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    vendor: {
      findUnique: jest.fn(),
    },
    $transaction: jest.fn(),
  },
}));

jest.mock("../../../lib/logger", () => ({
  logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}));

jest.mock("../../notifications/notification.service", () => ({
  notificationService: {
    createMaintenanceAssignedToRepairNotifications: jest.fn(),
    createInApp: jest.fn(),
  },
}));

import { prisma } from "../../../lib/prisma";

const mockMtFindUnique = prisma.maintenance.findUnique as jest.Mock;
const mockMtCreate = prisma.maintenance.create as jest.Mock;
const mockAssetFindUnique = prisma.asset.findUnique as jest.Mock;
const mockVendorFindUnique = prisma.vendor.findUnique as jest.Mock;
const mockTransaction = prisma.$transaction as unknown as jest.Mock;

const adminCtx = { id: "mgr-1", role: "ADMIN" as const };
const managerCtx = { id: "mgr-2", role: "TEAM_LEAD" as const };
const userCtx = { id: "user-1", role: "USER" as const };

const baseAsset = {
  id: "asset-1",
  assetCode: "A-001",
  name: "노트북",
  status: "IDLE" as const,
  assignedUserId: "user-1",
};

const baseMt = {
  id: "mt-1",
  title: "키보드 수리",
  description: "키보드 일부 키 파손",
  status: "PENDING" as const,
  cost: null,
  scheduledAt: new Date(),
  completedAt: null,
  vendorId: null,
  managerId: "mgr-1",
  payerType: null,
  payerUserId: null,
  payerNote: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  asset: baseAsset,
  manager: { id: "mgr-1", name: "관리자" },
  vendor: null,
  payerUser: null,
};

beforeEach(() => {
  jest.clearAllMocks();
});

// ── my ────────────────────────────────────────────────────────────────────────
describe("maintenanceService.my", () => {
  const mockMtFindMany = prisma.maintenance.findMany as jest.Mock;

  const myRow = {
    ...baseMt,
    id: "mt-my-1",
    requestedById: userCtx.id,
    requestedBy: { name: "신청자" },
    managerApprovedBy: null,
    adminApprovedBy: null,
  };

  it("requestedById == requester.id 조건으로 조회한다", async () => {
    mockMtFindMany.mockResolvedValue([myRow]);

    const result = await maintenanceService.my(userCtx);

    expect(mockMtFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { requestedById: userCtx.id },
        orderBy: { createdAt: "desc" },
      }),
    );
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("mt-my-1");
    expect(result[0]?.requesterName).toBe("신청자");
  });

  it("신청 이력이 없으면 빈 배열을 반환한다", async () => {
    mockMtFindMany.mockResolvedValue([]);

    const result = await maintenanceService.my(userCtx);

    expect(result).toEqual([]);
  });

  it("ADMIN 도 본인이 신청한 건만 본다", async () => {
    mockMtFindMany.mockResolvedValue([]);

    await maintenanceService.my(adminCtx);

    expect(mockMtFindMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { requestedById: adminCtx.id },
      }),
    );
  });
});

// ── create ───────────────────────────────────────────────────────────────────
describe("maintenanceService.create", () => {
  it("관리자가 APPROVED 상태로 정비를 등록한다 (2단 승인 자동 처리)", async () => {
    mockAssetFindUnique.mockResolvedValue(baseAsset);
    mockMtCreate.mockResolvedValue({ id: "mt-1" });
    mockMtFindUnique.mockResolvedValue({ ...baseMt, status: "APPROVED" });

    const result = await maintenanceService.create(
      {
        assetId: "asset-1",
        title: "키보드 수리",
        description: "일부 키 인식 불량",
        scheduledAt: new Date(),
      },
      adminCtx,
    );

    expect(mockMtCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "APPROVED",
          requestedById: "mgr-1",
        }),
      }),
    );
    expect(result.status).toBe("APPROVED");
  });

  it("USER가 본인 할당이 아닌 자산에 신청하면 403", async () => {
    mockAssetFindUnique.mockResolvedValue({
      ...baseAsset,
      assignedUserId: "other-user",
    });
    await expect(
      maintenanceService.create(
        {
          assetId: "asset-1",
          title: "t",
          description: "d",
          scheduledAt: new Date(),
        },
        userCtx,
      ),
    ).rejects.toThrow(
      new AppError(403, "본인에게 할당된 자산만 정비 신청할 수 있습니다."),
    );
  });

  it("TEAM_LEAD가 PENDING_ADMIN 상태로 등록 (manager 자동 승인)", async () => {
    mockAssetFindUnique.mockResolvedValue(baseAsset);
    mockMtCreate.mockResolvedValue({ id: "mt-1" });
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      status: "PENDING_ADMIN",
      requestedById: "mgr-2",
      managerApprovedAt: new Date(),
      managerApprovedById: "mgr-2",
    });

    const result = await maintenanceService.create(
      {
        assetId: "asset-1",
        title: "정비 신청",
        description: "desc",
        scheduledAt: new Date(),
      },
      managerCtx,
    );

    expect(mockMtCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: "PENDING_ADMIN",
          requestedById: "mgr-2",
          managerApprovedAt: expect.any(Date),
          managerApprovedById: "mgr-2",
        }),
      }),
    );
    expect(result.status).toBe("PENDING_ADMIN");
  });

  it("RETIRED 자산은 등록 불가", async () => {
    mockAssetFindUnique.mockResolvedValue({ ...baseAsset, status: "RETIRED" });
    await expect(
      maintenanceService.create(
        {
          assetId: "asset-1",
          title: "t",
          description: "d",
          scheduledAt: new Date(),
        },
        managerCtx,
      ),
    ).rejects.toThrow(
      new AppError(400, "폐기된 자산은 정비를 등록할 수 없습니다."),
    );
  });
});

// ── approve & cancel ─────────────────────────────────────────────────────────
describe("maintenanceService.approve & cancel", () => {
  it("5-7: ADMIN이 PENDING_ADMIN을 APPROVED로 승인 (TEAM_LEAD 본인 등록 건)", async () => {
    const pendingAdminMt = {
      ...baseMt,
      id: "mt-7",
      status: "PENDING_ADMIN",
      requestedById: "mgr-2",
      assetId: "asset-1",
    };
    const approvedMt = { ...pendingAdminMt, status: "APPROVED" as const };
    mockMtFindUnique
      .mockResolvedValueOnce(pendingAdminMt) // approve() 자신의 조회
      .mockResolvedValueOnce(approvedMt) // notifyVendorAfterApproval 내부 조회
      .mockResolvedValueOnce(approvedMt) // getById (응답 조립)
    const tx = {
      maintenance: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
      asset: { update: jest.fn() },
    };
    mockTransaction.mockImplementation(async (cb: (tx: unknown) => unknown) => cb(tx));

    await maintenanceService.approve("mt-7", adminCtx);

    expect(tx.maintenance.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "mt-7", status: "PENDING_ADMIN" },
        data: expect.objectContaining({ status: "APPROVED" }),
      }),
    );
    expect(tx.asset.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "asset-1" }, data: { status: "REPAIR" } }),
    );
  });

  it("5-7b: 동시에 두 번 승인되면 두 번째는 409로 거부되고 자산은 건드리지 않는다", async () => {
    const pendingAdminMt = {
      ...baseMt,
      id: "mt-7",
      status: "PENDING_ADMIN",
      requestedById: "mgr-2",
      assetId: "asset-1",
    };
    mockMtFindUnique.mockResolvedValueOnce(pendingAdminMt);
    const tx = {
      // 다른 동시 요청이 이미 선점해서 이 updateMany는 0건 매치
      maintenance: { updateMany: jest.fn().mockResolvedValue({ count: 0 }) },
      asset: { update: jest.fn() },
    };
    mockTransaction.mockImplementation(async (cb: (tx: unknown) => unknown) => cb(tx));

    await expect(maintenanceService.approve("mt-7", adminCtx)).rejects.toMatchObject({
      statusCode: 409,
    });
    expect(tx.asset.update).not.toHaveBeenCalled();
  });

  it("assign() — REPAIR_OWNER가 업체를 배정하면 원자적으로 APPROVED 전이", async () => {
    const pendingAdminMt = {
      ...baseMt,
      id: "mt-9",
      status: "PENDING_ADMIN",
      assetId: "asset-1",
    };
    const approvedMt = { ...pendingAdminMt, status: "APPROVED" as const, vendorId: "vendor-1" };
    mockMtFindUnique
      .mockResolvedValueOnce(pendingAdminMt) // assign() 자신의 조회
      .mockResolvedValueOnce(approvedMt) // notifyVendorAfterApproval 내부 조회
      .mockResolvedValueOnce(approvedMt) // getById (응답 조립)
    mockVendorFindUnique.mockResolvedValue({ id: "vendor-1", status: "APPROVED", deletedAt: null })
    const tx = {
      maintenance: { updateMany: jest.fn().mockResolvedValue({ count: 1 }) },
      asset: { update: jest.fn() },
    };
    mockTransaction.mockImplementation(async (cb: (tx: unknown) => unknown) => cb(tx));

    await maintenanceService.assign(
      "mt-9",
      { vendorId: "vendor-1" },
      { id: "owner-1", role: "REPAIR_OWNER" as const },
    );

    expect(tx.maintenance.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "mt-9", status: "PENDING_ADMIN" },
        data: expect.objectContaining({ status: "APPROVED", vendorId: "vendor-1" }),
      }),
    );
    expect(tx.asset.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: "asset-1" }, data: { status: "REPAIR" } }),
    );
  });

  it("assign() — 동시에 두 번 배정되면 두 번째는 409로 거부되고 자산은 건드리지 않는다", async () => {
    const pendingAdminMt = {
      ...baseMt,
      id: "mt-9",
      status: "PENDING_ADMIN",
      assetId: "asset-1",
    };
    mockMtFindUnique.mockResolvedValueOnce(pendingAdminMt)
    mockVendorFindUnique.mockResolvedValue({ id: "vendor-1", status: "APPROVED", deletedAt: null })
    const tx = {
      maintenance: { updateMany: jest.fn().mockResolvedValue({ count: 0 }) },
      asset: { update: jest.fn() },
    };
    mockTransaction.mockImplementation(async (cb: (tx: unknown) => unknown) => cb(tx));

    await expect(
      maintenanceService.assign(
        "mt-9",
        { vendorId: "vendor-1" },
        { id: "owner-1", role: "REPAIR_OWNER" as const },
      ),
    ).rejects.toMatchObject({ statusCode: 409 });
    expect(tx.asset.update).not.toHaveBeenCalled();
  });

  it("5-8: USER가 PENDING_MANAGER 단계에서 정비 취소", async () => {
    const pendingManagerMt = {
      ...baseMt,
      id: "mt-8",
      status: "PENDING_MANAGER",
      requestedById: "user-1",
    };
    mockMtFindUnique
      .mockResolvedValueOnce(pendingManagerMt)
      .mockResolvedValueOnce({ ...pendingManagerMt, status: "CANCELLED" });

    const result = await maintenanceService.cancel("mt-8", userCtx);

    expect(result.status).toBe("CANCELLED");
  });
});

// ── update — 상태 전이 ────────────────────────────────────────────────────────
describe("maintenanceService.update (transition)", () => {
  it("APPROVED → COMPLETED 직행은 금지", async () => {
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      status: "APPROVED",
      asset: { id: "asset-1", status: "IDLE" },
    });
    await expect(
      maintenanceService.update(
        "mt-1",
        { status: "COMPLETED", cost: 50000, payerType: "COMPANY" },
        adminCtx,
      ),
    ).rejects.toThrow(/전이는 허용되지 않습니다/);
  });

  it("APPROVED → IN_PROGRESS 전이 시 Asset.status = UNDER_MAINTENANCE", async () => {
    mockMtFindUnique
      .mockResolvedValueOnce({
        ...baseMt,
        status: "APPROVED",
        asset: { id: "asset-1", status: "IDLE" },
      })
      .mockResolvedValueOnce({ ...baseMt, status: "IN_PROGRESS" });

    mockTransaction.mockImplementation(async (cb: (tx: unknown) => unknown) => {
      const tx = {
        maintenance: {
          update: jest
            .fn()
            .mockResolvedValue({
              id: "mt-1",
              status: "IN_PROGRESS",
              title: "키보드 수리",
            }),
        },
        asset: { update: jest.fn() },
        assetHistory: { create: jest.fn() },
      };
      const result = await cb(tx);
      (maintenanceService as unknown as { __lastTx: typeof tx }).__lastTx = tx;
      return result;
    });

    await maintenanceService.update(
      "mt-1",
      { status: "IN_PROGRESS" },
      adminCtx,
    );

    const tx = (
      maintenanceService as unknown as {
        __lastTx: {
          asset: { update: jest.Mock };
          assetHistory: { create: jest.Mock };
        };
      }
    ).__lastTx;
    expect(tx.asset.update).toHaveBeenCalledWith({
      where: { id: "asset-1" },
      data: { status: "REPAIR" },
    });
    expect(tx.assetHistory.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ action: "MAINTENANCE_STARTED" }),
      }),
    );
  });

  it("IN_PROGRESS → COMPLETED 전이 시 cost와 payerType 필수", async () => {
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      status: "IN_PROGRESS",
      asset: { id: "asset-1", status: "REPAIR" },
    });

    await expect(
      maintenanceService.update("mt-1", { status: "COMPLETED" }, adminCtx),
    ).rejects.toThrow(/비용은 필수/);

    await expect(
      maintenanceService.update(
        "mt-1",
        { status: "COMPLETED", cost: 50000 },
        adminCtx,
      ),
    ).rejects.toThrow(/지불자/);
  });

  it("COMPLETED 시 USER/SHARED 면 payerUserId 필수", async () => {
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      status: "IN_PROGRESS",
      asset: { id: "asset-1", status: "REPAIR" },
    });

    await expect(
      maintenanceService.update(
        "mt-1",
        { status: "COMPLETED", cost: 50000, payerType: "USER" },
        adminCtx,
      ),
    ).rejects.toThrow(/지불 사용자/);
  });

  it("종결된 정비는 수정 불가", async () => {
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      status: "COMPLETED",
      asset: { id: "asset-1", status: "IDLE" },
    });
    await expect(
      maintenanceService.update("mt-1", { title: "x" }, adminCtx),
    ).rejects.toThrow(/종결된 정비는 수정할 수 없습니다/);
  });

  it("USER 권한이면 update 불가", async () => {
    await expect(
      maintenanceService.update("mt-1", { status: "IN_PROGRESS" }, userCtx),
    ).rejects.toThrow(/관리자 권한/);
  });
});

// ── getById ──────────────────────────────────────────────────────────────────
describe("maintenanceService.getById", () => {
  it("USER 본인 자산이 아니면 403", async () => {
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      asset: { ...baseAsset, assignedUserId: "other" },
    });
    await expect(maintenanceService.getById("mt-1", userCtx)).rejects.toThrow(
      new AppError(403, "조회 권한이 없습니다."),
    );
  });

  it("USER 본인 자산이면 조회 가능", async () => {
    mockMtFindUnique.mockResolvedValue({
      ...baseMt,
      asset: { ...baseAsset, assignedUserId: "user-1" },
    });
    const result = await maintenanceService.getById("mt-1", userCtx);
    expect(result.id).toBe("mt-1");
  });

  it("존재하지 않는 정비는 404", async () => {
    mockMtFindUnique.mockResolvedValue(null);
    await expect(maintenanceService.getById("mt-x", adminCtx)).rejects.toThrow(
      new AppError(404, "유지보수 건을 찾을 수 없습니다."),
    );
  });
});
