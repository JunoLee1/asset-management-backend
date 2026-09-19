// ADR 0012 — DetectedSoftware 검토 워크플로우 서비스
//
// 핵심 책임:
//   - list: 탐지 목록 조회 (status 필터, pagination)
//   - review: ASSET_MANAGER 1차 검토 → PENDING_SECURITY_OFFICER 상태로 전환
//   - approve: SECURITY_OFFICER 허가 → Software+SoftwareInstance 승격, DetectedSoftware 삭제
//   - reject: SECURITY_OFFICER 미허가 → DetectedSoftware 삭제

import {
  AuditAction,
  SoftwareType,
  SoftwarePermissionStatus,
  SoftwareSource,
} from '../../../generated/prisma/enums'
import { prisma } from '../../../lib/prisma'
import { AppError } from '../../../lib/AppError'
import { logAudit } from '../audit/audit.service'
import type { RequesterContext } from '../../../lib/requestHelpers'
import type {
  ListDetectedSoftwareQuery,
  ListDetectedSoftwareResult,
} from './detected-software.types'

const list = async (
  query: ListDetectedSoftwareQuery,
  requester: RequesterContext,
): Promise<ListDetectedSoftwareResult> => {
  const allowed: Array<typeof requester.role> = ['ADMIN', 'ASSET_MANAGER', 'SECURITY_OFFICER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'DetectedSoftware 조회 권한이 없습니다.')
  }

  const where = query.status ? { status: query.status } : {}
  const page = query.page ?? 1
  const pageSize = query.pageSize ?? 20
  const skip = (page - 1) * pageSize

  const [rows, total] = await Promise.all([
    prisma.detectedSoftware.findMany({
      where,
      include: {
        device: { select: { hostname: true } },
      },
      orderBy: { detectedAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.detectedSoftware.count({ where }),
  ])

  return {
    items: rows.map((row) => ({
      id: row.id,
      deviceId: row.deviceId,
      deviceHostname: row.device.hostname,
      processName: row.processName,
      version: row.version,
      manufacturer: row.manufacturer,
      os: row.os,
      detectedAt: row.detectedAt,
      status: row.status,
      createdAt: row.createdAt,
    })),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

const review = async (id: string, requester: RequesterContext): Promise<void> => {
  const allowed: Array<typeof requester.role> = ['ASSET_MANAGER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'ASSET_MANAGER 만 1차 검토할 수 있습니다.')
  }

  const record = await prisma.detectedSoftware.findUnique({ where: { id } })
  if (!record) throw new AppError(404, 'DetectedSoftware 를 찾을 수 없습니다.')
  if (record.status !== 'PENDING_ASSET_MANAGER') {
    throw new AppError(400, '이미 검토된 항목입니다.')
  }

  await prisma.$transaction(async (tx) => {
    await tx.detectedSoftware.update({
      where: { id },
      data: { status: 'PENDING_SECURITY_OFFICER' },
    })

    await logAudit({
      action: AuditAction.DETECTED_SW_REVIEWED,
      targetType: 'DetectedSoftware',
      targetId: id,
      performedById: requester.id,
      performedByRole: requester.role,
      detail: { processName: record.processName, deviceId: record.deviceId },
      tx,
    })
  })
}

const approve = async (id: string, requester: RequesterContext): Promise<void> => {
  const allowed: Array<typeof requester.role> = ['SECURITY_OFFICER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'SECURITY_OFFICER 만 허가 판정할 수 있습니다.')
  }

  const record = await prisma.detectedSoftware.findUnique({
    where: { id },
    include: { device: true },
  })
  if (!record) throw new AppError(404, 'DetectedSoftware 를 찾을 수 없습니다.')
  if (record.status !== 'PENDING_SECURITY_OFFICER') {
    throw new AppError(400, '2차 판정 대기 상태가 아닙니다.')
  }

  await prisma.$transaction(async (tx) => {
    // Software upsert: processName 기준으로 기존 카탈로그 재사용 또는 신규 생성
    let softwareRecord = await tx.software.findFirst({
      where: { processName: record.processName },
    })

    if (!softwareRecord) {
      softwareRecord = await tx.software.create({
        data: {
          name: record.processName,
          processName: record.processName,
          type: SoftwareType.Other,
          category: '기타',
          basePermission: {
            create: { status: SoftwarePermissionStatus.UNCLASSIFIED },
          },
        },
      })
    }

    // SoftwareInstance upsert: softwareId × deviceId unique
    const existingInstance = await tx.softwareInstance.findUnique({
      where: {
        softwareId_deviceId: {
          softwareId: softwareRecord.id,
          deviceId: record.deviceId,
        },
      },
    })

    if (existingInstance) {
      await tx.softwareInstance.update({
        where: { id: existingInstance.id },
        data: { lastUsedAt: record.detectedAt },
      })
    } else {
      await tx.softwareInstance.create({
        data: {
          softwareId: softwareRecord.id,
          deviceId: record.deviceId,
          executedOs: record.os ?? 'Unknown',
          source: SoftwareSource.AGENT,
          firstDiscoveredAt: record.detectedAt,
          lastUsedAt: record.detectedAt,
        },
      })
    }

    // DetectedSoftware 삭제
    await tx.detectedSoftware.delete({ where: { id } })

    await logAudit({
      action: AuditAction.DETECTED_SW_APPROVED,
      targetType: 'DetectedSoftware',
      targetId: id,
      performedById: requester.id,
      performedByRole: requester.role,
      detail: {
        processName: record.processName,
        deviceId: record.deviceId,
        softwareId: softwareRecord.id,
      },
      tx,
    })
  })
}

const reject = async (id: string, requester: RequesterContext): Promise<void> => {
  const allowed: Array<typeof requester.role> = ['SECURITY_OFFICER']
  if (!allowed.includes(requester.role)) {
    throw new AppError(403, 'SECURITY_OFFICER 만 미허가 판정할 수 있습니다.')
  }

  const record = await prisma.detectedSoftware.findUnique({ where: { id } })
  if (!record) throw new AppError(404, 'DetectedSoftware 를 찾을 수 없습니다.')
  if (record.status !== 'PENDING_SECURITY_OFFICER') {
    throw new AppError(400, '2차 판정 대기 상태가 아닙니다.')
  }

  await prisma.$transaction(async (tx) => {
    await tx.detectedSoftware.delete({ where: { id } })

    await logAudit({
      action: AuditAction.DETECTED_SW_REJECTED,
      targetType: 'DetectedSoftware',
      targetId: id,
      performedById: requester.id,
      performedByRole: requester.role,
      detail: { processName: record.processName, deviceId: record.deviceId },
      tx,
    })
  })
}

export const detectedSoftwareService = {
  list,
  review,
  approve,
  reject,
}
