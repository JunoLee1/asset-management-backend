import type { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: Express.User | false) => {
      if (err) return next(err)
      if (!user) {
        res.status(401).json({ message: '인증이 필요합니다.' })
        return
      }
      req.user = user
      next()
    },
  )(req, res, next)
}
