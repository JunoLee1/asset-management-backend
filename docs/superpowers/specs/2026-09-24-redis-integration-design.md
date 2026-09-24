# Redis 도입 설계 (2026-09-24)

Cloud Run 다중 인스턴스 환경에서 상태 공유·성능 개선·백그라운드 작업 처리를 위해 Redis(Upstash) 도입.

## 배경

### 현재 문제

1. **Rate Limit 우회 가능** — `writeRateLimit.ts`, 로그인 progressive limiter가 in-memory `Map` 기반. Cloud Run `maxScale: 10`이라 인스턴스마다 카운터가 분리 → 공격자가 여러 인스턴스로 분산 요청 시 제한 우회 가능.

2. **무거운 집계 쿼리 반복** — Dashboard, Analytics 엔드포인트가 매 요청마다 5+ 테이블을 집계. 동일 데이터에 대해 반복 DB 왕복 발생.

3. **Fire-and-forget 실패 추적 불가** — `sendMail(...).catch(...)` 패턴으로 이메일/SMS 발송 실패 시 재시도 로직 없음.

4. **스케줄러 중복 실행 위험** — `startScheduler`가 각 Cloud Run 인스턴스에서 실행되면 5개 cron이 인스턴스 개수만큼 중복 실행되어 **알림이 여러 번 발송**될 수 있음.

## 설계 원칙

- **Fail-Open** — Redis 장애 시 서비스 가용성 우선. Rate Limit / 캐시 모두 Redis 다운을 감지하면 로그 남기고 요청 통과 / DB 직접 조회.
- **점진적 도입** — 3개 Phase로 분리해 각각 별도 PR. 이전 Phase가 안정된 후 다음 진행.
- **기존 잘 동작하는 부분 유지** — DB `SELECT ... FOR UPDATE` 락은 그대로. 이미 검증된 race condition 방어 로직에 Redis를 끼워넣지 않음.

## 인프라

| 항목 | 선택 | 이유 |
|---|---|---|
| 호스팅 | Upstash Redis | Cloud Run 서버리스와 궁합, 초기 무료 티어, VPC 커넥터 불필요 |
| 클라이언트 라이브러리 | `ioredis` | BullMQ가 요구하는 TCP 프로토콜 지원, 셋 모두 한 클라이언트로 통일 |
| 환경변수 | `REDIS_URL` | Upstash 대시보드에서 제공하는 TLS 형식 (`rediss://...`) |

### 클라이언트 초기화 (`src/lib/redis.ts`)

싱글톤 ioredis 인스턴스:

```ts
import Redis from 'ioredis'
import { logger } from './logger'

let client: Redis | null = null

export function getRedis(): Redis | null {
  if (client) return client
  const url = process.env.REDIS_URL
  if (!url) {
    logger.warn('REDIS_URL not set — Redis features disabled')
    return null
  }
  client = new Redis(url, {
    maxRetriesPerRequest: 3,
    enableOfflineQueue: false,
  })
  client.on('error', (err) => logger.error({ err }, '[Redis] connection error'))
  return client
}
```

Fail-open: 호출자가 `null` 반환을 감지하고 fallback 처리.

## Phase 1 — 분산 Rate Limit

### 목표
`writeRateLimit`, 로그인 progressive limiter의 in-memory Map을 Redis로 이관하여 다중 인스턴스에서도 정확한 rate limit 동작.

### 변경

**`src/middlewares/writeRateLimit.ts`**
- `buckets: Map` 제거
- Redis `INCR key` + `EXPIRE key ttl NX` 조합으로 카운팅
- 키 형식: `ratelimit:{keyPrefix}:{userKey}`
- Redis null / 명령 실패 시 fail-open (요청 통과)

**`src/modules/auth/auth.router.ts` progressive limiter**
- `attempts: Map` 제거
- 각 tier마다 별도 Redis 카운터 (`login:tier5:ip:...`, `login:tier10:ip:...`, ...)
- Redis 다운 시 fail-open

### 검증
- 프로덕션 모드에서 관리 CUD 30건 연속 요청 → 20건 통과, 10건 429 차단 (기존과 동일)
- Redis 인스턴스 강제 중단 후 요청 → 로그 남기고 통과

## Phase 2 — 응답 캐싱 (Dashboard + Analytics)

### 목표
무거운 집계 쿼리 응답을 Redis에 캐싱하여 DB 왕복 감소.

### 변경

**`src/lib/cache.ts` — withCache 헬퍼**
```ts
export async function withCache<T>(
  key: string,
  ttlSec: number,
  fn: () => Promise<T>,
): Promise<T> {
  const r = getRedis()
  if (!r) return fn()
  try {
    const hit = await r.get(key)
    if (hit) return JSON.parse(hit) as T
    const value = await fn()
    await r.set(key, JSON.stringify(value), 'EX', ttlSec)
    return value
  } catch (err) {
    logger.warn({ err, key }, '[cache] fallback to DB')
    return fn()
  }
}
```

**적용 대상**

| 엔드포인트 | 키 | TTL |
|---|---|---|
| `GET /dashboard` | `cache:dashboard:role:{role}:user:{id}` | 30초 |
| `GET /analytics/distribution` | `cache:analytics:distribution` | 5분 |
| `GET /analytics/utilization` | `cache:analytics:utilization` | 5분 |
| `GET /analytics/utilization-by-department` | `cache:analytics:utilization-by-department` | 5분 |
| `GET /analytics/value-by-department` | `cache:analytics:value-by-department` | 5분 |
| `GET /analytics/maintenance-cost` | `cache:analytics:maintenance-cost` | 5분 |
| `GET /analytics/compliance-expiry` | `cache:analytics:compliance-expiry` | 5분 |

