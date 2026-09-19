import type { Request, Response } from 'express'
import { dashboardService } from './dashboard.service'

const getDashboard = async (req: Request, res: Response): Promise<void> => {
  const data = await dashboardService.getDashboard(req.user!)
  res.json(data)
}

export const dashboardController = { getDashboard }
