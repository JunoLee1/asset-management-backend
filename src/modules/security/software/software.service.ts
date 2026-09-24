// ADR 0002 — Software (Shadow IT 인벤토리) service
//
// 핵심 책임:
//   - list / getById: 카탈로그 조회 (instance 집계로 userCount/lastUsedAt 계산)
//   - update: 기본정보 (name·vendor·type·category·description·licenseCoverage)
//   - updatePermission: 허가유무 변경 — 별 라우트, AuditLog 자동 (PERMISSION_GRANT/REVOKE/REVIEW)
//   - remove: 카탈로그 삭제 (instance + override + linkRel CASCADE)
//   - ingest: endpoint agent push — upsert Software+Instance+Device, AuditLog SOFTWARE_DISCOVERED
//
// ADR 0002 결정 4 (AND 규칙) 는 list 에서 base 상태만 노출 (override 합산 = detail 또는 별 API).
// 가정 4: 자동 License 매칭 없음. SoftwareLicenseLink 는 ASSET_MANAGER 가 수동.

import {
  AuditAction,
  SoftwarePermissionStatus,
  SoftwareType,
} from '../../../generated/prisma/enums'
import type * as Prisma from '../../../generated/prisma/internal/prismaNamespace'
import { prisma } from '../../../lib/prisma'
import { AppError } from '../../../lib/AppError'
import { logAudit } from '../audit/audit.service'
import type { RequesterContext } from '../../../lib/requestHelpers'
import { notificationService } from '../../notifications/notification.service'
import type {
  SoftwareListItem,
  SoftwareDetail,
  ListSoftwareQuery,
  UpdateSoftwareInput,
  CreateSoftwareInput,
  UpdatePermissionInput,
  IngestPayload,
  IngestResult,
  ListBlockEventsResult,
} from './software.types'

// 권한 가드 — 메뉴 노출 가드와 별도. service 진입 시 강제.
const requireSoftwareReader = (requester: RequesterContext) => {
  const allowed: Array<typeof requester.role> = [
    'ADMIN',
    'TEAM_LEAD',
    'ASSET_MANAGER',
    'SECURITY_OFFICER',
  ]
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'Software 인벤토리 접근 권한이 없습니다.')
  }
}

// 카테고리/타입/기본정보 수정 권한 = ASSET_MANAGER 이상
const requireSoftwareEditor = (requester: RequesterContext) => {
  const allowed: Array<typeof requester.role> = ['ADMIN', 'ASSET_MANAGER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'Software 정보 수정 권한이 없습니다.')
  }
}

// 허가유무 변경 권한 = SECURITY_OFFICER (또는 ADMIN 대행) — ADR 0002 결정 2
const requirePermissionDecider = (requester: RequesterContext) => {
  const allowed: Array<typeof requester.role> = ['ADMIN', 'SECURITY_OFFICER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, '허가유무 변경 권한이 없습니다 (SECURITY_OFFICER 또는 ADMIN).')
  }
}

// 카탈로그 수동 등록 권한 — 사용자 결정 (2026-06-18): SECURITY_OFFICER 포함
const requireSoftwareCreator = (requester: RequesterContext) => {
  const allowed: Array<typeof requester.role> = ['ADMIN', 'ASSET_MANAGER', 'SECURITY_OFFICER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'Software 카탈로그 등록 권한이 없습니다.')
  }
}

