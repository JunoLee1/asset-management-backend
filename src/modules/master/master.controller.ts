import type { Request, Response, NextFunction, RequestHandler } from 'express'
import { AppError } from '../../lib/AppError'
import { prisma } from '../../lib/prisma'
import { getRequester, requireId } from '../../lib/requestHelpers'
import { departmentService } from './department.service'
import { teamService } from './team.service'
import { locationService } from './location.service'
import { vendorService } from './vendor.service'
import { assetCategoryService } from './assetCategory.service'
import { isCloudinaryConfigured } from '../../lib/cloudinary'
import { validateBrn } from '../../lib/ntsBusinessApi'

function getId(req: Request): string {
  const id = req.params['id']
  if (typeof id !== 'string' || !id) throw new AppError(400, '식별자가 필요합니다.')
  return id
}

interface MasterService<C, U> {
  list: (opts?: { includeDeleted?: boolean }) => Promise<unknown>
  getById: (id: string) => Promise<unknown>
  create: (dto: C) => Promise<unknown>
  update: (id: string, dto: U) => Promise<unknown>
  softDelete: (id: string) => Promise<unknown>
  restore: (id: string) => Promise<unknown>
}

function makeHandlers<C, U>(service: MasterService<C, U>) {
  return {
    list: async (req: Request, res: Response): Promise<void> => {
      const includeDeleted = req.query['includeDeleted'] === 'true'
      const status = req.query['status'] as string | undefined
      res.json(await service.list({ includeDeleted, ...(status ? { status } : {}) }))
    },
    getById: async (req: Request, res: Response): Promise<void> => {
      res.json(await service.getById(getId(req)))
    },
    create: async (req: Request, res: Response): Promise<void> => {
      res.status(201).json(await service.create(req.body as C))
    },
    update: async (req: Request, res: Response): Promise<void> => {
      res.json(await service.update(getId(req), req.body as U))
    },
    remove: async (req: Request, res: Response): Promise<void> => {
      res.json(await service.softDelete(getId(req)))
    },
    restore: async (req: Request, res: Response): Promise<void> => {
      res.json(await service.restore(getId(req)))
    },
  }
}

export const departmentHandlers = {
  ...makeHandlers(departmentService),
  list: async (req: Request, res: Response): Promise<void> => {
    const includeDeleted = req.query['includeDeleted'] === 'true'
    const requester = getRequester(req)
    res.json(await departmentService.list({ includeDeleted, requester }))
  },
}

async function assertTeamAccess(req: Request, teamId?: string, departmentId?: string): Promise<void> {
  const { id: userId, role } = getRequester(req)
  if (role === 'ADMIN') return

  // 부서장 동적 권한: 해당 부서의 leaderId가 요청자인지 확인
  const deptId = departmentId ?? (teamId ? (await teamService.getById(teamId) as { departmentId: string }).departmentId : undefined)
  if (!deptId) throw new AppError(403, '팀 작업에 필요한 부서 정보가 없습니다.')

  const dept = await prisma.department.findUnique({ where: { id: deptId }, select: { leaderId: true } })
  if (!dept || dept.leaderId !== userId) throw new AppError(403, '해당 부서의 부서장만 팀을 관리할 수 있습니다.')
}

