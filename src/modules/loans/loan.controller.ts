import type { Request, Response } from 'express'
import { loanService } from './loan.service'
import {
  createLoanSchema,
  approveLoanSchema,
  rejectLoanSchema,
  recallLoanSchema,
  returnLoanSchema,
  inspectLoanSchema,
  listLoansQuerySchema,
  lookupLoanQuerySchema,
} from '../../schemas/loan.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const list = async (req: Request, res: Response): Promise<void> => {
  const query = listLoansQuerySchema.parse(req.query)
  const result = await loanService.list(query, getRequester(req))
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.getById(requireId(req), getRequester(req))
  res.json(result)
}

const my = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.my(getRequester(req))
  res.json(result)
}

const overdue = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.overdue(getRequester(req))
  res.json(result)
}

const lookup = async (req: Request, res: Response): Promise<void> => {
  const query = lookupLoanQuerySchema.parse(req.query)
  const result = await loanService.lookup(query.assetCode, getRequester(req))
  res.json(result)
}

const create = async (req: Request, res: Response): Promise<void> => {
  const body = createLoanSchema.parse(req.body)
  const result = await loanService.create(body, getRequester(req))
  res.status(201).json(result)
}

const approveManager = async (req: Request, res: Response): Promise<void> => {
  const body = approveLoanSchema.parse(req.body)
  const result = await loanService.approveManager(requireId(req), body, getRequester(req))
  res.json(result)
}

const approveDept = async (req: Request, res: Response): Promise<void> => {
  const body = approveLoanSchema.parse(req.body)
  const result = await loanService.approveDept(requireId(req), body, getRequester(req))
  res.json(result)
}

const approveAdmin = async (req: Request, res: Response): Promise<void> => {
  const body = approveLoanSchema.parse(req.body)
  const result = await loanService.approveAdmin(requireId(req), body, getRequester(req))
  res.json(result)
}

// 프론트 호환: 대여 상태에 따라 단계별 service 자동 분기 (ADR 0003: PENDING_DEPT 포함)
const approve = async (req: Request, res: Response): Promise<void> => {
  const id = requireId(req)
  const body = approveLoanSchema.parse(req.body)
  const requester = getRequester(req)
  const loan = await loanService.getById(id, requester)
  if (loan.status === 'PENDING_MANAGER') {
    const result = await loanService.approveManager(id, body, requester)
    res.json(result)
  } else if (loan.status === 'PENDING_DEPT') {
    const result = await loanService.approveDept(id, body, requester)
    res.json(result)
  } else if (loan.status === 'PENDING_ADMIN') {
    const result = await loanService.approveAdmin(id, body, requester)
    res.json(result)
  } else {
    res.status(400).json({ message: `현재 상태(${loan.status})에서는 승인할 수 없습니다.` })
  }
}

const approveReturnManager = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.approveReturnManager(requireId(req), getRequester(req))
  res.json(result)
}

const approveReturnDept = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.approveReturnDept(requireId(req), getRequester(req))
  res.json(result)
}

const finalizeReturn = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.finalizeReturn(requireId(req), getRequester(req))
  res.json(result)
}

const checkout = async (req: Request, res: Response): Promise<void> => {
  const body = approveLoanSchema.parse(req.body)
  const result = await loanService.checkout(requireId(req), body, getRequester(req))
  res.json(result)
}

const receive = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.receive(requireId(req), getRequester(req))
  res.json(result)
}

const reject = async (req: Request, res: Response): Promise<void> => {
  const body = rejectLoanSchema.parse(req.body)
  const result = await loanService.reject(requireId(req), body, getRequester(req))
  res.json(result)
}

const cancel = async (req: Request, res: Response): Promise<void> => {
  const result = await loanService.cancel(requireId(req), getRequester(req))
  res.json(result)
}

const recall = async (req: Request, res: Response): Promise<void> => {
  const body = recallLoanSchema.parse(req.body)
  const result = await loanService.recall(requireId(req), body, getRequester(req))
  res.json(result)
}

// FE 호환: body 받아도 ignore — 검수 단계에서 ASSET_MANAGER 가 다시 입력
const returnLoan = async (req: Request, res: Response): Promise<void> => {
  returnLoanSchema.parse(req.body)
  const result = await loanService.requestReturn(requireId(req), getRequester(req))
  res.json(result)
}

const inspect = async (req: Request, res: Response): Promise<void> => {
  const body = inspectLoanSchema.parse(req.body)
  const result = await loanService.inspect(requireId(req), body, getRequester(req))
  res.json(result)
}

const requestExtension = async (req: Request, res: Response): Promise<void> => {
  const id = requireId(req)
  const { days } = req.body as { days: number }
  const result = await loanService.requestExtension(id, days, getRequester(req))
  res.status(201).json(result)
}

const approveExtensionManager = async (req: Request, res: Response): Promise<void> => {
  const extensionId = requireId(req)
  const result = await loanService.approveExtensionManager(extensionId, getRequester(req))
  res.json(result)
}

const approveExtensionAdmin = async (req: Request, res: Response): Promise<void> => {
  const extensionId = requireId(req)
  const result = await loanService.approveExtensionAdmin(extensionId, getRequester(req))
  res.json(result)
}

const rejectExtension = async (req: Request, res: Response): Promise<void> => {
  const extensionId = requireId(req)
  const { reason } = req.body as { reason: string }
  const result = await loanService.rejectExtension(extensionId, reason ?? '', getRequester(req))
  res.json(result)
}

export const loanController = {
  list,
  getById,
  my,
  overdue,
  lookup,
  create,
  approve,
  approveManager,
  approveDept,
  approveAdmin,
  approveReturnManager,
  approveReturnDept,
  finalizeReturn,
  checkout,
  receive,
  reject,
  cancel,
  recall,
  returnLoan,
  inspect,
  requestExtension,
  approveExtensionManager,
  approveExtensionAdmin,
  rejectExtension,
}
