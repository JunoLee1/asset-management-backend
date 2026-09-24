# Redis Phase 1 — 분산 Rate Limit Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `writeRateLimit`와 로그인 progressive limiter를 in-memory `Map`에서 Redis(Upstash) 기반 카운터로 이관해 다중 Cloud Run 인스턴스에서 rate limit이 우회되지 않도록 한다.

**Architecture:** ioredis 싱글톤을 통해 Upstash Redis에 연결. `INCR key` + `EXPIRE key ttl NX` 원자적 조합으로 rate limit 카운터 관리. Redis 실패 시 fail-open (요청 통과 + 경고 로그).

**Tech Stack:** ioredis, TypeScript, Express, Jest

---

## File Map

| 파일 | 변경 |
|---|---|
| `package.json` | `ioredis` 의존성 추가 |
| `src/lib/redis.ts` | 신규 — ioredis 싱글톤 클라이언트 |
| `src/middlewares/writeRateLimit.ts` | in-memory `Map` → Redis `INCR`+`EXPIRE` |
| `src/modules/auth/auth.router.ts` | progressive limiter `attempts` Map → Redis |
| `src/middlewares/__tests__/writeRateLimit.test.ts` | 신규 — 단위 테스트 |
| `.env.example` | `REDIS_URL` 예시 추가 |

---

### Task 1: ioredis 설치 + Redis 싱글톤 유틸

**Files:**
- Modify: `package.json`
- Create: `src/lib/redis.ts`
- Modify: `.env.example`

- [ ] **Step 1: ioredis 설치**

```bash
cd /Users/juno/asset-erp-backend
npm install ioredis
```

Expected: `ioredis`가 `package.json`의 `dependencies`에 추가됨.

- [ ] **Step 2: `.env.example`에 REDIS_URL 예시 추가**

`.env.example` 끝에 다음 두 줄 추가:

```
# Upstash Redis TLS URL (형식: rediss://default:<token>@<host>:<port>)
REDIS_URL=
```

- [ ] **Step 3: Redis 싱글톤 유틸 작성**

`src/lib/redis.ts` 생성:

```ts
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
```

- [ ] **Step 4: TypeScript 컴파일 확인**

```bash
cd /Users/juno/asset-erp-backend
npx tsc --noEmit
```

Expected: 에러 출력 없음.

- [ ] **Step 5: 커밋**

```bash
git add package.json package-lock.json src/lib/redis.ts .env.example
git commit -m "feat/redis: ioredis 설치 + 싱글톤 클라이언트 유틸 추가"
```

---

### Task 2: writeRateLimit 미들웨어를 Redis 기반으로 교체

**Files:**
- Modify: `src/middlewares/writeRateLimit.ts`
- Create: `src/middlewares/__tests__/writeRateLimit.test.ts`

- [ ] **Step 1: 단위 테스트 작성 (실패해야 함)**

`src/middlewares/__tests__/writeRateLimit.test.ts` 생성:

