import type { Request, Response } from 'express'
import { disposalService, exportDisposalsExcel } from './disposal.service'
import {
  createDisposalSchema,
  approveManagerDisposalSchema,
  approveAdminDisposalSchema,
  rejectDisposalSchema,
  completeDisposalSchema,
  listDisposalsQuerySchema,
} from '../../schemas/disposal.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listDisposalsQuerySchema.parse(req.query)
  const result = await disposalService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await disposalService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createDisposalSchema.parse(req.body)
  const result = await disposalService.create(body, getRequester(req))
  res.status(201).json(result)
}

// ADR 0005 — 1차 승인 (다른 ASSET_MANAGER, body 없음)
const approveManager = async (req: Request, res: Response): Promise<void> => {
  approveManagerDisposalSchema.parse(req.body ?? {})
  const result = await disposalService.approveManager(requireId(req), getRequester(req))
  res.json(result)
}

// ADR 0005 — 최종 승인 (ADMIN, journalEntryNumber 옵션)
const approveAdmin = async (req: Request, res: Response): Promise<void> => {
  const body = approveAdminDisposalSchema.parse(req.body ?? {})
  const result = await disposalService.approveAdmin(requireId(req), body, getRequester(req))
  res.json(result)
}

const reject = async (req: Request, res: Response): Promise<void> => {
  const body = rejectDisposalSchema.parse(req.body)
  const result = await disposalService.reject(requireId(req), body, getRequester(req))
  res.json(result)
}

const cancel = async (req: Request, res: Response): Promise<void> => {
  const result = await disposalService.cancel(requireId(req), getRequester(req))
  res.json(result)
}

const complete = async (req: Request, res: Response): Promise<void> => {
  const body = completeDisposalSchema.parse(req.body)
  const result = await disposalService.complete(requireId(req), body, getRequester(req))
  res.json(result)
}

export async function handleExportExcel(_req: Request, res: Response): Promise<void> {
  const buf = await exportDisposalsExcel()
  const date = new Date().toISOString().slice(0, 10)
  const filename = encodeURIComponent(`폐기자산대장_${date}.xlsx`)
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${filename}`)
  res.send(buf)
}

export const disposalController = {
  list,
  getById,
  create,
  approveManager,
  approveAdmin,
  reject,
  cancel,
  complete,
}