export const teamHandlers = {
  ...makeHandlers(teamService),
  list: async (req: Request, res: Response): Promise<void> => {
    const includeDeleted = req.query['includeDeleted'] === 'true'
    const requester = getRequester(req)
    res.json(await teamService.list({ includeDeleted, requester }))
  },
  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await assertTeamAccess(req, undefined, (req.body as { departmentId?: string }).departmentId)
      res.status(201).json(await teamService.create(req.body as Parameters<typeof teamService.create>[0]))
    } catch (err) { next(err) }
  },
  update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = getId(req)
      await assertTeamAccess(req, id, (req.body as { departmentId?: string }).departmentId)
      res.json(await teamService.update(id, req.body as Parameters<typeof teamService.update>[1]))
    } catch (err) { next(err) }
  },
  remove: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = getId(req)
      await assertTeamAccess(req, id)
      res.json(await teamService.softDelete(id))
    } catch (err) { next(err) }
  },
  restore: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = getId(req)
      await assertTeamAccess(req, id)
      res.json(await teamService.restore(id))
    } catch (err) { next(err) }
  },
}
export const locationHandlers = makeHandlers(locationService)
const _vendorBase = makeHandlers(vendorService)
export const vendorHandlers = {
  ..._vendorBase,
  list: async (req: Request, res: Response): Promise<void> => {
    const includeDeleted = req.query['includeDeleted'] === 'true'
    const status = (req.query['status'] as string | undefined) as any
    const type = req.query['type'] as 'REPAIR' | 'SOFTWARE' | undefined
    res.json(await vendorService.list({ includeDeleted, ...(status ? { status } : {}), ...(type ? { type } : {}) }))
  },
}
export const assetCategoryHandlers = makeHandlers(assetCategoryService)

export const createVendorDraft: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: createdById } = getRequester(req)
    const result = await vendorService.createDraft(req.body, createdById)
    res.status(201).json(result)
  } catch (err) { next(err) }
}

export const approveVendor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = requireId(req)
    const { id: adminId } = getRequester(req)
    const result = await vendorService.approve(id, adminId)
    res.json(result)
  } catch (err) { next(err) }
}

export const inactivateVendor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = requireId(req)
    const result = await vendorService.inactivate(id)
    res.json(result)
  } catch (err) { next(err) }
}

export const submitVendor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = requireId(req)
    const result = await vendorService.submit(id)
    res.json(result)
  } catch (err) { next(err) }
}

export const rejectVendor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = requireId(req)
    const { id: adminId } = getRequester(req)
    const { reason } = req.body as { reason: string }
    const result = await vendorService.reject(id, adminId, reason)
    res.json(result)
  } catch (err) { next(err) }
}

export const blacklistVendor: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = requireId(req)
    const { id: adminId } = getRequester(req)
    const { reason } = req.body as { reason: string }
    const result = await vendorService.blacklist(id, adminId, reason)
    res.json(result)
  } catch (err) { next(err) }
}

export const getVendorDocuments: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = requireId(req)
    const result = await vendorService.getDocuments(id)
    res.json(result)
  } catch (err) { next(err) }
}

export const uploadVendorDocumentHandler: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!isCloudinaryConfigured()) {
      throw new AppError(503, 'Cloudinary 가 설정되지 않았습니다. (.env CLOUDINARY_* 확인)')
    }
    const vendorId = requireId(req)
    const { id: uploaderId } = getRequester(req)
    const file = (req as Request & { file?: Express.Multer.File }).file
    if (!file) throw new AppError(400, '파일이 업로드되지 않았습니다.')

    const { documentType } = req.body as { documentType?: string }
    if (!documentType) throw new AppError(400, 'documentType 이 필요합니다.')

    // multer-storage-cloudinary: file.path = secure_url, file.filename = public_id
    const multerFile = file as unknown as { path: string; filename: string }
    const result = await vendorService.saveDocument(vendorId, uploaderId, {
      documentType,
      publicId: multerFile.filename,
      secureUrl: multerFile.path,
      originalName: file.originalname,
      mimeType: file.mimetype,
      sizeBytes: file.size,
    })
    res.status(201).json(result)
  } catch (err) { next(err) }
}

// ── 사업자등록번호 실시간 검증 (국세청 API 프록시) ─────────────────────────────
export const validateBrnHandler: RequestHandler = async (req, res, next) => {
  try {
    const { brn } = req.body as { brn?: string }
    if (!brn || typeof brn !== 'string') throw new AppError(400, '사업자등록번호(brn)가 필요합니다.')
    const result = await validateBrn(brn)
    res.json(result)
  } catch (err) { next(err) }
}