```ts
import type { Request, Response, NextFunction } from 'express'

// Redis mock: 카운터 저장소
const counters = new Map<string, number>()
const expiries = new Map<string, number>()

const mockRedis = {
  incr: jest.fn(async (key: string) => {
    const v = (counters.get(key) ?? 0) + 1
    counters.set(key, v)
    return v
  }),
  expire: jest.fn(async (key: string, seconds: number) => {
    expiries.set(key, seconds)
    return 1
  }),
  del: jest.fn(async (key: string) => {
    counters.delete(key)
    expiries.delete(key)
    return 1
  }),
}

jest.mock('../../lib/redis', () => ({
  getRedis: jest.fn(() => mockRedis),
}))

jest.mock('../../lib/requestHelpers', () => ({
  getRequester: jest.fn((req: Request) => {
    const auth = (req.headers.authorization ?? '') as string
    if (auth === 'user') return { id: 'user-1', role: 'ADMIN' }
    throw new Error('no auth')
  }),
}))

import { masterWriteRateLimit } from '../writeRateLimit'

const makeReq = (): Partial<Request> => ({
  headers: { authorization: 'user' },
  ip: '127.0.0.1',
})

const makeRes = (): { status: jest.Mock; json: jest.Mock } => {
  const res: { status: jest.Mock; json: jest.Mock } = { status: jest.fn(), json: jest.fn() }
  res.status.mockReturnValue(res)
  res.json.mockReturnValue(res)
  return res
}

beforeEach(() => {
  counters.clear()
  expiries.clear()
  mockRedis.incr.mockClear()
  mockRedis.expire.mockClear()
  process.env['NODE_ENV'] = 'production'
})

describe('masterWriteRateLimit (Redis)', () => {
  it('limit 이내면 next() 호출', async () => {
    const req = makeReq() as Request
    const res = makeRes() as unknown as Response
    const next = jest.fn() as NextFunction
    await masterWriteRateLimit(req, res, next)
    expect(next).toHaveBeenCalled()
    expect(mockRedis.incr).toHaveBeenCalledWith('ratelimit:master-write:user-1')
  })

  it('limit 초과 시 429 반환', async () => {
    const req = makeReq() as Request
    const res = makeRes() as unknown as Response
    const next = jest.fn() as NextFunction
    counters.set('ratelimit:master-write:user-1', 20)
    await masterWriteRateLimit(req, res, next)
    expect(res.status).toHaveBeenCalledWith(429)
    expect(next).not.toHaveBeenCalled()
  })

  it('첫 요청 시 EXPIRE 호출', async () => {
    const req = makeReq() as Request
    const res = makeRes() as unknown as Response
    const next = jest.fn() as NextFunction
    await masterWriteRateLimit(req, res, next)
    expect(mockRedis.expire).toHaveBeenCalledWith(
      'ratelimit:master-write:user-1',
      5 * 60,
    )
  })
})
```

- [ ] **Step 2: 테스트 실행 (실패 확인)**

```bash
cd /Users/juno/asset-erp-backend
npx jest src/middlewares/__tests__/writeRateLimit.test.ts 2>&1 | tail -10
```

Expected: FAIL — 아직 Redis 기반 구현이 없어서 실패.

- [ ] **Step 3: `writeRateLimit.ts`를 Redis 기반으로 재작성**

`src/middlewares/writeRateLimit.ts` 전체를 다음으로 교체:

```ts
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

const isDev = process.env['NODE_ENV'] !== 'production'
const DEV_MULT = 100 // dev 환경에서는 max × 100 허용

const makeLimiter = (opts: WriteLimitOptions) => {
  const limit = isDev ? opts.max * DEV_MULT : opts.max
  const ttlSec = Math.ceil(opts.windowMs / 1000)
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
cd /Users/juno/asset-erp-backend
npx jest src/middlewares/__tests__/writeRateLimit.test.ts 2>&1 | tail -10
```

Expected: PASS — 3 tests passed.

- [ ] **Step 5: TypeScript 컴파일 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -10
```

Expected: 출력 없음.

- [ ] **Step 6: 커밋**

```bash
git add src/middlewares/writeRateLimit.ts src/middlewares/__tests__/writeRateLimit.test.ts
git commit -m "feat/redis: writeRateLimit을 Redis 기반 분산 카운터로 이관"
```

---

### Task 3: 로그인 progressive limiter를 Redis 기반으로 이관

**Files:**
- Modify: `src/modules/auth/auth.router.ts`

- [ ] **Step 1: 현재 progressiveLoginLimiter 구현 확인**

파일 `src/modules/auth/auth.router.ts` 라인 17~52를 읽어 현재 in-memory 로직을 파악한다.

- [ ] **Step 2: Redis 기반으로 재작성**

`src/modules/auth/auth.router.ts`에서 `interface AttemptRecord`, `const attempts`, `const progressiveLoginLimiter` 블록을 다음으로 교체:

```ts
import { getRedis } from '../../lib/redis'

