import { prisma } from '../../lib/prisma'
import type { Prisma } from '../../generated/prisma/client'
import { AppError } from '../../lib/AppError'
import { logger } from '../../lib/logger'
import { paginate } from '../../lib/pagination'
import { encryptLicenseKey, decryptLicenseKey, maskLicenseKey } from '../../lib/licenseKey'
import { logSensitiveAction } from '../../lib/sensitiveAuditLog'
import { notificationService } from '../notifications/notification.service'
import type {
  CreateLicenseInput,
  UpdateLicenseInput,
  ListLicensesQuery,
  LicenseListItem,
  LicenseDetail,
  RequesterContext,
  PaginatedResult,
  LicenseRequestItem,
  LicenseRequestStatus,
  CreateLicenseRequestInput,
  RejectLicenseRequestInput,
  ListLicenseRequestsQuery,
} from './license.types'
import { calculateLicenseCoverage } from './license.types'

const requireManager = (requester: RequesterContext) => {
  if (requester.role !== 'ADMIN' && requester.role !== 'TEAM_LEAD') {
    throw new AppError(403, '관리자 권한이 필요합니다.')
  }
}

type PrismaOrTx = typeof prisma | Prisma.TransactionClient

const countActiveSeats = async (licenseId: string, client: PrismaOrTx = prisma): Promise<number> => {
  const [assignments, pendingRequests] = await Promise.all([
    client.licenseAssignment.count({ where: { licenseId, unassignedAt: null } }),
    client.licenseRequest.count({
      where: {
        licenseId,
        status: { in: ['PENDING_MANAGER', 'PENDING_DEPT', 'PENDING_SECURITY', 'PENDING_ADMIN'] },
      },
    }),
  ])
  return assignments + pendingRequests
}

// license row를 SELECT ... FOR UPDATE로 잠가 동시 요청이 같은(오래된) 시트 수를
// 보고 나란히 통과하는 걸 막는다 — 트랜잭션이 끝날 때까지 같은 라이선스를 대상으로
// 하는 다른 트랜잭션은 이 row를 읽지 못하고 대기한다.
const lockLicenseForUpdate = async (tx: Prisma.TransactionClient, licenseId: string): Promise<void> => {
  await tx.$queryRaw`SELECT id FROM licenses WHERE id = ${licenseId} FOR UPDATE`
}

const list = async (
  query: ListLicensesQuery,
  requester: RequesterContext,
): Promise<PaginatedResult<LicenseListItem>> => {
  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const skip = (page - 1) * pageSize

  const where: Record<string, unknown> = {}
  if (query.vendorId) where['vendorId'] = query.vendorId
  if (query.q) where['name'] = { contains: query.q, mode: 'insensitive' }
  // USER 는 본인이 할당받은 라이선스만 조회
  if (requester.role === 'USER') {
    where['assignments'] = { some: { userId: requester.id, unassignedAt: null } }
  }

  const [rows, total] = await Promise.all([
    prisma.license.findMany({
      where,
      include: {
        vendor: { select: { name: true } },
        _count: { select: { assignments: { where: { unassignedAt: null } } } },
      },
      orderBy: [{ expiryDate: 'asc' }, { createdAt: 'desc' }],
      skip,
      take: pageSize,
    }),
    prisma.license.count({ where }),
  ])

  return paginate(
    rows.map((r) => ({
      id: r.id,
      name: r.name,
      vendorName: r.vendor?.name ?? null,
      seatsTotal: r.seatsTotal,
      seatsUsed: r._count.assignments,
      coverage: calculateLicenseCoverage(r._count.assignments, r.seatsTotal, r.expiryDate),
      expiryDate: r.expiryDate,
      purchaseDate: r.purchaseDate,
      cost: r.cost ? Number(r.cost) : null,
      currency: r.currency,
      productKeyMask: r.productKeyMask,
      createdAt: r.createdAt,
    })),
    total,
    page,
    pageSize,
  )
}

