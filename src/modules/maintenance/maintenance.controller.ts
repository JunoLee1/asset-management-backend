import type { Request, Response } from 'express'
import { maintenanceService } from './maintenance.service'
import {
  createMaintenanceSchema,
  updateMaintenanceSchema,
  listMaintenancesQuerySchema,
  rejectMaintenanceSchema,
  approveMaintenanceSchema,
  assignMaintenanceSchema,
} from '../../schemas/maintenance.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listMaintenancesQuerySchema.parse(req.query)
  const result = await maintenanceService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await maintenanceService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const my = async (req: Request, res: Response): Promise<void> => {
  const result = await maintenanceService.my(getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createMaintenanceSchema.parse(req.body)
  const result = await maintenanceService.create(
    { ...body, scheduledAt: new Date(body.scheduledAt) },
    getRequester(req),
  )
  res.status(201).json(result)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const body = updateMaintenanceSchema.parse(req.body)
  const result = await maintenanceService.update(
    requireId(req),
    {
      ...body,
      scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
    },
    getRequester(req),
  )
  res.json(result)
}

const approve = async (req: Request, res: Response): Promise<void> => {
  const body = approveMaintenanceSchema.parse(req.body ?? {})
  const result = await maintenanceService.approve(requireId(req), getRequester(req), body)
  res.json(result)
}

const reject = async (req: Request, res: Response): Promise<void> => {
  const body = rejectMaintenanceSchema.parse(req.body)
  const result = await maintenanceService.reject(requireId(req), body, getRequester(req))
  res.json(result)
}

const cancel = async (req: Request, res: Response): Promise<void> => {
  const result = await maintenanceService.cancel(requireId(req), getRequester(req))
  res.json(result)
}

const approveDept = async (req: Request, res: Response): Promise<void> => {
  const body = approveMaintenanceSchema.parse(req.body ?? {})
  const result = await maintenanceService.approve(requireId(req), getRequester(req), body)
  res.json(result)
}

const assign = async (req: Request, res: Response): Promise<void> => {
  const body = assignMaintenanceSchema.parse(req.body)
  const result = await maintenanceService.assign(requireId(req), body, getRequester(req))
  res.json(result)
}

export const maintenanceController = {
  list,
  my,
  getById,
  create,
  update,
  approve,
  approveDept,
  reject,
  cancel,
  assign,
}
