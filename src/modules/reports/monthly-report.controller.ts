import type { Request, Response } from 'express'
import { z } from 'zod'
import { getRequester, requireId } from '../../lib/requestHelpers'
import {
  listTeamMonthlyReports,
  getTeamMonthlyReport,
  exportTeamMonthlyReportExcel,
  listDeptMonthlyReports,
  getDeptMonthlyReport,
  exportDeptMonthlyReportExcel,
  exportTeamAnnualReportExcel,
  exportDeptAnnualReportExcel,
  submitTeamReport,
  reviewTeamReport,
  rejectTeamReport,
  finalizeDeptReport,
} from './monthly-report.service'

const listQuerySchema = z.object({
  year: z.coerce.number().int().min(2020).max(2100).optional(),
  month: z.coerce.number().int().min(1).max(12).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
})

// ─────────────────────────────────────────
// 팀 월말 보고서
// ─────────────────────────────────────────

export async function handleListTeamMonthly(req: Request, res: Response) {
  const { role, teamId, departmentId } = getRequester(req)
  const q = listQuerySchema.parse(req.query)
  const result = await listTeamMonthlyReports({ role, teamId, departmentId, ...q })
  res.json(result)
}

export async function handleDetailTeamMonthly(req: Request, res: Response) {
  const { role, teamId, departmentId } = getRequester(req)
  const id = requireId(req)
  const report = await getTeamMonthlyReport(id, { role, teamId, departmentId })
  res.json(report)
}

export async function handleExportTeamMonthly(req: Request, res: Response) {
  const { role, teamId, departmentId } = getRequester(req)
  const id = requireId(req)
  const { buffer, filename } = await exportTeamMonthlyReportExcel(id, { role, teamId, departmentId })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`)
  res.send(buffer)
}

// ─────────────────────────────────────────
// 부서 월말 보고서
// ─────────────────────────────────────────

export async function handleListDeptMonthly(req: Request, res: Response) {
  const { role, departmentId } = getRequester(req)
  const q = listQuerySchema.parse(req.query)
  const result = await listDeptMonthlyReports({ role, departmentId, ...q })
  res.json(result)
}

export async function handleDetailDeptMonthly(req: Request, res: Response) {
  const { role, departmentId } = getRequester(req)
  const id = requireId(req)
  const report = await getDeptMonthlyReport(id, { role, departmentId })
  res.json(report)
}

export async function handleExportDeptMonthly(req: Request, res: Response) {
  const { role, departmentId } = getRequester(req)
  const id = requireId(req)
  const { buffer, filename } = await exportDeptMonthlyReportExcel(id, { role, departmentId })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`)
  res.send(buffer)
}

// ─────────────────────────────────────────
// 팀 연말 보고서 export
// ─────────────────────────────────────────

export async function handleExportTeamAnnual(req: Request, res: Response) {
  const { role, teamId, departmentId } = getRequester(req)
  const id = requireId(req)
  const { buffer, filename } = await exportTeamAnnualReportExcel(id, { role, teamId, departmentId })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`)
  res.send(buffer)
}

// ─────────────────────────────────────────
// 부서 연말 보고서 export
// ─────────────────────────────────────────

export async function handleExportDeptAnnual(req: Request, res: Response) {
  const { role, departmentId } = getRequester(req)
  const id = requireId(req)
  const { buffer, filename } = await exportDeptAnnualReportExcel(id, { role, departmentId })

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`)
  res.send(buffer)
}

// ─────────────────────────────────────────
// 상태 전이 — TeamMonthlyReport
// ─────────────────────────────────────────

const submitBodySchema = z.object({
  comment: z.string().max(500).optional(),
})

const reviewBodySchema = z.object({
  comment: z.string().max(500).optional(),
})

const rejectBodySchema = z.object({
  reason: z.string().min(1).max(500),
})

export async function handleSubmitTeamMonthly(req: Request, res: Response) {
  const requester = getRequester(req)
  const id = requireId(req)
  const body = submitBodySchema.parse(req.body)
  const result = await submitTeamReport(id, requester, body)
  res.json(result)
}

export async function handleReviewTeamMonthly(req: Request, res: Response) {
  const requester = getRequester(req)
  const id = requireId(req)
  const body = reviewBodySchema.parse(req.body)
  const result = await reviewTeamReport(id, requester, body)
  res.json(result)
}

export async function handleRejectTeamMonthly(req: Request, res: Response) {
  const requester = getRequester(req)
  const id = requireId(req)
  const body = rejectBodySchema.parse(req.body)
  const result = await rejectTeamReport(id, requester, body)
  res.json(result)
}

// ─────────────────────────────────────────
// 상태 전이 — DeptMonthlyReport
// ─────────────────────────────────────────

export async function handleFinalizeDeptMonthly(req: Request, res: Response) {
  const requester = getRequester(req)
  const id = requireId(req)
  const result = await finalizeDeptReport(id, requester)
  res.json(result)
}