// list — 모든 Software + base permission + instance 집계
const list = async (
  query: ListSoftwareQuery,
  requester: RequesterContext,
): Promise<SoftwareListItem[]> => {
  requireSoftwareReader(requester)

  const where: Prisma.SoftwareWhereInput = {}
  if (query.type) where.type = query.type
  if (query.q) {
    where.OR = [
      { name: { contains: query.q, mode: 'insensitive' } },
      { vendor: { contains: query.q, mode: 'insensitive' } },
      { category: { contains: query.q, mode: 'insensitive' } },
    ]
  }
  if (query.permissionStatus) {
    where.basePermission = { status: query.permissionStatus }
  }
  if (query.licenseCoverage !== undefined) {
    where.licenseCoverage = query.licenseCoverage
  }

  const rows = await prisma.software.findMany({
    where,
    include: {
      basePermission: true,
      instances: {
        select: { userId: true, executedOs: true, firstDiscoveredAt: true, lastUsedAt: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  // 모든 software의 라이선스 할당 사용자를 한 번에 조회 (N+1 방지)
  const softwareIds = rows.map((r) => r.id)
  const licenseUsers = await prisma.softwareLicenseLink.findMany({
    where: { softwareId: { in: softwareIds } },
    include: {
      license: {
        include: {
          assignments: { select: { userId: true } },
        },
      },
    },
  })

  // softwareId 별로 사용자 매핑
  const licenseUsersBySwId = new Map<string, Set<string>>()
  for (const link of licenseUsers) {
    if (!licenseUsersBySwId.has(link.softwareId)) {
      licenseUsersBySwId.set(link.softwareId, new Set<string>())
    }
    for (const assignment of link.license.assignments) {
      if (assignment.userId) {
        licenseUsersBySwId.get(link.softwareId)?.add(assignment.userId)
      }
    }
  }

  return rows.map((sw) => {
    // instances의 userId (실제 사용 데이터)
    const instanceUserIds: string[] = []
    for (const i of sw.instances) {
      if (i.userId) {
        instanceUserIds.push(i.userId)
      }
    }

    // license 할당 사용자와 병합
    const userIds = new Set(instanceUserIds)
    const licenseUserIds = licenseUsersBySwId.get(sw.id)
    if (licenseUserIds) {
      licenseUserIds.forEach((uid) => userIds.add(uid))
    }

    const oses = sw.instances.map((i) => i.executedOs)
    const firsts = sw.instances.map((i) => i.firstDiscoveredAt.getTime())
    const lasts = sw.instances.map((i) => i.lastUsedAt.getTime())

    return {
      id: sw.id,
      name: sw.name,
      vendor: sw.vendor,
      type: sw.type,
      category: sw.category,
      executedOs: oses[0] ?? null,
      userCount: userIds.size,
      firstDiscoveredAt: firsts.length > 0 ? new Date(Math.min(...firsts)) : null,
      lastUsedAt: lasts.length > 0 ? new Date(Math.max(...lasts)) : null,
      permissionStatus: sw.basePermission?.status ?? SoftwarePermissionStatus.UNCLASSIFIED,
      licenseCoverage: sw.licenseCoverage,
    }
  })
}

const getById = async (id: string, requester: RequesterContext): Promise<SoftwareDetail> => {
  requireSoftwareReader(requester)

  const sw = await prisma.software.findUnique({
    where: { id },
    include: {
      basePermission: true,
      instances: {
        select: { userId: true, executedOs: true, firstDiscoveredAt: true, lastUsedAt: true },
      },
      licenseLinks: {
        include: {
          license: {
            include: {
              assignments: {
                select: { userId: true },
              },
            },
          },
        },
      },
    },
  })
  if (!sw) throw new AppError(404, 'Software 를 찾을 수 없습니다.')

  // instances의 userId (실제 사용 데이터)
  const instanceUserIds: string[] = []
  for (const i of sw.instances) {
    if (i.userId) {
      instanceUserIds.push(i.userId)
    }
  }

  // license 할당 사용자 병합
  const userIds = new Set(instanceUserIds)
  for (const link of sw.licenseLinks) {
    for (const assignment of link.license.assignments) {
      if (assignment.userId) {
        userIds.add(assignment.userId)
      }
    }
  }

  const oses = sw.instances.map((i) => i.executedOs)
  const firsts = sw.instances.map((i) => i.firstDiscoveredAt.getTime())
  const lasts = sw.instances.map((i) => i.lastUsedAt.getTime())

  return {
    id: sw.id,
    name: sw.name,
    vendor: sw.vendor,
    type: sw.type,
    category: sw.category,
    description: sw.description,
    licenseCoverage: sw.licenseCoverage,
    suggestedJobTypes: sw.suggestedJobTypes,
    executedOs: oses[0] ?? null,
    userCount: userIds.size,
    firstDiscoveredAt: firsts.length > 0 ? new Date(Math.min(...firsts)) : null,
    lastUsedAt: lasts.length > 0 ? new Date(Math.max(...lasts)) : null,
    permissionStatus: sw.basePermission?.status ?? SoftwarePermissionStatus.UNCLASSIFIED,
    createdAt: sw.createdAt,
    updatedAt: sw.updatedAt,
  }
}

// 사용자 결정 (2026-06-18): 기본정보 변경도 AuditLog 남김.
//   action=SOFTWARE_UPDATE / detail={changed:{field:{prev,next}}} / noise=diff 후만 / tx 묶음
const AUDIT_FIELDS = [
  'name',
  'vendor',
  'type',
  'category',
  'description',
  'licenseCoverage',
] as const

type AuditField = (typeof AUDIT_FIELDS)[number]

const update = async (
  id: string,
  input: UpdateSoftwareInput,
  requester: RequesterContext,
): Promise<SoftwareDetail> => {
  requireSoftwareEditor(requester)

  const before = await prisma.software.findUnique({ where: { id } })
  if (!before) throw new AppError(404, 'Software 를 찾을 수 없습니다.')

  // dirty 분야만 detail 에 담음 (옵션 C-🅑 — service layer 에서 diff)
  const changed: Record<string, { prev: unknown; next: unknown }> = {}
  for (const f of AUDIT_FIELDS) {
    const field = f as AuditField
    if (input[field] === undefined) continue
    const prev = before[field]
    const next = input[field]
    if (prev !== next) {
      changed[field] = { prev, next }
    }
  }

  const hasJobTypesUpdate = input.suggestedJobTypes !== undefined

  if (Object.keys(changed).length === 0 && !hasJobTypesUpdate) {
    // 의미 있는 변경 없음 — DB write 도 audit 도 생략
    return getById(id, requester)
  }

  if (Object.keys(changed).length > 0) {
    await prisma.$transaction(async (tx) => {
      await tx.software.update({
        where: { id },
        data: {
          ...Object.fromEntries(Object.entries(changed).map(([k, v]) => [k, v.next])),
          ...(hasJobTypesUpdate ? { suggestedJobTypes: input.suggestedJobTypes } : {}),
        },
      })
      await logAudit({
        action: AuditAction.SOFTWARE_UPDATE,
        targetType: 'Software',
        targetId: id,
        performedById: requester.id,
        performedByRole: requester.role,
        detail: { changed },
        tx,
      })
    })
  } else {
    await prisma.software.update({
      where: { id },
      data: { suggestedJobTypes: input.suggestedJobTypes },
    })
  }

  return getById(id, requester)
}

// updatePermission — ADR 0002 결정 2 (2단계 판정)
//   미분류 → 허가됨/미허가  : SECURITY_OFFICER 가 2차 판정
//   허가됨/미허가 → 다른 상태  : SECURITY_OFFICER 가 재판정
const updatePermission = async (
  id: string,
  input: UpdatePermissionInput,
  requester: RequesterContext,
): Promise<SoftwareDetail> => {
  requirePermissionDecider(requester)

  const sw = await prisma.software.findUnique({
    where: { id },
    include: { basePermission: true },
  })
  if (!sw) throw new AppError(404, 'Software 를 찾을 수 없습니다.')

  const prevStatus = sw.basePermission?.status ?? SoftwarePermissionStatus.UNCLASSIFIED

  // 같은 상태로 변경 시도는 무시 (AuditLog 노이즈 방지)
  if (prevStatus === input.status) {
    return getById(id, requester)
  }

  // AuditLog action 결정 — ADR 0002 결정 3 의 action enum
  const auditAction = ((): AuditAction => {
    if (input.status === SoftwarePermissionStatus.ALLOWED) return AuditAction.PERMISSION_GRANT
    if (input.status === SoftwarePermissionStatus.DISALLOWED) return AuditAction.PERMISSION_REVOKE
    return AuditAction.PERMISSION_REVIEW
  })()

  await prisma.$transaction(async (tx) => {
    await tx.softwarePermission.upsert({
      where: { softwareId: id },
      create: {
        softwareId: id,
        status: input.status,
        prevStatus,
        decidedById: requester.id,
        decidedByRole: requester.role,
        decidedAt: new Date(),
        reason: input.reason,
      },
      update: {
        status: input.status,
        prevStatus,
        decidedById: requester.id,
        decidedByRole: requester.role,
        decidedAt: new Date(),
        reason: input.reason,
      },
    })

    await logAudit({
      action: auditAction,
      targetType: 'Software',
      targetId: id,
      performedById: requester.id,
      performedByRole: requester.role,
      detail: {
        prevStatus,
        nextStatus: input.status,
        reason: input.reason ?? null,
      },
      tx,
    })
  })

  return getById(id, requester)
}

const remove = async (id: string, requester: RequesterContext): Promise<void> => {
  requireSoftwareEditor(requester)
  await prisma.software.delete({ where: { id } })
}

// 수동 카탈로그 등록 — basePermission=UNCLASSIFIED, instance/device 없는 빈 카탈로그
//   dedup: name+vendor 같으면 409 (ingest 의 findFirst 매칭 룰과 일치)
//   audit: SOFTWARE_CREATED, detail={ source:'manual', name, vendor, type, category, licenseCoverage }
const create = async (
  input: CreateSoftwareInput,
  requester: RequesterContext,
): Promise<SoftwareDetail> => {
  requireSoftwareCreator(requester)

  const duplicate = await prisma.software.findFirst({
    where: { name: input.name, vendor: input.vendor ?? null },
    select: { id: true },
  })
  if (duplicate) {
    throw new AppError(409, '같은 이름·제조사의 Software 카탈로그가 이미 있습니다.')
  }

  const created = await prisma.$transaction(async (tx) => {
    const sw = await tx.software.create({
      data: {
        name: input.name,
        vendor: input.vendor ?? null,
        type: input.type ?? SoftwareType.Other,
        category: input.category ?? '기타',
        description: input.description ?? null,
        licenseCoverage: input.licenseCoverage ?? null,
        suggestedJobTypes: input.suggestedJobTypes ?? [],
        basePermission: {
          create: { status: SoftwarePermissionStatus.UNCLASSIFIED },
        },
      },
    })

    await logAudit({
      action: AuditAction.SOFTWARE_CREATED,
      targetType: 'Software',
      targetId: sw.id,
      performedById: requester.id,
      performedByRole: requester.role,
      detail: {
        source: 'manual',
        name: sw.name,
        vendor: sw.vendor,
        type: sw.type,
        category: sw.category,
        licenseCoverage: sw.licenseCoverage,
      },
      tx,
    })

    return sw
  })

  return getById(created.id, requester)
}

// ingest — endpoint agent push
//   가정 3: 신규 SW 분류 = type Other, category 기타, permission UNCLASSIFIED, licenseCoverage null
//   가정 4: 자동 License 매칭 없음
const ingest = async (
  payload: IngestPayload,
  requester: RequesterContext,
): Promise<IngestResult> => {
  // ingest 호출자 = 관리자 또는 SECURITY_OFFICER (가정 1: 기존 JWT)
  requireSoftwareReader(requester)

  let newSoftwareCount = 0
  let newInstanceCount = 0
  let updatedInstanceCount = 0

  const result = await prisma.$transaction(async (tx) => {
    // Device upsert (hostname unique)
    const device = await tx.device.upsert({
      where: { hostname: payload.hostname },
      create: {
        hostname: payload.hostname,
        userId: payload.userId ?? null,
        lastSeenAt: new Date(),
      },
      update: {
        userId: payload.userId ?? null,
        lastSeenAt: new Date(),
      },
    })

    for (const item of payload.items) {
      // Software 카탈로그 — (name) 매칭. 이름이 같으면 같은 SW 로 본다.
      let software = await tx.software.findFirst({
        where: { name: item.name, vendor: item.vendor ?? null },
      })

      let isNewSoftware = false
      if (!software) {
        software = await tx.software.create({
          data: {
            name: item.name,
            vendor: item.vendor ?? null,
            type: SoftwareType.Other, // 가정 3
            category: '기타', // 가정 3
            licenseCoverage: null, // 가정 3
            basePermission: {
              create: { status: SoftwarePermissionStatus.UNCLASSIFIED },
            },
          },
        })
        isNewSoftware = true
        newSoftwareCount += 1
      }

      // Instance upsert (softwareId × deviceId unique)
      const existing = await tx.softwareInstance.findUnique({
        where: { softwareId_deviceId: { softwareId: software.id, deviceId: device.id } },
      })

      const lastUsedAt = item.lastUsedAt ? new Date(item.lastUsedAt) : new Date()
      const firstSeenAt = item.firstSeenAt ? new Date(item.firstSeenAt) : new Date()

      if (existing) {
        await tx.softwareInstance.update({
          where: { id: existing.id },
          data: { lastUsedAt, executedOs: item.executedOs },
        })
        updatedInstanceCount += 1
      } else {
        await tx.softwareInstance.create({
          data: {
            softwareId: software.id,
            deviceId: device.id,
            userId: payload.userId ?? null,
            executedOs: item.executedOs,
            firstDiscoveredAt: firstSeenAt,
            lastUsedAt,
          },
        })
        newInstanceCount += 1
      }

      // raw usage event 1 row (durationSec 있으면 적재)
      if (item.durationSec !== undefined) {
        const inst = await tx.softwareInstance.findUnique({
          where: { softwareId_deviceId: { softwareId: software.id, deviceId: device.id } },
          select: { id: true },
        })
        if (inst) {
          await tx.softwareUsageEvent.create({
            data: {
              instanceId: inst.id,
              occurredAt: lastUsedAt,
              durationSec: item.durationSec,
            },
          })
        }
      }

      // AuditLog — 신규 카탈로그 발견만 기록 (Stage 0)
      if (isNewSoftware) {
        await logAudit({
          action: AuditAction.SOFTWARE_DISCOVERED,
          targetType: 'Software',
          targetId: software.id,
          performedById: requester.id,
          performedByRole: requester.role,
          detail: {
            name: item.name,
            vendor: item.vendor ?? null,
            executedOs: item.executedOs,
            hostname: payload.hostname,
            discoveredUserId: payload.userId ?? null,
          },
          tx,
        })

        // SECURITY_OFFICER 전원에게 분류 검토 요청 알림 (tx 밖에서 best-effort)
        const securityOfficers = await prisma.user.findMany({
          where: { role: 'SECURITY_OFFICER', isActive: true },
          select: { id: true },
        })
        const notifBody = `${item.name}${item.vendor ? ` (${item.vendor})` : ''} 소프트웨어가 ${payload.hostname}에서 새로 발견되었습니다. 허가 여부를 분류해주세요.`
        const notifMeta = { softwareId: software.id, name: item.name, vendor: item.vendor ?? null, hostname: payload.hostname, source: 'software_discovery' }
        for (const officer of securityOfficers) {
          await notificationService.createInApp({
            type: 'COMPLIANCE_URGENT',
            title: '미분류 소프트웨어 발견 — 검토 필요',
            body: notifBody,
            metadata: notifMeta,
            recipientId: officer.id,
          })
        }
      }

      // ADR 0010 — DISALLOWED 앱 감지 알림
      // 신규 SW 는 UNCLASSIFIED 로 생성되므로 !isNewSoftware 만 체크
      // (userId, softwareId) 첫 감지 1회만 — DisallowedDetection dedup
      if (!isNewSoftware && payload.userId) {
        const permission = await tx.softwarePermission.findUnique({
          where: { softwareId: software.id },
          select: { status: true },
        })
        if (permission?.status === SoftwarePermissionStatus.DISALLOWED) {
          const alreadyDetected = await prisma.disallowedDetection.findUnique({
            where: { userId_softwareId: { userId: payload.userId, softwareId: software.id } },
          })
          if (!alreadyDetected) {
            await prisma.disallowedDetection.create({
              data: { userId: payload.userId, softwareId: software.id },
            })
            const swLabel = `${item.name}${item.vendor ? ` (${item.vendor})` : ''}`
            const [targetUser, officers] = await Promise.all([
              prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, name: true } }),
              prisma.user.findMany({ where: { role: 'SECURITY_OFFICER', isActive: true }, select: { id: true } }),
            ])
            const detectionMeta = { softwareId: software.id, name: item.name, vendor: item.vendor ?? null, hostname: payload.hostname, source: 'disallowed_detection' }
            if (targetUser) {
              await notificationService.createInApp({
                type: 'DISALLOWED_APP_DETECTED',
                title: '비허가 소프트웨어 실행 감지',
                body: `${swLabel}은(는) 허가되지 않은 소프트웨어입니다. 즉시 삭제해주세요.`,
                metadata: detectionMeta,
                recipientId: targetUser.id,
              })
            }
            for (const officer of officers) {
              await notificationService.createInApp({
                type: 'DISALLOWED_APP_DETECTED',
                title: '비허가 앱 감지',
                body: `${targetUser?.name ?? payload.userId}의 PC(${payload.hostname})에서 ${swLabel}이(가) 실행되었습니다.`,
                metadata: { ...detectionMeta, userId: payload.userId },
                recipientId: officer.id,
              })
            }
          }
        }
      }
    }

    return device.id
  })

  return {
    deviceId: result,
    newSoftwareCount,
    newInstanceCount,
    updatedInstanceCount,
  }
}

// ADR 0010 — SecurityDashboard 집계 API
const getSummary = async (requester: RequesterContext) => {
  requireSoftwareReader(requester)

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [unclassifiedCount, disallowedCount, todayDetectionCount, recentDetections] = await Promise.all([
    prisma.softwarePermission.count({ where: { status: SoftwarePermissionStatus.UNCLASSIFIED } }),
    prisma.softwarePermission.count({ where: { status: SoftwarePermissionStatus.DISALLOWED } }),
    prisma.disallowedDetection.count({ where: { detectedAt: { gte: todayStart } } }),
    prisma.disallowedDetection.findMany({
      take: 10,
      orderBy: { detectedAt: 'desc' },
      include: {
        user: { select: { id: true, name: true } },
        software: { select: { id: true, name: true, vendor: true } },
      },
    }),
  ])

  return { unclassifiedCount, disallowedCount, todayDetectionCount, recentDetections }
}

// ADR 0010 — SECURITY_OFFICER 드릴다운: DISALLOWED 앱 SoftwareUsageEvent 목록
const listDisallowedEvents = async (
  query: { page?: number; pageSize?: number },
  requester: RequesterContext,
) => {
  requirePermissionDecider(requester)

  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const skip = (page - 1) * pageSize

  const where = {
    instance: {
      software: { basePermission: { status: SoftwarePermissionStatus.DISALLOWED } },
    },
  }

  const [total, rows] = await Promise.all([
    prisma.softwareUsageEvent.count({ where }),
    prisma.softwareUsageEvent.findMany({
      where,
      include: {
        instance: {
          include: {
            software: { select: { id: true, name: true, vendor: true } },
            user: { select: { id: true, name: true } },
            device: { select: { id: true, hostname: true } },
          },
        },
      },
      orderBy: { occurredAt: 'desc' },
      skip,
      take: pageSize,
    }),
  ])

  return {
    items: rows.map((r) => ({
      id: r.id,
      occurredAt: r.occurredAt,
      software: { id: r.instance.software.id, name: r.instance.software.name, vendor: r.instance.software.vendor },
      user: r.instance.user ? { id: r.instance.user.id, name: r.instance.user.name } : null,
      device: { id: r.instance.device.id, hostname: r.instance.device.hostname },
    })),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

const toggleBlock = async (
  id: string,
  requester: RequesterContext,
): Promise<{ isBlocked: boolean }> => {
  // SECURITY_OFFICER + ADMIN만
  requirePermissionDecider(requester)

  const sw = await prisma.software.findUnique({ where: { id }, select: { id: true, isBlocked: true, name: true } })
  if (!sw) throw new AppError(404, 'Software를 찾을 수 없습니다.')

  const next = !sw.isBlocked

  await prisma.$transaction(async (tx) => {
    await tx.software.update({ where: { id }, data: { isBlocked: next } })
    await logAudit({
      action: next ? AuditAction.BLOCK_SET : AuditAction.BLOCK_UNSET,
      targetType: 'Software',
      targetId: id,
      performedById: requester.id,
      performedByRole: requester.role,
      detail: { name: sw.name, isBlocked: next },
      tx,
    })
  })

  return { isBlocked: next }
}

const listBlockEvents = async (
  id: string,
  requester: RequesterContext,
): Promise<ListBlockEventsResult> => {
  requirePermissionDecider(requester)

  const sw = await prisma.software.findUnique({ where: { id }, select: { id: true } })
  if (!sw) throw new AppError(404, 'Software를 찾을 수 없습니다.')

  const [total, rows] = await Promise.all([
    prisma.blockEvent.count({ where: { softwareId: id } }),
    prisma.blockEvent.findMany({
      where: { softwareId: id },
      include: {
        user: { select: { id: true, name: true } },
        device: { select: { id: true, hostname: true } },
      },
      orderBy: { occurredAt: 'desc' },
      take: 100,
    }),
  ])

  return {
    total,
    items: rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      userName: r.user.name,
      deviceId: r.deviceId,
      deviceHostname: r.device.hostname,
      processName: r.processName,
      occurredAt: r.occurredAt,
      createdAt: r.createdAt,
    })),
  }
}

export const softwareService = {
  list,
  getById,
  create,
  update,
  updatePermission,
  remove,
  ingest,
  getSummary,
  listDisallowedEvents,
  toggleBlock,
  listBlockEvents,
}
