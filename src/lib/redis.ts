import Redis from 'ioredis'
import { logger } from './logger'

let client: Redis | null = null
let hasErroredThisTick = false

/**
 * Redis 클라이언트 싱글톤을 반환. REDIS_URL 미설정 또는 초기화 실패 시 `null` 반환.
 * 호출자는 반환값이 null이거나 명령 실행 실패 시 fallback(fail-open)을 구현해야 한다.
 */
export function getRedis(): Redis | null {
  if (client) return client
  const url = process.env['REDIS_URL']
  if (!url) {
    if (!hasErroredThisTick) {
      logger.warn('[redis] REDIS_URL not set — Redis-backed features disabled (fail-open)')
      hasErroredThisTick = true
    }
    return null
  }
  try {
    client = new Redis(url, {
      maxRetriesPerRequest: 3,
      enableOfflineQueue: false,
      lazyConnect: false,
    })
    client.on('error', (err) => logger.error({ err: err.message }, '[redis] connection error'))
    client.on('connect', () => logger.info('[redis] connected'))
    return client
  } catch (err) {
    logger.error({ err }, '[redis] failed to init client')
    return null
  }
}

/**
 * 테스트에서 싱글톤 리셋 용.
 */
export function _resetRedisForTests(): void {
  if (client) {
    void client.quit().catch(() => undefined)
  }
  client = null
  hasErroredThisTick = false
}