const getById = async (id: string, requester: RequesterContext): Promise<LicenseDetail> => {
  const row = await prisma.license.findUnique({
    where: { id },
    include: {
      vendor: { select: { id: true, name: true } },
      assignments: {
        where: { unassignedAt: null },
        include: {
          user: { select: { id: true, name: true, email: true } },
          asset: { select: { id: true, assetCode: true, name: true } },
        },
        orderBy: { assignedAt: 'desc' },
      },
      softwareLinks: {
        include: { software: { select: { id: true, name: true } } },
        orderBy: { matchedAt: 'asc' },
      },
    },
  })
  if (!row) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  // USER 는 본인이 할당된 경우만 조회 가능
  if (requester.role === 'USER') {
    const isAssigned = row.assignments.some((a) => a.userId === requester.id)
    if (!isAssigned) throw new AppError(403, '조회 권한이 없습니다.')
  }

  // productKey 평문은 ADMIN만 reveal (MANAGER/USER 는 마스킹만)
  let productKey: string | null = null
  if (requester.role === 'ADMIN' && row.productKey) {
    productKey = decryptLicenseKey(row.productKey)
    logSensitiveAction({
      action: 'LICENSE_KEY_ACCESS',
      performedById: requester.id,
      performedByRole: requester.role,
      targetId: row.id,
      targetType: 'License',
      detail: `라이선스: ${row.name}`,
      timestamp: new Date().toISOString(),
    })
  }

  return {
    id: row.id,
    name: row.name,
    vendorId: row.vendor?.id ?? null,
    vendorName: row.vendor?.name ?? null,
    seatsTotal: row.seatsTotal,
    seatsUsed: row.assignments.length,
    coverage: calculateLicenseCoverage(row.assignments.length, row.seatsTotal, row.expiryDate),
    purchaseDate: row.purchaseDate,
    expiryDate: row.expiryDate,
    cost: row.cost ? Number(row.cost) : null,
    currency: row.currency,
    productKey,
    productKeyMask: row.productKeyMask,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    assignments: row.assignments.map((a) => ({
      id: a.id,
      userId: a.userId,
      userName: a.user.name,
      userEmail: a.user.email,
      assetId: a.asset?.id ?? null,
      assetCode: a.asset?.assetCode ?? null,
      assetName: a.asset?.name ?? null,
      assignedAt: a.assignedAt,
      unassignedAt: a.unassignedAt,
    })),
    softwares: row.softwareLinks.map((sl) => ({
      id: sl.id,
      softwareId: sl.softwareId,
      softwareName: sl.software.name,
    })),
  }
}

const create = async (
  input: CreateLicenseInput,
  requester: RequesterContext,
): Promise<LicenseDetail> => {
  requireManager(requester)

  if (input.softwareIds?.length) {
    const found = await prisma.software.findMany({
      where: { id: { in: input.softwareIds } },
      select: { id: true },
    })
    if (found.length !== input.softwareIds.length) {
      throw new AppError(400, '존재하지 않는 소프트웨어 ID가 포함되어 있습니다.')
    }
  }

  const created = await prisma.$transaction(async (tx) => {
    const license = await tx.license.create({
      data: {
        name: input.name,
        productKey: input.productKey ? encryptLicenseKey(input.productKey) : null,
        productKeyMask: input.productKey ? maskLicenseKey(input.productKey) : null,
        vendorId: input.vendorId ?? null,
        seatsTotal: input.seatsTotal,
        purchaseDate: input.purchaseDate,
        expiryDate: input.expiryDate ?? null,
        cost: input.cost ?? null,
        currency: input.currency ?? 'KRW',
      },
    })
    if (input.softwareIds?.length) {
      await tx.softwareLicenseLink.createMany({
        data: input.softwareIds.map((softwareId) => ({
          softwareId,
          licenseId: license.id,
          matchedById: requester.id,
        })),
      })
    }
    return license
  })

  logger.info({ event: 'license_created', id: created.id, name: created.name }, '라이선스 등록')
  return getById(created.id, requester)
}

