import type { Request, Response } from 'express'
import { catalogService } from './catalog.service'
import {
  createCatalogSchema,
  updateCatalogSchema,
  listCatalogQuerySchema,
} from '../../schemas/catalog.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listCatalogQuerySchema.parse(req.query)
  const result = await catalogService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await catalogService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createCatalogSchema.parse(req.body)
  const result = await catalogService.create(body, getRequester(req))
  res.status(201).json(result)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const body = updateCatalogSchema.parse(req.body)
  const result = await catalogService.update(requireId(req), body, getRequester(req))
  res.json(result)
}

const remove = async (req: Request, res: Response): Promise<void> => {
  await catalogService.remove(requireId(req), getRequester(req))
  res.status(204).send()
}

export const catalogController = { list, getById, create, update, remove }