// 단계별 잠금: 5회→10분, 10회→30분, 15회→1시간, 20회→24시간
// windowMs가 큰 순서로 정렬 (긴 잠금이 우선 검사되어야 함)
const TIERS = [
  { limit: 20, windowMs: 24 * 60 * 60 * 1000, message: '로그인이 차단됐습니다. 24시간 후 다시 시도해주세요.' },
  { limit: 15, windowMs: 60 * 60 * 1000,       message: '로그인 시도가 너무 많습니다. 1시간 후 다시 시도해주세요.' },
  { limit: 10, windowMs: 30 * 60 * 1000,       message: '로그인 시도가 너무 많습니다. 30분 후 다시 시도해주세요.' },
  { limit:  5, windowMs: 10 * 60 * 1000,       message: '로그인 시도가 너무 많습니다. 10분 후 다시 시도해주세요.' },
]

const progressiveLoginLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (process.env['NODE_ENV'] !== 'production') {
    next()
    return
  }
  const ip = req.ip ?? 'unknown'
  const redis = getRedis()
  if (!redis) {
    next()
    return
  }
  try {
    // 각 tier별 카운터를 개별 키로 관리 (windowMs가 서로 달라 하나의 카운터로는 불가)
    for (const tier of TIERS) {
      const key = `ratelimit:login:tier${tier.limit}:${ip}`
      const count = await redis.incr(key)
      if (count === 1) await redis.expire(key, Math.ceil(tier.windowMs / 1000))
      if (count > tier.limit) {
        res.status(429).json({ message: tier.message })
        return
      }
    }
    next()
  } catch (err) {
    // 로그인은 서비스 가용성이 최우선이므로 fail-open
    next()
  }
}
```

기존 `interface AttemptRecord`와 `const attempts = new Map<...>()`는 완전히 제거한다.

- [ ] **Step 3: `Request`, `Response`, `NextFunction` import 유지 확인**

파일 상단 `import { Router, Request, Response, NextFunction } from 'express'`가 그대로 있는지 확인. 이미 있으므로 추가 작업 없음.

- [ ] **Step 4: TypeScript 컴파일 확인**

```bash
cd /Users/juno/asset-erp-backend
npx tsc --noEmit 2>&1 | grep -v node_modules | head -10
```

Expected: 출력 없음.

- [ ] **Step 5: 커밋**

```bash
git add src/modules/auth/auth.router.ts
git commit -m "feat/redis: 로그인 progressive limiter를 Redis 기반으로 이관"
```

---

### Task 4: 로컬 통합 검증

**Files:** 없음 (검증 단계)

- [ ] **Step 1: 로컬 Docker Redis 기동 (Upstash 대체)**

```bash
docker run -d --name asset-erp-redis -p 6379:6379 redis:7-alpine
```

Expected: 컨테이너 실행됨.

- [ ] **Step 2: `.env`에 로컬 Redis URL 설정**

`.env` 파일에 다음 추가 (기존 REDIS_URL이 있으면 교체):

```
REDIS_URL=redis://localhost:6379
```

- [ ] **Step 3: production 모드로 서버 재시작**

```bash
kill $(lsof -ti:8080) 2>/dev/null; sleep 1
NODE_ENV=production MAILGUN_WEBHOOK_SIGNING_KEY="test-key" npm run dev > /tmp/erp-server.log 2>&1 &
sleep 6 && tail -5 /tmp/erp-server.log
```

Expected: 서버 기동 + `[redis] connected` 로그 확인.

- [ ] **Step 4: 관리 CUD Rate Limit 검증**

```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin-1@verify.local","password":"test1234!"}' | jq -r '.tokens.accessToken')