const update = async (
  id: string,
  input: UpdateLicenseInput,
  requester: RequesterContext,
): Promise<LicenseDetail> => {
  requireManager(requester)
  const current = await prisma.license.findUnique({ where: { id } })
  if (!current) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  // seatsTotal 줄일 때는 활성 할당 수 이상이어야 함
  if (input.seatsTotal !== undefined) {
    const active = await countActiveSeats(id)
    if (input.seatsTotal < active) {
      throw new AppError(400, `현재 할당된 시트(${active})보다 작은 값으로 줄일 수 없습니다.`)
    }
  }

  // purchaseDate 또는 expiryDate 한쪽만 변경될 때 기존 값과 조합해서 만료일 >= 구매일 보장
  if (input.purchaseDate !== undefined || input.expiryDate !== undefined) {
    const effPurchase = input.purchaseDate ?? current.purchaseDate.toISOString()
    const effExpiry =
      input.expiryDate === undefined
        ? (current.expiryDate?.toISOString() ?? null)
        : input.expiryDate
    if (effExpiry !== null && effExpiry < effPurchase) {
      throw new AppError(400, '만료일은 구매일 이전일 수 없습니다.')
    }
  }

  const data: Record<string, unknown> = {}
  if (input.name !== undefined) data['name'] = input.name
  if (input.vendorId !== undefined) data['vendorId'] = input.vendorId
  if (input.seatsTotal !== undefined) data['seatsTotal'] = input.seatsTotal
  if (input.purchaseDate !== undefined) data['purchaseDate'] = input.purchaseDate
  if (input.expiryDate !== undefined) data['expiryDate'] = input.expiryDate
  if (input.cost !== undefined) data['cost'] = input.cost
  if (input.currency !== undefined) data['currency'] = input.currency
  if (input.productKey !== undefined) {
    data['productKey'] = input.productKey ? encryptLicenseKey(input.productKey) : null
    data['productKeyMask'] = input.productKey ? maskLicenseKey(input.productKey) : null
  }

  await prisma.license.update({ where: { id }, data })
  return getById(id, requester)
}

const remove = async (id: string, requester: RequesterContext): Promise<void> => {
  requireManager(requester)
  const active = await countActiveSeats(id)
  if (active > 0) {
    throw new AppError(400, `활성 할당이 ${active}건 있어 삭제할 수 없습니다. 먼저 회수하세요.`)
  }
  await prisma.license.delete({ where: { id } })
  logger.info({ event: 'license_deleted', id }, '라이선스 삭제')
}

