import type { Request, Response } from 'express'
import { licenseService } from './license.service'
import {
  createLicenseSchema,
  updateLicenseSchema,
  listLicensesQuerySchema,
  createLicenseRequestSchema,
  rejectLicenseRequestSchema,
  listLicenseRequestsQuerySchema,
} from '../../schemas/license.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listLicensesQuerySchema.parse(req.query)
  const result = await licenseService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await licenseService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createLicenseSchema.parse(req.body)
  const result = await licenseService.create(
    {
      ...body,
      purchaseDate: new Date(body.purchaseDate),
      expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
    },
    getRequester(req),
  )
  res.status(201).json(result)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const body = updateLicenseSchema.parse(req.body)
  const expiry =
    body.expiryDate === null ? null : body.expiryDate ? new Date(body.expiryDate) : undefined
  const result = await licenseService.update(
    requireId(req),
    {
      ...body,
      purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
      expiryDate: expiry,
    },
    getRequester(req),
  )
  res.json(result)
}

const remove = async (req: Request, res: Response): Promise<void> => {
  await licenseService.remove(requireId(req), getRequester(req))
  res.status(204).send()
}

const unassign = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const assignmentId = requireId(req, 'assignmentId')
  const result = await licenseService.unassign(licenseId, assignmentId, getRequester(req))
  res.json(result)
}

const createRequest = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const body = createLicenseRequestSchema.parse(req.body)
  const result = await licenseService.request(licenseId, body, getRequester(req))
  res.status(201).json(result)
}

const listRequests = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const query = listLicenseRequestsQuerySchema.parse(req.query)
  const result = await licenseService.listRequests(licenseId, query, getRequester(req))
  res.json(result)
}

const approveManagerHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.approveManager(licenseId, requestId, getRequester(req))
  res.json(result)
}

const approveDeptHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.approveDept(licenseId, requestId, getRequester(req))
  res.json(result)
}

const approveSecurityHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.approveSecurity(licenseId, requestId, getRequester(req))
  res.json(result)
}

const approveAdminHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.approveAdmin(licenseId, requestId, getRequester(req))
  res.json(result)
}

const rejectHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const body = rejectLicenseRequestSchema.parse(req.body)
  const result = await licenseService.reject(licenseId, requestId, body, getRequester(req))
  res.json(result)
}

const cancelHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const requestId = requireId(req, 'requestId')
  const result = await licenseService.cancel(licenseId, requestId, getRequester(req))
  res.json(result)
}

const bulkAssignHandler = async (req: Request, res: Response): Promise<void> => {
  const licenseId = requireId(req)
  const result = await licenseService.bulkAssign(licenseId, getRequester(req))
  res.json(result)
}

export const licenseController = {
  list, getById, create, update, remove,
  unassign,
  createRequest, listRequests,
  approveManagerHandler, approveDeptHandler,
  approveSecurityHandler, approveAdminHandler,
  rejectHandler, cancelHandler,
  bulkAssignHandler,
}
