import type { Request, Response, NextFunction } from 'express'
import type { ZodSchema, ZodIssue } from 'zod'

const formatErrors = (issues: ZodIssue[]) =>
  issues.map((e) => ({ field: e.path.join('.'), message: e.message }))

export const validateBody =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({
        message: '입력값이 올바르지 않습니다.',
        errors: formatErrors(result.error.issues),
      })
      return
    }
    req.body = result.data
    next()
  }

export const validateQuery =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.query)
    if (!result.success) {
      res.status(400).json({
        message: '쿼리 파라미터가 올바르지 않습니다.',
        errors: formatErrors(result.error.issues),
      })
      return
    }
    // Express 5+ / Node 22+ 에서 req.query 는 getter-only 라 직접 할당 불가
    // (TypeError: Cannot set property query of #<IncomingMessage> which has only a getter).
    // controller 는 schema.parse(req.query) 로 다시 parse 하므로 mutation 불필요.
    next()
  }