const getRequestById = async (id: string): Promise<LicenseRequestItem> => {
  const row = await prisma.licenseRequest.findUnique({
    where: { id },
    include: {
      license: { select: { name: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true } },
      asset: { select: { assetCode: true } },
      managerApprovedBy: { select: { name: true } },
      deptApprovedBy: { select: { name: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
  })
  if (!row) throw new AppError(404, '요청을 찾을 수 없습니다.')
  return {
    id: row.id,
    licenseId: row.licenseId,
    licenseName: row.license.name,
    requestedById: row.requestedById,
    requestedByName: row.requestedBy.name,
    targetUserId: row.targetUserId,
    targetUserName: row.targetUser.name,
    assetId: row.assetId,
    assetCode: row.asset?.assetCode ?? null,
    status: row.status as LicenseRequestStatus,
    managerApprovedById: row.managerApprovedById,
    managerApprovedByName: row.managerApprovedBy?.name ?? null,
    managerApprovedAt: row.managerApprovedAt,
    deptApprovedById: row.deptApprovedById,
    deptApprovedByName: row.deptApprovedBy?.name ?? null,
    deptApprovedAt: row.deptApprovedAt,
    securityReviewedById: row.securityReviewedById,
    securityReviewedByName: row.securityReviewedBy?.name ?? null,
    securityReviewedAt: row.securityReviewedAt,
    adminApprovedById: row.adminApprovedById,
    adminApprovedByName: row.adminApprovedBy?.name ?? null,
    adminApprovedAt: row.adminApprovedAt,
    rejectedById: row.rejectedById,
    rejectedByName: row.rejectedBy?.name ?? null,
    rejectedAt: row.rejectedAt,
    rejectReason: row.rejectReason,
    createdAt: row.createdAt,
  }
}

const request = async (
  licenseId: string,
  input: CreateLicenseRequestInput,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  const active = await countActiveSeats(licenseId)
  if (active >= license.seatsTotal) {
    throw new AppError(400, `잔여 시트가 없습니다. (${active}/${license.seatsTotal})`)
  }

  const [requesterUser, targetUser] = await Promise.all([
    prisma.user.findUnique({
      where: { id: requester.id },
      include: {
        team: {
          include: {
            department: { include: { leader: { select: { id: true, isOutOfOffice: true } } } },
          },
        },
      },
    }),
    prisma.user.findUnique({ where: { id: input.targetUserId } }),
  ])
  if (!targetUser) throw new AppError(404, '사용자를 찾을 수 없습니다.')

  const existingAssignment = await prisma.licenseAssignment.findFirst({
    where: { licenseId, userId: input.targetUserId, unassignedAt: null },
  })
  if (existingAssignment) throw new AppError(400, '이미 할당된 사용자입니다.')

  const existingRequest = await prisma.licenseRequest.findFirst({
    where: {
      licenseId,
      targetUserId: input.targetUserId,
      status: { in: ['PENDING_MANAGER', 'PENDING_DEPT', 'PENDING_SECURITY', 'PENDING_ADMIN'] },
    },
  })
  if (existingRequest) throw new AppError(400, '이미 진행 중인 요청이 있습니다.')

  // 초기 상태 결정 (스킵 조건 평가)
  const teamId = requesterUser?.teamId ?? null
  const teamLeadId = requesterUser?.team?.teamLeadId ?? null
  const skipManager = !teamId || !teamLeadId || requester.id === teamLeadId

  let initialStatus: 'PENDING_MANAGER' | 'PENDING_DEPT' | 'PENDING_SECURITY'
  if (skipManager) {
    const department = requesterUser?.team?.department
    const deptLeaderId = department?.leaderId ?? null
    const deptLeaderOOO = department?.leader?.isOutOfOffice ?? false
    const skipDept = !deptLeaderId || deptLeaderOOO || requester.id === deptLeaderId
    initialStatus = skipDept ? 'PENDING_SECURITY' : 'PENDING_DEPT'
  } else {
    initialStatus = 'PENDING_MANAGER'
  }

  // 원자적 재확인 + 생성 — license row를 잠근 채로 다시 센 뒤 생성해야, 동시 요청들이
  // 똑같은(오래된) 시트 수를 보고 나란히 통과해버리는 걸 막을 수 있음 (위 사전 체크는
  // 빠른 실패용일 뿐 — 진짜 방어선은 여기)
  const created = await prisma.$transaction(async (tx) => {
    await lockLicenseForUpdate(tx, licenseId)
    const activeInTx = await countActiveSeats(licenseId, tx)
    if (activeInTx >= license.seatsTotal) {
      throw new AppError(409, `잔여 시트가 없습니다. (${activeInTx}/${license.seatsTotal})`)
    }
    return tx.licenseRequest.create({
      data: {
        licenseId,
        requestedById: requester.id,
        targetUserId: input.targetUserId,
        assetId: input.assetId ?? null,
        status: initialStatus,
      },
    })
  })
  logger.info(
    { event: 'license_request_created', licenseId, requestId: created.id, requestedById: requester.id, targetUserId: input.targetUserId, initialStatus },
    '라이선스 할당 요청 생성',
  )

  const requestedByName = requesterUser?.name ?? requester.id
  // 요청 자체는 이미 생성됨 — 다음 승인자에게 보내는 알림 실패로 응답 전체를 500으로 만들지 않음
  try {
    if (initialStatus === 'PENDING_MANAGER') {
      await notificationService.createLicensePendingManagerNotification({
        requestId: created.id,
        licenseId,
        licenseName: license.name,
        requestedByName,
        teamLeadId: teamLeadId!,
      })
    } else if (initialStatus === 'PENDING_DEPT') {
      const deptLeaderId = requesterUser?.team?.department?.leaderId!
      await notificationService.createLicensePendingDeptNotification({
        requestId: created.id,
        licenseId,
        licenseName: license.name,
        deptLeaderId,
      })
    } else {
      await notificationService.createLicensePendingSecurityNotification({
        requestId: created.id,
        licenseId,
        licenseName: license.name,
        requestedByName,
      })
    }
  } catch (err) {
    logger.warn({ event: 'license_request_notify_failed', requestId: created.id, err }, '라이선스 요청 알림 발송 실패')
  }

  return getRequestById(created.id)
}

const approveManager = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  const req = await prisma.licenseRequest.findUnique({
    where: { id: requestId },
    include: {
      requestedBy: {
        include: {
          team: {
            include: {
              department: { include: { leader: { select: { id: true, isOutOfOffice: true } } } },
            },
          },
        },
      },
    },
  })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_MANAGER') throw new AppError(400, 'PENDING_MANAGER 상태가 아닙니다.')

  if (requester.role !== 'ADMIN') {
    const approverUser = await prisma.user.findUnique({
      where: { id: requester.id },
      include: { ledTeams: { select: { id: true } } },
    })
    const managedTeamIds = approverUser?.ledTeams.map((t) => t.id) ?? []
    if (!req.requestedBy.teamId || !managedTeamIds.includes(req.requestedBy.teamId)) {
      throw new AppError(403, '해당 요청자의 팀장이 아닙니다.')
    }
  }

  const department = req.requestedBy.team?.department
  const deptLeaderId = department?.leaderId ?? null
  const deptLeaderOOO = department?.leader?.isOutOfOffice ?? false
  const skipDept =
    !deptLeaderId || deptLeaderOOO || req.requestedBy.id === deptLeaderId
  const nextStatus = skipDept ? ('PENDING_SECURITY' as const) : ('PENDING_DEPT' as const)

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: { status: nextStatus, managerApprovedById: requester.id, managerApprovedAt: new Date() },
  })

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (nextStatus === 'PENDING_DEPT') {
    await notificationService.createLicensePendingDeptNotification({
      requestId,
      licenseId,
      licenseName: license?.name ?? '',
      deptLeaderId: deptLeaderId!,
    })
  } else {
    await notificationService.createLicensePendingSecurityNotification({
      requestId,
      licenseId,
      licenseName: license?.name ?? '',
    })
  }

  return getRequestById(requestId)
}

