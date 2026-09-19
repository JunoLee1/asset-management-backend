import type { Request, Response } from 'express'
import { analyticsService } from './analytics.service'
import { exportCsv, exportExcel, exportPdf, exportHwpx } from './analytics.export'

const getDistribution = async (_req: Request, res: Response): Promise<void> => {
  const data = await analyticsService.getDistribution()
  res.json(data)
}

const getUtilization = async (_req: Request, res: Response): Promise<void> => {
  const data = await analyticsService.getUtilization()
  res.json(data)
}

const getUtilizationByDepartment = async (req: Request, res: Response): Promise<void> => {
  const rawClass = req.query['class']
  const allowed = ['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET', 'NETWORK_ASSET'] as const
  type AllowedClass = (typeof allowed)[number]
  const cls =
    typeof rawClass === 'string' && (allowed as readonly string[]).includes(rawClass)
      ? (rawClass as AllowedClass)
      : undefined
  const data = await analyticsService.getUtilizationByDepartment(cls)
  res.json(data)
}

const getDepartmentValue = async (_req: Request, res: Response): Promise<void> => {
  const data = await analyticsService.getDepartmentValue()
  res.json(data)
}

const getMaintenanceCost = async (req: Request, res: Response): Promise<void> => {
  const { from, to } = req.query as { from?: string; to?: string }
  const data = await analyticsService.getMaintenanceCost(from, to)
  res.json(data)
}

const getComplianceExpiry = async (_req: Request, res: Response): Promise<void> => {
  const data = await analyticsService.getComplianceExpiry()
  res.json(data)
}

function buildExportCtx(req: Request) {
  const user = req.user!
  return {
    companyName: (process.env.COMPANY_NAME as string) || '자산관리 ERP',
    departmentName: (user as { departmentName?: string }).departmentName ?? '–',
    authorName: (user as { name?: string }).name ?? user.id,
    generatedAt: new Date().toLocaleString('ko-KR'),
  }
}

const exportAsCsv = async (req: Request, res: Response): Promise<void> => {
  const buf = await exportCsv(buildExportCtx(req))
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="analytics.csv"')
  res.send(buf)
}

const exportAsExcel = async (req: Request, res: Response): Promise<void> => {
  const buf = await exportExcel(buildExportCtx(req))
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  res.setHeader('Content-Disposition', 'attachment; filename="analytics.xlsx"')
  res.send(buf)
}

const exportAsPdf = async (req: Request, res: Response): Promise<void> => {
  const buf = await exportPdf(buildExportCtx(req))
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Content-Disposition', 'attachment; filename="analytics.pdf"')
  res.send(buf)
}

const exportAsHwpx = async (req: Request, res: Response): Promise<void> => {
  const buf = await exportHwpx(buildExportCtx(req))
  res.setHeader('Content-Type', 'application/hwpml+zip')
  res.setHeader('Content-Disposition', 'attachment; filename="analytics.hwpx"')
  res.send(buf)
}

export const analyticsController = {
  getDistribution,
  getUtilization,
  getUtilizationByDepartment,
  getDepartmentValue,
  getMaintenanceCost,
  getComplianceExpiry,
  exportAsCsv,
  exportAsExcel,
  exportAsPdf,
  exportAsHwpx,
}
