import type { Request, Response } from 'express'
import { notificationService } from './notification.service'
import { getRequester, requireId } from '../../lib/requestHelpers'
import { AppError } from '../../lib/AppError'

const my = async (req: Request, res: Response): Promise<void> => {
  const result = await notificationService.listMy(getRequester(req).id)
  res.json(result)
}

const markRead = async (req: Request, res: Response): Promise<void> => {
  await notificationService.markRead(requireId(req), getRequester(req).id)
  res.status(204).end()
}

// ADMIN 전용 manual trigger (cron 또는 외부 scheduler 가 호출 가능)
const processOutbox = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, '관리자 권한이 필요합니다.')
  }
  const result = await notificationService.processOutbox()
  res.json(result)
}

// ADMIN 전용 — 퇴사 알람 트리거 (외부 scheduler 또는 수동 호출)
const runTerminationCheck = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, '관리자 권한이 필요합니다.')
  }
  const result = await notificationService.runTerminationCheck()
  res.json(result)
}

// ADMIN 전용 — 컴플라이언스 알람 트리거
const runComplianceCheck = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  if (requester.role !== 'ADMIN') {
    throw new AppError(403, '관리자 권한이 필요합니다.')
  }
  const result = await notificationService.runComplianceCheck()
  res.json(result)
}

export const notificationController = {
  my,
  markRead,
  processOutbox,
  runTerminationCheck,
  runComplianceCheck,
}