const approveDept = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  const req = await prisma.licenseRequest.findUnique({
    where: { id: requestId },
    include: {
      requestedBy: { include: { team: { include: { department: true } } } },
    },
  })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_DEPT') throw new AppError(400, 'PENDING_DEPT 상태가 아닙니다.')

  if (requester.role !== 'ADMIN') {
    const department = req.requestedBy.team?.department
    if (!department || department.leaderId !== requester.id) {
      throw new AppError(403, '해당 요청자의 부서장이 아닙니다.')
    }
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: { status: 'PENDING_SECURITY', deptApprovedById: requester.id, deptApprovedAt: new Date() },
  })

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  await notificationService.createLicensePendingSecurityNotification({
    requestId,
    licenseId,
    licenseName: license?.name ?? '',
  })

  return getRequestById(requestId)
}

const approveSecurity = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  if (requester.role !== 'SECURITY_OFFICER' && requester.role !== 'ADMIN') {
    throw new AppError(403, '보안 검토 권한이 없습니다. (SECURITY_OFFICER 또는 ADMIN)')
  }

  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_SECURITY') {
    throw new AppError(400, 'PENDING_SECURITY 상태가 아닙니다.')
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'PENDING_ADMIN',
      securityReviewedById: requester.id,
      securityReviewedAt: new Date(),
    },
  })

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  await notificationService.createLicensePendingAdminNotification({
    requestId,
    licenseId,
    licenseName: license?.name ?? '',
  })

  return getRequestById(requestId)
}

