import type { Request, Response, NextFunction } from 'express'
import type { Role } from '../generated/prisma/enums'

export const authorize =
  (...roles: Role[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: '인증이 필요합니다.' })
      return
    }
    if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: '권한이 없습니다.' })
      return
    }
    next()
  }
