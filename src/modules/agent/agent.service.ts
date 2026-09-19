// ADR 0011/0012 — Agent service
//
// 핵심 책임:
//   - getBlockList: isBlocked=true 인 Software 의 processName 목록 반환 (인증 불필요)
//   - reportBlockEvent: 차단 이벤트 기록 + 직원/SECURITY_OFFICER 알림
//   - collect: PC 에이전트가 검출한 소프트웨어 목록 수집 → DetectedSoftware upsert
//   - ingest: ADR 0010 — processName 기반 Software 카탈로그 매칭 → SoftwareUsageEvent + DisallowedDetection

import { DetectedSoftwareStatus, SoftwarePermissionStatus } from '../../generated/prisma/enums'
import { prisma } from '../../lib/prisma'
import { AppError } from '../../lib/AppError'
import type { RequesterContext } from '../../lib/requestHelpers'
import { notificationService } from '../notifications/notification.service'
import type {
  CollectPayload,
  CollectResult,
  AgentIngestResult,
  BlockListResult,
  BlockEventPayload,
} from './agent.types'

// 수집 접근 권한 가드 — software.service.ts 의 requireSoftwareReader 와 동일
const requireCollectAccess = (requester: RequesterContext) => {
  const allowed: Array<typeof requester.role> = [
    'ADMIN',
    'TEAM_LEAD',
    'ASSET_MANAGER',
    'SECURITY_OFFICER',
  ]
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, '소프트웨어 수집 접근 권한이 없습니다.')
  }
}

// getBlockList — 인증 불필요 (서비스 레벨 가드 없음)
const getBlockList = async (): Promise<BlockListResult> => {
  const rows = await prisma.software.findMany({
    where: { isBlocked: true, processName: { not: null } },
    select: { processName: true },
  })
  const blockedProcessNames = rows
    .map((r) => r.processName)
    .filter((name): name is string => name !== null)
  return { blockedProcessNames }
}

// reportBlockEvent — 차단 이벤트 기록 + 알림 발송
const reportBlockEvent = async (payload: BlockEventPayload): Promise<void> => {
  // 존재 확인
  const [softwareRecord, userRecord, deviceRecord] = await Promise.all([
    prisma.software.findUnique({ where: { id: payload.softwareId }, select: { id: true, name: true } }),
    prisma.user.findUnique({ where: { id: payload.userId }, select: { id: true, name: true } }),
    prisma.device.findUnique({ where: { id: payload.deviceId }, select: { id: true, hostname: true } }),
  ])
  if (!softwareRecord) throw new AppError(404, 'Software 를 찾을 수 없습니다.')
  if (!userRecord) throw new AppError(404, 'User 를 찾을 수 없습니다.')
  if (!deviceRecord) throw new AppError(404, 'Device 를 찾을 수 없습니다.')

  // BlockEvent 생성
  await prisma.blockEvent.create({
    data: {
      userId: payload.userId,
      softwareId: payload.softwareId,
      deviceId: payload.deviceId,
      processName: payload.processName,
      occurredAt: new Date(payload.occurredAt),
    },
  })

  // 직원(payload.userId)에게 in-app 알림
  await notificationService.createInApp({
    type: 'COMPLIANCE_URGENT',
    title: `보안 정책에 의해 ${softwareRecord.name}이(가) 차단되었습니다`,
    body: `${softwareRecord.name}은(는) 보안 정책에 의해 차단된 소프트웨어입니다. 해당 소프트웨어의 사용을 즉시 중단해주세요.`,
    metadata: {
      softwareId: payload.softwareId,
      name: softwareRecord.name,
      deviceId: payload.deviceId,
      hostname: deviceRecord.hostname,
      processName: payload.processName,
      source: 'block_event',
    },
    recipientId: payload.userId,
  })

  // SECURITY_OFFICER 전원에게 감사용 in-app 알림
  const securityOfficers = await prisma.user.findMany({
    where: { role: 'SECURITY_OFFICER', isActive: true },
    select: { id: true },
  })
  for (const officer of securityOfficers) {
    await notificationService.createInApp({
      type: 'COMPLIANCE_URGENT',
      title: '차단 소프트웨어 실행 시도 감지',
      body: `${userRecord.name ?? payload.userId}의 PC(${deviceRecord.hostname})에서 ${softwareRecord.name}(${payload.processName}) 실행이 차단되었습니다.`,
      metadata: {
        softwareId: payload.softwareId,
        name: softwareRecord.name,
        userId: payload.userId,
        deviceId: payload.deviceId,
        hostname: deviceRecord.hostname,
        processName: payload.processName,
        source: 'block_event_audit',
      },
      recipientId: officer.id,
    })
  }
}