const approveAdmin = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, 'ADMIN 권한이 필요합니다.')
  }

  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status !== 'PENDING_ADMIN') {
    throw new AppError(400, 'PENDING_ADMIN 상태가 아닙니다.')
  }

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) throw new AppError(404, '라이선스를 찾을 수 없습니다.')

  // race condition 방어: license row를 잠근 채로 최종 승인 시점에 시트를 재확인하고,
  // 그 안에서 승인 확정 + 할당 생성까지 원자적으로 처리 — 동시에 여러 PENDING_ADMIN
  // 요청이 승인되면서 seatsTotal을 넘기는 걸 막는 진짜 최종 방어선.
  // 이 요청 자체는 PENDING_ADMIN → countActiveSeats 에 포함되어 있으므로 seatsTotal 초과 기준은 >
  await prisma.$transaction(async (tx) => {
    await lockLicenseForUpdate(tx, licenseId)
    const activeInTx = await countActiveSeats(licenseId, tx)
    if (activeInTx > license.seatsTotal) {
      throw new AppError(409, `시트가 부족합니다. 현재 잠금 수(${activeInTx}) > 총 시트(${license.seatsTotal})`)
    }

    await tx.licenseRequest.update({
      where: { id: requestId },
      data: {
        status: 'APPROVED',
        adminApprovedById: requester.id,
        adminApprovedAt: new Date(),
      },
    })

    await tx.licenseAssignment.create({
      data: {
        licenseId,
        userId: req.targetUserId,
        assetId: req.assetId ?? null,
      },
    })
  })

  await notificationService.createLicenseApprovedNotification({
    requestId,
    licenseId,
    licenseName: license.name,
    requestedById: req.requestedById,
  })

  return getRequestById(requestId)
}

const reject = async (
  licenseId: string,
  requestId: string,
  input: RejectLicenseRequestInput,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  const req = await prisma.licenseRequest.findUnique({
    where: { id: requestId },
    include: {
      requestedBy: { include: { team: { include: { department: true } } } },
    },
  })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status === 'APPROVED' || req.status === 'REJECTED') {
    throw new AppError(400, '이미 처리된 요청입니다.')
  }

  const isAdmin = requester.role === 'ADMIN'
  if (req.status === 'PENDING_MANAGER') {
    if (!isAdmin && req.requestedBy.team?.teamLeadId !== requester.id) {
      throw new AppError(403, '반려 권한이 없습니다.')
    }
  } else if (req.status === 'PENDING_DEPT') {
    if (!isAdmin && req.requestedBy.team?.department?.leaderId !== requester.id) {
      throw new AppError(403, '반려 권한이 없습니다.')
    }
  } else if (req.status === 'PENDING_SECURITY') {
    if (!isAdmin && requester.role !== 'SECURITY_OFFICER') {
      throw new AppError(403, '반려 권한이 없습니다. (SECURITY_OFFICER 또는 ADMIN)')
    }
  } else {
    // PENDING_ADMIN
    if (!isAdmin) throw new AppError(403, '반려 권한이 없습니다. (ADMIN)')
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'REJECTED',
      rejectedById: requester.id,
      rejectedAt: new Date(),
      rejectReason: input.reason ?? null,
    },
  })

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  await notificationService.createLicenseRejectedNotification({
    requestId,
    licenseId,
    licenseName: license?.name ?? '',
    requestedById: req.requestedById,
    rejectReason: input.reason ?? null,
  })

  return getRequestById(requestId)
}

