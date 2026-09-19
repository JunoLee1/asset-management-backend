import type { Request, Response } from 'express'
import { userService } from './user.service'
import type {
  UpdateUserInput,
  DeactivateUserInput,
  ActivateUserInput,
  ReinviteUserInput,
} from '../../schemas/user.schema'
import {
  listUsersQuerySchema,
  listUserHistoryQuerySchema,
} from '../../schemas/user.schema'
import { getRequester, requireId, getAuditContext } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listUsersQuerySchema.parse(req.query)
  const requester = getRequester(req)
  res.json(await userService.list(query, requester))
}

const getById = async (req: Request, res: Response): Promise<void> => {
  res.json(await userService.getById(requireId(req), getRequester(req)))
}

const update = async (req: Request, res: Response): Promise<void> => {
  res.json(
    await userService.update(
      requireId(req),
      req.body as UpdateUserInput,
      getRequester(req),
      getAuditContext(req),
    ),
  )
}

const deactivate = async (req: Request, res: Response): Promise<void> => {
  res.json(
    await userService.deactivate(
      requireId(req),
      req.body as DeactivateUserInput,
      getRequester(req),
      getAuditContext(req),
    ),
  )
}

const activate = async (req: Request, res: Response): Promise<void> => {
  res.json(
    await userService.activate(
      requireId(req),
      req.body as ActivateUserInput,
      getRequester(req),
      getAuditContext(req),
    ),
  )
}

const reinvite = async (req: Request, res: Response): Promise<void> => {
  res
    .status(201)
    .json(
      await userService.reinvite(
        requireId(req),
        req.body as ReinviteUserInput,
        getRequester(req),
        getAuditContext(req),
      ),
    )
}

const listHistory = async (req: Request, res: Response): Promise<void> => {
  const query = listUserHistoryQuerySchema.parse(req.query)
  res.json(await userService.listHistory(requireId(req), query))
}

export const userController = {
  list,
  getById,
  update,
  deactivate,
  activate,
  reinvite,
  listHistory,
}