CREATED=0
BLOCKED=0
for i in $(seq 1 30); do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/manufacturers \
    -H "Authorization: Bearer $ADMIN_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"redis-rl-test-$i-$(date +%s%N)\"}")
  [ "$STATUS" = "201" ] && CREATED=$((CREATED+1))
  [ "$STATUS" = "429" ] && BLOCKED=$((BLOCKED+1))
done
echo "생성 성공: $CREATED / 429 차단: $BLOCKED"
```

Expected: `생성 성공: 20 / 429 차단: 10`

- [ ] **Step 5: Redis 카운터 직접 확인**

```bash
docker exec asset-erp-redis redis-cli KEYS 'ratelimit:*'
```

Expected: `ratelimit:master-write:cmr4bt65p003nkqqoqcltt52k` 같은 키가 목록에 있음.

- [ ] **Step 6: Fail-open 동작 확인 (Redis 강제 중지)**

```bash
docker stop asset-erp-redis
sleep 2
# 요청 발송 — Redis 다운이지만 통과해야 함
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:8080/manufacturers \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"failopen-test-$(date +%s)\"}"

# 로그에서 fail-open 경고 확인
sleep 1
tail -20 /tmp/erp-server.log | grep -E "rate-limit|redis"
```

Expected: HTTP 201 반환 + 로그에 `[rate-limit] redis error — fail-open` 경고.

- [ ] **Step 7: Redis 복구 후 정상 동작 재확인**

```bash
docker start asset-erp-redis
sleep 3
# 새 카운터로 시작하는지 확인 (이전 카운터는 유지되었음)
docker exec asset-erp-redis redis-cli GET 'ratelimit:master-write:cmr4bt65p003nkqqoqcltt52k'
```

Expected: 이전 값이 유지되어 있거나 TTL 만료되어 nil.

- [ ] **Step 8: 로그인 Rate Limit 검증**

```bash
# 잘못된 비밀번호로 25회 시도
CODES=""
for i in $(seq 1 25); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"x@x.com","password":"x"}')
  CODES="$CODES $CODE"
done
echo "$CODES"
```

Expected: 처음 5회는 400, 이후 429가 나오기 시작하고 계속 429가 반복.

- [ ] **Step 9: dev 모드 복원**

```bash
kill $(lsof -ti:8080) 2>/dev/null; sleep 1
npm run dev > /tmp/erp-server.log 2>&1 &
sleep 6 && echo "dev 복원"
```

Expected: `Server listening on port 8080 [development]`.

- [ ] **Step 10: Docker Redis 컨테이너 정리 (필요 시 유지)**

로컬 개발용으로 계속 쓸 거면 유지. 정리하려면:
```bash
docker stop asset-erp-redis && docker rm asset-erp-redis
```

---

## 자기검토 (Self-Review)

**스펙 커버리지:**
- ✅ `src/lib/redis.ts` 싱글톤 → Task 1
- ✅ `writeRateLimit`을 Redis `INCR`/`EXPIRE` 기반으로 이관 → Task 2
- ✅ 로그인 progressive limiter를 Redis로 이관 → Task 3
- ✅ Redis 미설정/실패 시 fail-open → Task 1 (`getRedis` 반환 null 처리), Task 2/3 (try-catch)
- ✅ 다중 인스턴스에서 정확한 동작 → 원자적 `INCR` + `EXPIRE NX` (첫 요청 시에만 만료 설정)
- ✅ dev 환경에서 완화 → Task 2에서 `DEV_MULT = 100`

**타입 일관성:**
- `WriteLimitOptions` interface는 Task 2에서 정의, 다른 파일에서 참조 안 함
- `TIERS`, `progressiveLoginLimiter`는 Task 3에서만 사용
- `getRedis(): Redis | null` 시그니처가 Task 1에서 정의되고 Task 2/3에서 일관되게 사용됨

**Placeholder 없음:** 모든 코드 블록이 완전한 구현 포함.