const cancel = async (
  licenseId: string,
  requestId: string,
  requester: RequesterContext,
): Promise<LicenseRequestItem> => {
  const req = await prisma.licenseRequest.findUnique({ where: { id: requestId } })
  if (!req || req.licenseId !== licenseId) throw new AppError(404, '요청을 찾을 수 없습니다.')
  if (req.status === 'APPROVED' || req.status === 'REJECTED') {
    throw new AppError(400, '이미 처리된 요청입니다.')
  }
  if (req.requestedById !== requester.id && requester.role !== 'ADMIN') {
    throw new AppError(403, '취소 권한이 없습니다. (요청자 본인 또는 ADMIN)')
  }

  await prisma.licenseRequest.update({
    where: { id: requestId },
    data: {
      status: 'REJECTED',
      rejectedById: requester.id,
      rejectedAt: new Date(),
      rejectReason: '요청자 취소',
    },
  })

  return getRequestById(requestId)
}

const listRequests = async (
  licenseId: string,
  query: ListLicenseRequestsQuery,
  requester: RequesterContext,
): Promise<LicenseRequestItem[]> => {
  if (requester.role === 'USER') throw new AppError(403, '조회 권한이 없습니다.')

  const rows = await prisma.licenseRequest.findMany({
    where: {
      licenseId,
      ...(query.status ? { status: query.status } : {}),
    },
    include: {
      license: { select: { name: true } },
      requestedBy: { select: { name: true } },
      targetUser: { select: { name: true } },
      asset: { select: { assetCode: true } },
      managerApprovedBy: { select: { name: true } },
      deptApprovedBy: { select: { name: true } },
      securityReviewedBy: { select: { name: true } },
      adminApprovedBy: { select: { name: true } },
      rejectedBy: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return rows.map((row) => ({
    id: row.id,
    licenseId: row.licenseId,
    licenseName: row.license.name,
    requestedById: row.requestedById,
    requestedByName: row.requestedBy.name,
    targetUserId: row.targetUserId,
    targetUserName: row.targetUser.name,
    assetId: row.assetId,
    assetCode: row.asset?.assetCode ?? null,
    status: row.status as LicenseRequestStatus,
    managerApprovedById: row.managerApprovedById,
    managerApprovedByName: row.managerApprovedBy?.name ?? null,
    managerApprovedAt: row.managerApprovedAt,
    deptApprovedById: row.deptApprovedById,
    deptApprovedByName: row.deptApprovedBy?.name ?? null,
    deptApprovedAt: row.deptApprovedAt,
    securityReviewedById: row.securityReviewedById,
    securityReviewedByName: row.securityReviewedBy?.name ?? null,
    securityReviewedAt: row.securityReviewedAt,
    adminApprovedById: row.adminApprovedById,
    adminApprovedByName: row.adminApprovedBy?.name ?? null,
    adminApprovedAt: row.adminApprovedAt,
    rejectedById: row.rejectedById,
    rejectedByName: row.rejectedBy?.name ?? null,
    rejectedAt: row.rejectedAt,
    rejectReason: row.rejectReason,
    createdAt: row.createdAt,
  }))
}

const unassign = async (
  licenseId: string,
  assignmentId: string,
  requester: RequesterContext,
): Promise<LicenseDetail> => {
  requireManager(requester)
  const assignment = await prisma.licenseAssignment.findUnique({ where: { id: assignmentId } })
  if (!assignment || assignment.licenseId !== licenseId) {
    throw new AppError(404, '할당을 찾을 수 없습니다.')
  }
  if (assignment.unassignedAt) throw new AppError(400, '이미 회수된 할당입니다.')

  await prisma.licenseAssignment.update({
    where: { id: assignmentId },
    data: { unassignedAt: new Date() },
  })
  logger.info({ event: 'license_unassigned', licenseId, assignmentId }, '라이선스 회수')
  return getById(licenseId, requester)
}

export const licenseService = {
  list, getById, create, update, remove,
  unassign,
  request, approveManager, approveDept, approveSecurity, approveAdmin, reject, cancel, listRequests,
}
