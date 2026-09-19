import type { Request, Response } from 'express'
import { depreciationService } from './depreciation.service'
import { upsertDepreciationSchema } from '../../schemas/depreciation.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const { q, method, page, pageSize } = req.query
  const result = await depreciationService.list({
    q: q ? String(q) : undefined,
    method: method ? (String(method) as 'STRAIGHT_LINE' | 'DECLINING_BALANCE') : undefined,
    page: page ? Number(page) : undefined,
    pageSize: pageSize ? Number(pageSize) : undefined,
  })
  res.json(result)
}

const getByAssetId = async (req: Request, res: Response): Promise<void> => {
  const result = await depreciationService.getByAssetId(requireId(req, 'assetId'), getRequester(req))
  res.json(result)
}

const upsert = async (req: Request, res: Response): Promise<void> => {
  const body = upsertDepreciationSchema.parse(req.body)
  const result = await depreciationService.upsert(
    { ...body, assetId: requireId(req, 'assetId') },
    getRequester(req),
  )
  res.status(201).json(result)
}

const remove = async (req: Request, res: Response): Promise<void> => {
  await depreciationService.remove(requireId(req, 'assetId'), getRequester(req))
  res.status(204).send()
}

export const depreciationController = { list, getByAssetId, upsert, remove }
