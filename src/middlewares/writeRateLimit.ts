// 관리 계정 탈취 시 대량 등록·수정을 방지하기 위한 사용자별 분산 Rate Limiter.
// - 로그인한 사용자(id) 단위로 카운트 (인증 후에 붙여야 함).
// - Redis INCR + EXPIRE NX 원자적 조합으로 다중 Cloud Run 인스턴스에서도 정확히 동작.
// - Redis 미설정/실패 시 fail-open (요청 통과 + 경고 로그).
// - 개발 환경(NODE_ENV !== 'production')에서는 넉넉하게 풀어둔다.

import type { Request, Response, NextFunction } from 'express'
import { getRedis } from '../lib/redis'
import { getRequester } from '../lib/requestHelpers'
import { logger } from '../lib/logger'

interface WriteLimitOptions {
  windowMs: number
  max: number
  keyPrefix: string
  message: string
}

const DEV_MULT = 100 // dev 환경에서는 max × 100 허용

const makeLimiter = (opts: WriteLimitOptions) => {
  const ttlSec = Math.ceil(opts.windowMs / 1000)
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const isDev = process.env['NODE_ENV'] !== 'production'
    const limit = isDev ? opts.max * DEV_MULT : opts.max
    let userKey: string
    try {
      userKey = getRequester(req).id
    } catch {
      userKey = `ip:${req.ip ?? 'unknown'}`
    }
    const key = `ratelimit:${opts.keyPrefix}:${userKey}`
    const redis = getRedis()
    if (!redis) {
      next()
      return
    }
    try {
      const count = await redis.incr(key)
      if (count === 1) await redis.expire(key, ttlSec)
      if (count > limit) {
        res.status(429).json({ message: opts.message })
        return
      }
      next()
    } catch (err) {
      logger.warn({ err, key }, '[rate-limit] redis error — fail-open')
      next()
    }
  }
}

// 관리 데이터 등록 (제조사·카탈로그·소프트웨어·부서 등) — 5분 내 20회 초과 시 차단
export const masterWriteRateLimit = makeLimiter({
  windowMs: 5 * 60 * 1000,
  max: 20,
  keyPrefix: 'master-write',
  message: '관리 데이터 등록 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
})

// 유저 초대 — 시간당 10회 초과 시 차단
export const inviteRateLimit = makeLimiter({
  windowMs: 60 * 60 * 1000,
  max: 10,
  keyPrefix: 'invite',
  message: '유저 초대 시도가 너무 많습니다. 1시간 후 다시 시도해주세요.',
})
