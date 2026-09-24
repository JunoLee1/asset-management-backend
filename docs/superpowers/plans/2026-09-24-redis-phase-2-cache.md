# Redis Phase 2 — 응답 캐싱 (Dashboard + Analytics) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 무거운 집계 쿼리를 반환하는 Dashboard(TTL 30초)와 Analytics(TTL 5분) 엔드포인트에 Redis 기반 응답 캐싱을 도입해 DB 왕복을 줄인다.

**Architecture:** 범용 `withCache(key, ttl, fn)` 헬퍼로 캐시 hit 시 Redis 값 반환, miss 시 원본 함수 실행 후 캐시 저장. Redis 미설정/실패 시 fallback으로 DB 직접 조회. TTL 기반 passive invalidation.

**Tech Stack:** ioredis (Phase 1 도입 완료), TypeScript, Express, Jest

---

## File Map

| 파일 | 변경 |
|---|---|
| `src/lib/cache.ts` | 신규 — `withCache` 헬퍼 |
| `src/lib/__tests__/cache.test.ts` | 신규 — 단위 테스트 |
| `src/modules/dashboard/dashboard.service.ts` | `getDashboard`에 `withCache` 적용 (TTL 30초) |
| `src/modules/analytics/analytics.service.ts` | 6개 함수에 `withCache` 적용 (TTL 5분) |

---

### Task 1: withCache 헬퍼 + 단위 테스트

**Files:**
- Create: `src/lib/cache.ts`
- Create: `src/lib/__tests__/cache.test.ts`

- [ ] **Step 1: 실패하는 테스트 작성**

`src/lib/__tests__/cache.test.ts`:

```ts
// Redis mock
const store = new Map<string, string>()

const mockRedis = {
  get: jest.fn(async (key: string) => store.get(key) ?? null),
  set: jest.fn(async (key: string, value: string, _mode: string, _ttl: number) => {
    store.set(key, value)
    return 'OK'
  }),
}

jest.mock('../redis', () => ({
  getRedis: jest.fn(() => mockRedis),
}))

import { withCache } from '../cache'

beforeEach(() => {
  store.clear()
  mockRedis.get.mockClear()
  mockRedis.set.mockClear()
})

describe('withCache', () => {
  it('cache miss 시 원본 함수 실행 + 결과 저장', async () => {
    const fn = jest.fn(async () => ({ v: 1 }))
    const result = await withCache('test:key1', 30, fn)
    expect(result).toEqual({ v: 1 })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(mockRedis.set).toHaveBeenCalledWith(
      'test:key1',
      JSON.stringify({ v: 1 }),
      'EX',
      30,
    )
  })

  it('cache hit 시 원본 함수 미실행', async () => {
    store.set('test:key2', JSON.stringify({ v: 2 }))
    const fn = jest.fn(async () => ({ v: 999 }))
    const result = await withCache('test:key2', 30, fn)
    expect(result).toEqual({ v: 2 })
    expect(fn).not.toHaveBeenCalled()
  })

  it('Redis 실패 시 원본 함수 fallback', async () => {
    mockRedis.get.mockRejectedValueOnce(new Error('redis down'))
    const fn = jest.fn(async () => ({ v: 3 }))
    const result = await withCache('test:key3', 30, fn)
    expect(result).toEqual({ v: 3 })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('withCache — Redis null', () => {
  beforeEach(() => {
    // getRedis returns null
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../redis').getRedis.mockReturnValueOnce(null)
  })

  it('Redis 미설정 시 원본 함수 실행', async () => {
    const fn = jest.fn(async () => ({ v: 4 }))
    const result = await withCache('test:key4', 30, fn)
    expect(result).toEqual({ v: 4 })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
```

- [ ] **Step 2: 테스트 실행 (실패 확인)**

```bash
cd /Users/juno/asset-erp-backend
npx jest src/lib/__tests__/cache.test.ts 2>&1 | tail -10
```

Expected: FAIL — `withCache` 미존재.

- [ ] **Step 3: `src/lib/cache.ts` 작성**

```ts
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
```

- [ ] **Step 4: 테스트 통과 확인**

```bash
npx jest src/lib/__tests__/cache.test.ts 2>&1 | tail -10
```

Expected: PASS (4 tests).

