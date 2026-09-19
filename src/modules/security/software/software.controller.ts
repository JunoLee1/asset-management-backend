import type { Request, Response, NextFunction } from 'express'
import { softwareService } from './software.service'
import {
  listSoftwareQuerySchema,
  createSoftwareSchema,
  updateSoftwareSchema,
  updatePermissionSchema,
  ingestPayloadSchema,
} from '../../../schemas/software.schema'
import { getRequester, requireId } from '../../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listSoftwareQuerySchema.parse(req.query)
  const result = await softwareService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await softwareService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createSoftwareSchema.parse(req.body)
  const result = await softwareService.create(body, getRequester(req))
  res.status(201).json(result)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const body = updateSoftwareSchema.parse(req.body)
  const result = await softwareService.update(requireId(req), body, getRequester(req))
  res.json(result)
}

const updatePermission = async (req: Request, res: Response): Promise<void> => {
  const body = updatePermissionSchema.parse(req.body)
  const result = await softwareService.updatePermission(requireId(req), body, getRequester(req))
  res.json(result)
}

const remove = async (req: Request, res: Response): Promise<void> => {
  await softwareService.remove(requireId(req), getRequester(req))
  res.status(204).send()
}

const ingest = async (req: Request, res: Response): Promise<void> => {
  const body = ingestPayloadSchema.parse(req.body)
  const result = await softwareService.ingest(body, getRequester(req))
  res.status(201).json(result)
}

const getSummary = async (req: Request, res: Response): Promise<void> => {
  const result = await softwareService.getSummary(getRequester(req))
  res.json(result)
}

const toggleBlock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = requireId(req)
    const requester = getRequester(req)
    const result = await softwareService.toggleBlock(id, requester)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const listBlockEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = requireId(req)
    const requester = getRequester(req)
    const result = await softwareService.listBlockEvents(id, requester)
    res.json(result)
  } catch (err) {
    next(err)
  }
}

const listDisallowedEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 20
    const result = await softwareService.listDisallowedEvents({ page, pageSize }, getRequester(req))
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const softwareController = {
  list,
  getById,
  create,
  update,
  updatePermission,
  remove,
  ingest,
  getSummary,
  listDisallowedEvents,
  toggleBlock,
  listBlockEvents,
}
