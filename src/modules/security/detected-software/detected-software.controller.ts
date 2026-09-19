import type { Request, Response } from 'express'
import { detectedSoftwareService } from './detected-software.service'
import { listDetectedSoftwareSchema } from './detected-software.schema'
import { getRequester, requireId } from '../../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listDetectedSoftwareSchema.parse(req.query)
  const result = await detectedSoftwareService.list(query, getRequester(req))
  res.json(result)
}

const review = async (req: Request, res: Response): Promise<void> => {
  await detectedSoftwareService.review(requireId(req), getRequester(req))
  res.status(204).end()
}

const approve = async (req: Request, res: Response): Promise<void> => {
  await detectedSoftwareService.approve(requireId(req), getRequester(req))
  res.status(204).end()
}

const reject = async (req: Request, res: Response): Promise<void> => {
  await detectedSoftwareService.reject(requireId(req), getRequester(req))
  res.status(204).end()
}

export const detectedSoftwareController = {
  list,
  review,
  approve,
  reject,
}