- [ ] **Step 5: TypeScript 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -5
```

Expected: 출력 없음.

- [ ] **Step 6: 커밋**

```bash
git add src/lib/cache.ts src/lib/__tests__/cache.test.ts
git commit -m "feat/redis: withCache 헬퍼 추가 (fail-open 캐싱)"
```

---

### Task 2: Dashboard 캐싱 적용 (TTL 30초)

**Files:**
- Modify: `src/modules/dashboard/dashboard.service.ts`

- [ ] **Step 1: 현재 코드 파악**

```bash
grep -n "getDashboard\|export" /Users/juno/asset-erp-backend/src/modules/dashboard/dashboard.service.ts | head -5
```

- [ ] **Step 2: `getDashboard` 함수를 withCache로 감싸기**

`src/modules/dashboard/dashboard.service.ts` 파일의 `const getDashboard = async ...` 블록 상단에 import 추가:

```ts
import { withCache } from '../../lib/cache'
```

기존 함수:
```ts
const getDashboard = async (requester: { id: string; role: string }): Promise<DashboardData> => {
  // ... 기존 구현 ...
}
```

를 다음으로 변경 (기존 구현을 내부 `run` 함수로 감싸고 withCache 호출):

```ts
const getDashboard = async (requester: { id: string; role: string }): Promise<DashboardData> => {
  const cacheKey = `cache:dashboard:role:${requester.role}:user:${requester.id}`
  return withCache(cacheKey, 30, async () => {
    // ... 기존 구현 그대로 이 안으로 이동 ...
  })
}
```

**중요:** 기존 함수 본문(모든 prisma 쿼리, 리턴 값 계산)을 `withCache` 콜백 안으로 그대로 이동. 함수 시그니처와 반환 타입은 변경하지 않는다.

- [ ] **Step 3: TypeScript 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -5
```

Expected: 출력 없음.

- [ ] **Step 4: 기존 대시보드 테스트 통과 확인**

```bash
npx jest src/modules/dashboard/ 2>&1 | tail -5
```

Expected: 기존 테스트가 있다면 통과, 없다면 스킵. 회귀 에러 없어야 함.

- [ ] **Step 5: 커밋**

```bash
git add src/modules/dashboard/dashboard.service.ts
git commit -m "feat/redis: /dashboard 응답 캐싱 (TTL 30초, 역할·유저별 키)"
```

---

### Task 3: Analytics 6개 함수 캐싱 (TTL 5분)

**Files:**
- Modify: `src/modules/analytics/analytics.service.ts`

- [ ] **Step 1: 현재 함수 시그니처 확인**

```bash
grep -n "^const get\|^export" /Users/juno/asset-erp-backend/src/modules/analytics/analytics.service.ts
```

Expected: 다음 6개 함수 확인
- `getDistribution()`
- `getUtilization()`
- `getUtilizationByDepartment(cls)`
- `getDepartmentValue()`
- `getMaintenanceCost(from?, to?)`
- `getComplianceExpiry()`

- [ ] **Step 2: import 추가 + 6개 함수를 withCache로 래핑**

파일 상단에 추가:

```ts
import { withCache } from '../../lib/cache'
```

각 함수를 다음 패턴으로 변경. 예시(`getDistribution`):

**Before:**
```ts
const getDistribution = async (): Promise<DistributionData> => {
  // ... 원본 구현 ...
}
```

**After:**
```ts
const getDistribution = async (): Promise<DistributionData> => {
  return withCache('cache:analytics:distribution', 5 * 60, async () => {
    // ... 원본 구현 그대로 이동 ...
  })
}
```

각 함수별 캐시 키:
| 함수 | 캐시 키 |
|---|---|
| `getDistribution` | `cache:analytics:distribution` |
| `getUtilization` | `cache:analytics:utilization` |
| `getUtilizationByDepartment(cls)` | `cache:analytics:utilization-by-department:${cls ?? 'all'}` |
| `getDepartmentValue` | `cache:analytics:value-by-department` |
| `getMaintenanceCost(from, to)` | `cache:analytics:maintenance-cost:${from ?? 'all'}:${to ?? 'all'}` |
| `getComplianceExpiry` | `cache:analytics:compliance-expiry` |

**중요:**
- 파라미터 있는 함수(`getUtilizationByDepartment`, `getMaintenanceCost`)는 파라미터를 키에 포함
- TTL 값은 5 * 60 = 300초로 통일
- 기존 함수 시그니처와 리턴 타입은 변경하지 않음
- 함수 본문 전체를 `withCache` 콜백 안으로 이동

- [ ] **Step 3: TypeScript 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -5
```

Expected: 출력 없음.

- [ ] **Step 4: 기존 analytics 테스트 통과 확인**

```bash
npx jest src/modules/analytics/ 2>&1 | tail -5
```

Expected: 통과 (테스트 없다면 스킵).

- [ ] **Step 5: 커밋**

```bash
git add src/modules/analytics/analytics.service.ts
git commit -m "feat/redis: /analytics/* 응답 캐싱 (TTL 5분)"
```

---

### Task 4: 로컬 통합 검증

**Files:** 없음 (검증 단계)

- [ ] **Step 1: 로컬 Redis 컨테이너 기동**

```bash
docker run -d --name asset-erp-redis-cache -p 6379:6379 redis:7-alpine 2>&1 || \
  docker start asset-erp-redis-cache
