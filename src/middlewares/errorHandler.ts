import type { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../lib/AppError'
import { logger } from '../lib/logger'

const isDev = process.env['NODE_ENV'] !== 'production'

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }
  // zod schema validation 실패 — 표준 400 응답
  if (err instanceof ZodError) {
    res.status(400).json({
      message: '입력값이 올바르지 않습니다.',
      issues: err.issues.map((i) => ({
        path: i.path.join('.'),
        code: i.code,
        message: i.message,
      })),
    })
    return
  }
  // 모든 예상 외 에러는 로그 + dev 환경에서는 client 에 상세 포함
  logger.error({ err, path: req.path, method: req.method }, 'Unhandled error')
  if (isDev) {
    const e = err as Error & { code?: string; meta?: unknown }
    res.status(500).json({
      message: e?.message ?? '서버 내부 오류가 발생했습니다.',
      // prisma 에러는 code/meta 가 결정적 — 함께 노출
      code: e?.code,
      meta: e?.meta,
      stack: e?.stack?.split('\n').slice(0, 8),
    })
    return
  }
  res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' })
}
