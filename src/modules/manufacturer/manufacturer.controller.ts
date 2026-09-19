import type { Request, Response } from 'express'
import { manufacturerService } from './manufacturer.service'
import {
  createManufacturerSchema,
  updateManufacturerSchema,
  listManufacturerQuerySchema,
} from '../../schemas/manufacturer.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listManufacturerQuerySchema.parse(req.query)
  const result = await manufacturerService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await manufacturerService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createManufacturerSchema.parse(req.body)
  const result = await manufacturerService.create(body, getRequester(req))
  res.status(201).json(result)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const body = updateManufacturerSchema.parse(req.body)
  const result = await manufacturerService.update(requireId(req), body, getRequester(req))
  res.json(result)
}

const remove = async (req: Request, res: Response): Promise<void> => {
  await manufacturerService.remove(requireId(req), getRequester(req))
  res.status(204).send()
}

export const manufacturerController = { list, getById, create, update, remove }