sleep 2
```

- [ ] **Step 2: `.env`에 REDIS_URL 설정**

```bash
grep -v "^REDIS_URL=" /Users/juno/asset-erp-backend/.env > /tmp/env-new
echo "REDIS_URL=redis://localhost:6379" >> /tmp/env-new
mv /tmp/env-new /Users/juno/asset-erp-backend/.env
```

- [ ] **Step 3: 서버 재기동 + Redis 연결 확인**

```bash
kill $(lsof -ti:8080) 2>/dev/null; sleep 2
cd /Users/juno/asset-erp-backend
npm run dev > /tmp/erp-cache.log 2>&1 &
sleep 6
tail -10 /tmp/erp-cache.log | grep -E "redis|Server"
```

Expected: `Server listening on port 8080` + Redis 연결 로그.

- [ ] **Step 4: Dashboard 캐시 검증 — 첫 요청 (miss) + 두 번째 요청 (hit)**

```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin-1@verify.local","password":"test1234!"}' | jq -r '.tokens.accessToken')

# 1st request - miss
echo "1st (miss):"
time curl -s http://localhost:8080/dashboard \
  -H "Authorization: Bearer $ADMIN_TOKEN" -o /dev/null

# 2nd request - hit
echo "2nd (hit):"
time curl -s http://localhost:8080/dashboard \
  -H "Authorization: Bearer $ADMIN_TOKEN" -o /dev/null

# Redis에서 키 확인
docker exec asset-erp-redis-cache redis-cli KEYS 'cache:dashboard:*'
docker exec asset-erp-redis-cache redis-cli TTL "cache:dashboard:role:ADMIN:user:cmr4bt65p003nkqqoqcltt52k"
```

Expected:
- 2nd 요청이 1st보다 빠름 (수백 ms → 수십 ms)
- Redis에 `cache:dashboard:role:ADMIN:user:...` 키 존재
- TTL 30 이하로 남음

- [ ] **Step 5: Analytics 캐시 검증**

```bash
# 1st - miss
echo "analytics/distribution 1st:"
time curl -s "http://localhost:8080/analytics/distribution" \
  -H "Authorization: Bearer $ADMIN_TOKEN" -o /dev/null

echo "analytics/distribution 2nd (hit):"
time curl -s "http://localhost:8080/analytics/distribution" \
  -H "Authorization: Bearer $ADMIN_TOKEN" -o /dev/null

docker exec asset-erp-redis-cache redis-cli KEYS 'cache:analytics:*'
```

Expected:
- 2nd 요청이 훨씬 빠름
- `cache:analytics:distribution` 등 여러 키 존재

- [ ] **Step 6: Fallback 검증 — Redis 중단**

```bash
docker stop asset-erp-redis-cache
sleep 3

STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/dashboard \
  -H "Authorization: Bearer $ADMIN_TOKEN")
echo "Redis 다운 시 응답: HTTP $STATUS"

# 로그에서 fallback 확인
grep -E "cache.*fallback|redis" /tmp/erp-cache.log | tail -3
```

Expected: HTTP 200 (정상 응답) + `[cache] fallback to origin` 경고.

- [ ] **Step 7: 정리**

```bash
kill $(lsof -ti:8080) 2>/dev/null || true
sleep 2

# .env에서 REDIS_URL 제거
grep -v "^REDIS_URL=" /Users/juno/asset-erp-backend/.env > /tmp/env-new
mv /tmp/env-new /Users/juno/asset-erp-backend/.env

# Redis 컨테이너 정리
docker stop asset-erp-redis-cache 2>/dev/null || true
docker rm asset-erp-redis-cache 2>/dev/null || true

# dev 재기동
npm run dev > /tmp/erp-cache.log 2>&1 &
sleep 6
echo "dev 복원 완료"
```

---

## 자기검토 (Self-Review)

**스펙 커버리지:**
- ✅ `withCache` 헬퍼 (fail-open, Redis 미설정/실패 시 fallback) → Task 1
- ✅ Dashboard 캐싱 (TTL 30초, 역할·유저별 키) → Task 2
- ✅ Analytics 6개 엔드포인트 캐싱 (TTL 5분) → Task 3
- ✅ 파라미터 있는 함수는 파라미터를 캐시 키에 포함 → Task 3 (getUtilizationByDepartment, getMaintenanceCost)
- ✅ TTL 기반 passive invalidation (write 시 명시적 invalidate 없음)

**타입 일관성:**
- `withCache<T>(key: string, ttlSec: number, fn: () => Promise<T>): Promise<T>` — 모든 서비스 함수의 리턴 타입 그대로 전달됨
- 기존 함수 시그니처 변경 없음 → 컨트롤러/라우터 수정 불필요

**Placeholder 없음:** 모든 코드 블록이 완전한 구현 포함.