// collect — PC 에이전트가 검출한 소프트웨어 목록 수집
const collect = async (
  payload: CollectPayload,
  requester: RequesterContext,
): Promise<CollectResult> => {
  requireCollectAccess(requester)

  let created = 0
  let updated = 0
  let skipped = 0
  const newProcessNames: string[] = []

  // Device upsert by hostname
  const device = await prisma.device.upsert({
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
    const existing = await prisma.detectedSoftware.findUnique({
      where: {
        deviceId_processName: {
          deviceId: device.id,
          processName: item.processName,
        },
      },
    })

    if (existing) {
      if (existing.version === (item.version ?? null)) {
        // 버전 동일 — 무시
        skipped += 1
      } else {
        // 버전 변경 — 갱신
        await prisma.detectedSoftware.update({
          where: { id: existing.id },
          data: {
            version: item.version ?? null,
            detectedAt: new Date(item.detectedAt),
          },
        })
        updated += 1
      }
    } else {
      // 신규 생성
      await prisma.detectedSoftware.create({
        data: {
          deviceId: device.id,
          processName: item.processName,
          version: item.version ?? null,
          manufacturer: item.manufacturer ?? null,
          os: item.os ?? null,
          detectedAt: new Date(item.detectedAt),
          status: DetectedSoftwareStatus.PENDING_ASSET_MANAGER,
        },
      })
      created += 1
      newProcessNames.push(item.processName)
    }
  }

  // 신규 탐지 SW가 있으면 ASSET_MANAGER + SECURITY_OFFICER 알림
  if (newProcessNames.length > 0) {
    const [assetManagers, securityOfficers] = await Promise.all([
      prisma.user.findMany({ where: { role: 'ASSET_MANAGER', isActive: true }, select: { id: true } }),
      prisma.user.findMany({ where: { role: 'SECURITY_OFFICER', isActive: true }, select: { id: true } }),
    ])
    const label =
      newProcessNames.length === 1
        ? newProcessNames[0]
        : `${newProcessNames[0]} 외 ${newProcessNames.length - 1}건`

    const recipients = [
      ...assetManagers.map((u) => ({ id: u.id, title: '신규 소프트웨어 발견 — 분류 필요' })),
      ...securityOfficers.map((u) => ({ id: u.id, title: '신규 소프트웨어 감지 — 보안 검토 필요' })),
    ]
    for (const r of recipients) {
      await notificationService.createInApp({
        type: 'COMPLIANCE_URGENT',
        title: r.title,
        body: `${label} 소프트웨어가 ${payload.hostname}에서 새로 발견됐습니다.`,
        metadata: { processNames: newProcessNames, deviceId: device.id, hostname: payload.hostname, source: 'new_detected_software' },
        recipientId: r.id,
      })
    }
  }

  return { deviceId: device.id, created, updated, skipped }
}

// ADR 0010 — processName 기반 Software 카탈로그 매칭 ingest
// 매칭 성공: SoftwareInstance upsert + SoftwareUsageEvent + DISALLOWED 첫 감지 알림
// 매칭 실패: DetectedSoftware upsert (신규면 ASSET_MANAGER 알림)
const ingest = async (
  payload: CollectPayload,
  requester: RequesterContext,
): Promise<AgentIngestResult> => {
  requireCollectAccess(requester)

  let matched = 0
  let created = 0
  let updated = 0
  let skipped = 0

  const device = await prisma.device.upsert({
    where: { hostname: payload.hostname },
    create: { hostname: payload.hostname, userId: payload.userId ?? null, lastSeenAt: new Date() },
    update: { userId: payload.userId ?? null, lastSeenAt: new Date() },
  })

  // Software 카탈로그 중 processName 있는 것을 한 번에 로드해 맵 구성
  const catalog = await prisma.software.findMany({
    where: { processName: { not: null } },
    select: {
      id: true,
      name: true,
      processName: true,
      basePermission: { select: { status: true } },
    },
  })
  const catalogMap = new Map<string, (typeof catalog)[number]>()
  for (const sw of catalog) {
    if (sw.processName) catalogMap.set(sw.processName.toLowerCase(), sw)
  }

  for (const item of payload.items) {
    const swMatch = catalogMap.get(item.processName.toLowerCase())

    if (swMatch) {
      matched++

      const instance = await prisma.softwareInstance.upsert({
        where: { softwareId_deviceId: { softwareId: swMatch.id, deviceId: device.id } },
        create: {
          softwareId: swMatch.id,
          deviceId: device.id,
          userId: device.userId ?? null,
          executedOs: item.os ?? 'Unknown',
          firstDiscoveredAt: new Date(item.detectedAt),
          lastUsedAt: new Date(item.detectedAt),
        },
        update: { lastUsedAt: new Date(item.detectedAt) },
      })

      await prisma.softwareUsageEvent.create({
        data: { instanceId: instance.id, occurredAt: new Date(item.detectedAt) },
      })

      if (swMatch.basePermission?.status === SoftwarePermissionStatus.DISALLOWED && device.userId) {
        const alreadyDetected = await prisma.disallowedDetection.findUnique({
          where: { userId_softwareId: { userId: device.userId, softwareId: swMatch.id } },
        })
        if (!alreadyDetected) {
          await prisma.disallowedDetection.create({
            data: { userId: device.userId, softwareId: swMatch.id },
          })
          const [userRecord, officers] = await Promise.all([
            prisma.user.findUnique({ where: { id: device.userId }, select: { id: true, name: true } }),
            prisma.user.findMany({ where: { role: 'SECURITY_OFFICER', isActive: true }, select: { id: true } }),
          ])
          const meta = { softwareId: swMatch.id, name: swMatch.name, processName: item.processName, hostname: payload.hostname, source: 'disallowed_detection' }
          if (userRecord) {
            await notificationService.createInApp({
              type: 'DISALLOWED_APP_DETECTED',
              title: '비허가 소프트웨어 실행 감지',
              body: `${swMatch.name}은(는) 허가되지 않은 소프트웨어입니다. 즉시 삭제해주세요.`,
              metadata: meta,
              recipientId: userRecord.id,
            })
          }
          for (const officer of officers) {
            await notificationService.createInApp({
              type: 'DISALLOWED_APP_DETECTED',
              title: '비허가 앱 감지',
              body: `${userRecord?.name ?? device.userId}의 PC(${payload.hostname})에서 ${swMatch.name}(${item.processName})이(가) 처음 실행됐습니다.`,
              metadata: { ...meta, userId: device.userId },
              recipientId: officer.id,
            })
          }
        }
      }
    } else {
      const existing = await prisma.detectedSoftware.findUnique({
        where: { deviceId_processName: { deviceId: device.id, processName: item.processName } },
      })
      if (existing) {
        if (existing.version === (item.version ?? null)) {
          skipped++
        } else {
          await prisma.detectedSoftware.update({
            where: { id: existing.id },
            data: { version: item.version ?? null, detectedAt: new Date(item.detectedAt) },
          })
          updated++
        }
      } else {
        await prisma.detectedSoftware.create({
          data: {
            deviceId: device.id,
            processName: item.processName,
            version: item.version ?? null,
            manufacturer: item.manufacturer ?? null,
            os: item.os ?? null,
            detectedAt: new Date(item.detectedAt),
            status: DetectedSoftwareStatus.PENDING_ASSET_MANAGER,
          },
        })
        created++
        const assetManagers = await prisma.user.findMany({
          where: { role: 'ASSET_MANAGER', isActive: true },
          select: { id: true },
        })
        for (const am of assetManagers) {
          await notificationService.createInApp({
            type: 'COMPLIANCE_URGENT',
            title: '신규 소프트웨어 발견 — 분류 필요',
            body: `${item.processName}${item.manufacturer ? ` (${item.manufacturer})` : ''} 소프트웨어가 ${payload.hostname}에서 새로 발견됐습니다.`,
            metadata: { processName: item.processName, deviceId: device.id, hostname: payload.hostname, source: 'new_detected_software' },
            recipientId: am.id,
          })
        }
      }
    }
  }

  return { deviceId: device.id, matched, created, updated, skipped }
}

export const agentService = {
  getBlockList,
  reportBlockEvent,
  collect,
  ingest,
}
