import type { Request, Response } from 'express'
import { adminService } from './admin.service'
import { prisma } from '../../lib/prisma'
import type { InviteUserInput } from '../../schemas/auth.schema'

const inviteUser = async (req: Request, res: Response): Promise<void> => {
  const result = await adminService.inviteUser(req.body as InviteUserInput)
  res.status(201).json(result)
}

const getSummary = async (_req: Request, res: Response): Promise<void> => {
  const [
    userCount,
    pendingLoanAdmin,
    pendingMaintenance,
    pendingDisposalAll,
    recentEvents,
  ] = await Promise.all([
    prisma.user.count({ where: { isActive: true } }),
    prisma.loan.count({ where: { status: 'PENDING_ADMIN' } }),
    prisma.maintenance.count({ where: { status: 'PENDING_ADMIN' } }),
    prisma.disposal.count({ where: { status: 'PENDING_ADMIN' } }),
    prisma.assetHistory.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        action: true,
        createdAt: true,
        asset: { select: { name: true, assetCode: true } },
        performedBy: { select: { name: true } },
      },
    }),
  ])

  res.json({
    userCount,
    pendingApprovals: {
      loans: pendingLoanAdmin,
      maintenances: pendingMaintenance,
      disposals: pendingDisposalAll,
      total: pendingLoanAdmin + pendingMaintenance + pendingDisposalAll,
    },
    recentEvents: recentEvents.map((e) => ({
      action: e.action,
      assetName: e.asset.name,
      assetCode: e.asset.assetCode,
      actorName: e.performedBy.name,
      at: e.createdAt.toISOString(),
    })),
  })
}

export const adminController = { inviteUser, getSummary }



//관리자 핵심가치를 관리를 편하게 잘볼수있는 ux/ui 디자인
//일반 유저는 무엇을 대여중인지 알수있어야한다...