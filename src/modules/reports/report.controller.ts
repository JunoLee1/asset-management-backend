import type { Request, Response } from 'express'
import {
  listRepairReports,
  getRepairReport,
  getRepairReportStats,
  createRepairReport,
  updateRepairReport,
  deleteRepairReport,
  submitRepairReport,
  acknowledgeRepairReport,
  getReportHubSummary,
} from './report.service'
import {
  createRepairReportSchema,
  updateRepairReportSchema,
  listRepairReportsSchema,
} from './report.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'
import { z } from 'zod'

export async function handleList(req: Request, res: Response) {
  const query = listRepairReportsSchema.parse(req.query)
  const result = await listRepairReports(query)
  res.json(result)
}

export async function handleDetail(req: Request, res: Response) {
  const report = await getRepairReport(requireId(req))
  res.json(report)
}

const statsQuerySchema = z.object({
  year: z.coerce.number().int().min(2020).max(2100),
  month: z.coerce.number().int().min(1).max(12).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
})

export async function handleStats(req: Request, res: Response) {
  const q = statsQuerySchema.parse(req.query)
  const stats = await getRepairReportStats(q.year, q.month, q.startDate, q.endDate)
  res.json(stats)
}

export async function handleCreate(req: Request, res: Response) {
  const { id } = getRequester(req)
  const input = createRepairReportSchema.parse(req.body)
  const report = await createRepairReport(id, input)
  res.status(201).json(report)
}

export async function handleUpdate(req: Request, res: Response) {
  const { id, role } = getRequester(req)
  const input = updateRepairReportSchema.parse(req.body)
  const report = await updateRepairReport(requireId(req), id, role, input)
  res.json(report)
}

export async function handleDelete(req: Request, res: Response) {
  const { id, role } = getRequester(req)
  await deleteRepairReport(requireId(req), id, role)
  res.status(204).end()
}

export async function handleSubmit(req: Request, res: Response) {
  const { id } = getRequester(req)
  const report = await submitRepairReport(requireId(req), id)
  res.json(report)
}

export async function handleAcknowledge(req: Request, res: Response) {
  const { id, role } = getRequester(req)
  const report = await acknowledgeRepairReport(requireId(req), id, role)
  res.json(report)
}

export async function handleSummary(req: Request, res: Response) {
  const { role } = getRequester(req)
  const summary = await getReportHubSummary(role)
  res.json(summary)
}
