// Redis 기반 응답 캐싱 헬퍼.
// - cache hit → Redis에서 파싱해 반환
// - cache miss → 원본 함수 실행 → 결과를 캐시에 저장 (TTL 초 단위)
// - Redis 미설정/실패 → 원본 함수 실행 (fallback)

import { getRedis } from './redis'
import { logger } from './logger'

export async function withCache<T>(
  key: string,
  ttlSec: number,
  fn: () => Promise<T>,
): Promise<T> {
  const redis = getRedis()
  if (!redis) return fn()
  try {
    const hit = await redis.get(key)
    if (hit) return JSON.parse(hit) as T
    const value = await fn()
    // Redis 저장 실패는 응답에 영향 안 주도록 fire-and-forget (catch만)
    await redis.set(key, JSON.stringify(value), 'EX', ttlSec).catch((err) => {
      logger.warn({ err, key }, '[cache] set failed')
    })
    return value
  } catch (err) {
    logger.warn({ err, key }, '[cache] fallback to origin')
    return fn()
  }
}