### 무효화 정책
- **TTL 기반 Passive Invalidation** — 저장 시 캐시 삭제 로직 없음
- 최대 TTL만큼의 stale 데이터 허용
- 명시적 무효화는 Phase 2 범위 밖 (필요 시 후속 작업)

### 검증
- 캐시 hit 시 DB 쿼리 발생 안 함 (pino 로그로 확인)
- 두 번째 요청 응답 시간 크게 단축
- Redis 다운 시 매 요청마다 DB 조회 (기존과 동일 동작)

## Phase 3 — BullMQ (Fire-and-forget + Cron)

### 목표
- 이메일/SMS 발송을 Redis 큐로 이관 → 실패 재시도, backpressure
- 스케줄러 5개 cron을 BullMQ Repeatable Jobs로 이관 → 다중 인스턴스에서 정확히 1번만 실행

### 아키텍처

**Queue 정의 (`src/lib/queues.ts`)**

| 큐 이름 | 잡 타입 | 재시도 정책 |
|---|---|---|
| `email` | `send` | 3회, exponential backoff (1s, 5s, 25s) |
| `sms` | `send` | 3회, exponential backoff |
| `scheduler` | `termination-check`, `outbox-process`, `overdue-check`, `compliance-check`, `license-expiry-check` | 1회, backoff 없음 (다음 스케줄 대기) |

**Worker 초기화 (`src/lib/workers.ts`)**
- Cloud Run 앱 프로세스와 같은 컨테이너에서 실행
- 프로세스 시작 시 Worker 등록 (5개 cron 잡 처리 + email/sms 처리)

### 변경

**`src/lib/scheduler.ts`**
- `node-cron` 사용 부분 제거
- BullMQ `Queue.add(jobName, data, { repeat: { cron: '0 9 * * *', tz: 'Asia/Seoul' } })` 로 등록
- jobId를 스케줄명으로 고정 (`termination-check`, `outbox-process` 등) → 다중 인스턴스에서도 큐에 1건만 등록됨

**Fire-and-forget 이관**
- `auth.service.ts` `sendMail(...).catch(...)` → `emailQueue.add('send', {to, subject, html})`
- `notification.service.ts` SMTP 발송 로직 → 큐로 이관
- `sms.service.ts` SMS 발송 → `smsQueue.add('send', {phoneNumber, message})`

### 검증
- Cloud Run 인스턴스 2개 이상 뜬 상태에서 스케줄러 시간 도달 시 로그를 확인 → 각 잡이 정확히 1번만 실행되는지
- 이메일 발송 시 큐에 잡 enqueue 로그 → Worker 로그로 처리 확인
- SMTP 실패 시 3회 재시도 로그 확인

## 롤아웃 순서

1. **Phase 1** 먼저 (분산 Rate Limit)
   - 가장 시급 (보안 이슈)
   - 변경 범위 작음
   - Redis 인프라 셋업 겸함
2. **Phase 2** (응답 캐싱)
   - 성능 임팩트 큼
   - 새 헬퍼 추가만, 기존 로직 손대지 않음
3. **Phase 3** (BullMQ)
   - 가장 큰 아키텍처 변경
   - 스케줄러 중복 실행 취약점 해결

각 Phase는 별도 PR/브랜치로 분리:
- `feat/redis-rate-limit` (Phase 1)
- `feat/redis-cache` (Phase 2)
- `feat/redis-bullmq` (Phase 3)

## 제외 사항

- ❌ **DB 락 → Redis 락 이관** — 트랜잭션 내부 락 이동 시 성능 이득 없고 리스크 증가
- ❌ **DB 기반 Outbox 이관** — 이미 잘 동작 중, BullMQ가 이 역할을 완전히 대체하지 않음 (트랜잭션 보장 차이)
- ❌ **별도 Redlock 라이브러리** — BullMQ jobId 중복 제거로 대부분 커버, 필요 시 후속 작업

## 리스크와 완화

| 리스크 | 완화 방법 |
|---|---|
| Redis 장애로 서비스 다운 | Fail-Open 원칙 — 캐시/rate limit 모두 Redis 실패 감지 시 fallback |
| Upstash → Cloud Run 지연 | 캐시는 대용량 응답 위주로 선정 → 네트워크 왕복보다 DB 왕복 감소가 커야 이득 |
| BullMQ Worker 프로세스 죽음 | Cloud Run이 컨테이너 재시작. 미완료 잡은 큐에 남아 있어 재개됨 |
| Redis 비용 폭증 | Upstash 요청당 과금 — Phase 2/3에서 대량 발생 예상. 무료 티어 초과 시 알림 설정 필요 |
| 캐시 stale 데이터 표시 | TTL 30초/5분으로 짧게 유지. 실시간성 필요 데이터는 캐싱 대상 제외 |

## 미해결·후속 작업

- 캐시 명시적 무효화 (write 시 관련 캐시 삭제) — 사용 패턴 관찰 후 결정
- BullMQ 잡 모니터링 UI (bull-board) — 프로덕션 진입 후 옵션
- Outbox → BullMQ 이관 여부 재검토 (Phase 3 안정화 후)

## 관련 문서

- `docs/TROUBLESHOOTING.md` — 항목 12(로그인 브루트포스), 17(관리 CUD Rate Limit)
- `docs/TODO_TEST.md` — 관련 도메인 테스트 상태
