# Redis Phase 3 — BullMQ (Fire-and-forget + Cron) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 이메일/SMS 발송을 BullMQ 큐로 이관해 실패 재시도·backpressure를 확보하고, node-cron 기반 스케줄러 5개를 BullMQ Repeatable Jobs로 이관해 다중 Cloud Run 인스턴스에서 정확히 1번만 실행되도록 한다.

**Architecture:** Phase 1에서 도입한 ioredis 연결을 재사용해 BullMQ Queue + Worker 초기화. 3개 큐(`email`, `sms`, `scheduler`)에 각각 Worker 등록. 재시도 정책은 exponential backoff. `startScheduler`에서 repeatable job 등록으로 대체하고 node-cron 제거.

**Tech Stack:** BullMQ 5.x, ioredis, TypeScript, Jest

---

## File Map

| 파일 | 변경 |
|---|---|
| `package.json` | `bullmq` 의존성 추가 |
| `src/lib/queues.ts` | 신규 — Queue/Worker 팩토리 |
| `src/lib/workers.ts` | 신규 — Worker 등록/시작/graceful shutdown |
| `src/lib/scheduler.ts` | node-cron → BullMQ Repeatable Jobs |
| `src/index.ts` | Worker 초기화 호출 추가 |
| `src/modules/admin/admin.service.ts` | `sendMail` 직접 호출 → `emailQueue.add` |
| `src/modules/admin/user.service.ts` | `sendMail` → `emailQueue.add` |
| `src/modules/auth/auth.service.ts` | `SmsService.sendSms` → `smsQueue.add` |
| `src/lib/__tests__/queues.test.ts` | 신규 — 단위 테스트 |

---

### Task 1: bullmq 설치 + Queue 팩토리

**Files:**
- Modify: `package.json`
- Create: `src/lib/queues.ts`

- [ ] **Step 1: bullmq 설치**

```bash
cd /Users/juno/asset-erp-backend
npm install bullmq
```

- [ ] **Step 2: `src/lib/queues.ts` 생성**

```ts
// BullMQ Queue 팩토리 — 3개 큐 정의:
//   - email: 이메일 발송 (재시도 3회, exponential backoff)
//   - sms: SMS 발송 (재시도 3회)
//   - scheduler: 5개 cron 잡 (재시도 없음, 다음 스케줄 대기)
//
// Redis 연결은 Phase 1의 getRedis() 대신 BullMQ 전용 별도 Connection 사용.
// BullMQ는 blocking 명령을 쓰므로 maxRetriesPerRequest: null / enableOfflineQueue: true 필요.

import { Queue, type QueueOptions } from 'bullmq'
import IORedis, { type Redis } from 'ioredis'
import { logger } from './logger'

export interface EmailJob {
  to: string
  subject: string
  html: string
}

export interface SmsJob {
  phoneNumber: string
  message: string
}

export type SchedulerJobName =
  | 'termination-check'
  | 'outbox-process'
  | 'overdue-check'
  | 'compliance-check'
  | 'license-expiry-check'

let connection: Redis | null = null
let emailQueue: Queue<EmailJob> | null = null
let smsQueue: Queue<SmsJob> | null = null
let schedulerQueue: Queue<Record<string, never>> | null = null

function getConnection(): Redis | null {
  if (connection) return connection
  const url = process.env['REDIS_URL']
  if (!url) {
    logger.warn('[bullmq] REDIS_URL not set — queues disabled (fire-and-forget fallback)')
    return null
  }
  connection = new IORedis(url, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: true,
  })
  connection.on('error', (err) => logger.error({ err: err.message }, '[bullmq] redis error'))
  return connection
}

const defaultJobOpts: QueueOptions['defaultJobOptions'] = {
  attempts: 3,
  backoff: { type: 'exponential', delay: 1000 },
  removeOnComplete: { age: 60 * 60, count: 1000 },
  removeOnFail: { age: 24 * 60 * 60 },
}

export function getEmailQueue(): Queue<EmailJob> | null {
  if (emailQueue) return emailQueue
  const conn = getConnection()
  if (!conn) return null
  emailQueue = new Queue<EmailJob>('email', {
    connection: conn,
    defaultJobOptions: defaultJobOpts,
  })
  return emailQueue
}

export function getSmsQueue(): Queue<SmsJob> | null {
  if (smsQueue) return smsQueue
  const conn = getConnection()
  if (!conn) return null
  smsQueue = new Queue<SmsJob>('sms', {
    connection: conn,
    defaultJobOptions: defaultJobOpts,
  })
  return smsQueue
}

export function getSchedulerQueue(): Queue<Record<string, never>> | null {
  if (schedulerQueue) return schedulerQueue
  const conn = getConnection()
  if (!conn) return null
  schedulerQueue = new Queue<Record<string, never>>('scheduler', {
    connection: conn,
    defaultJobOptions: {
      attempts: 1,
      removeOnComplete: { age: 24 * 60 * 60, count: 100 },
      removeOnFail: { age: 7 * 24 * 60 * 60 },
    },
  })
  return schedulerQueue
}

/** 테스트/종료 시 리셋용. */
export async function _closeQueuesForTests(): Promise<void> {
  await Promise.all([
    emailQueue?.close().catch(() => undefined),
    smsQueue?.close().catch(() => undefined),
    schedulerQueue?.close().catch(() => undefined),
  ])
  await connection?.quit().catch(() => undefined)
  emailQueue = null
  smsQueue = null
  schedulerQueue = null
  connection = null
}
```

- [ ] **Step 3: TypeScript 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -5
```

- [ ] **Step 4: 커밋**

```bash
git add package.json package-lock.json src/lib/queues.ts
git commit -m "feat/redis: bullmq 설치 + Queue 팩토리(email/sms/scheduler)"
```

---

### Task 2: Worker 등록 + Graceful Shutdown

**Files:**
- Create: `src/lib/workers.ts`
- Modify: `src/index.ts`

- [ ] **Step 1: `src/lib/workers.ts` 생성**

```ts
// BullMQ Worker 등록/시작/종료.
// - email: sendMail 호출
// - sms: SmsService.sendSms 호출
// - scheduler: 5개 cron 잡의 실제 작업 실행
//
// Redis 미설정 시 Worker 등록 스킵 (dev/test 편의).

import { Worker, type Job } from 'bullmq'
import IORedis, { type Redis } from 'ioredis'
import { logger } from './logger'
import type { EmailJob, SmsJob, SchedulerJobName } from './queues'
import { sendMail } from './mailer'
import { SmsService } from '../services/sms.service'
import { notificationService } from '../modules/notifications/notification.service'
import { loanService } from '../modules/loans/loan.service'

let emailWorker: Worker<EmailJob> | null = null
let smsWorker: Worker<SmsJob> | null = null
let schedulerWorker: Worker<Record<string, never>, unknown, SchedulerJobName> | null = null
let workerConnection: Redis | null = null

function getWorkerConnection(): Redis | null {
  if (workerConnection) return workerConnection
  const url = process.env['REDIS_URL']
  if (!url) return null
  workerConnection = new IORedis(url, {
    maxRetriesPerRequest: null,
    enableOfflineQueue: false,
  })
  workerConnection.on('error', (err) => logger.error({ err: err.message }, '[bullmq worker] redis error'))
  return workerConnection
}

export function startWorkers(): void {
  const conn = getWorkerConnection()
  if (!conn) {
    logger.warn('[bullmq worker] REDIS_URL not set — workers disabled')
    return
  }

  emailWorker = new Worker<EmailJob>(
    'email',
    async (job: Job<EmailJob>) => {
      await sendMail({ to: job.data.to, subject: job.data.subject, html: job.data.html })
    },
    { connection: conn, concurrency: 5 },
  )
  emailWorker.on('failed', (job, err) => {
    logger.warn({ jobId: job?.id, err: err.message, attempts: job?.attemptsMade }, '[bullmq email] failed')
  })

  smsWorker = new Worker<SmsJob>(
    'sms',
    async (job: Job<SmsJob>) => {
      const ok = await SmsService.sendSms(job.data.phoneNumber, job.data.message)
      if (!ok) throw new Error('SMS send returned false')
    },
    { connection: conn, concurrency: 3 },
  )
  smsWorker.on('failed', (job, err) => {
    logger.warn({ jobId: job?.id, err: err.message, attempts: job?.attemptsMade }, '[bullmq sms] failed')
  })

  schedulerWorker = new Worker<Record<string, never>, unknown, SchedulerJobName>(
    'scheduler',
    async (job) => {
      switch (job.name) {
        case 'termination-check':
          return notificationService.runTerminationCheck()
        case 'outbox-process':
          return notificationService.processOutbox()
        case 'overdue-check':
          return loanService.notifyOverdueLoans()
        case 'compliance-check':
          return notificationService.runComplianceCheck()
        case 'license-expiry-check':
          return notificationService.runLicenseExpiryCheck()
        default: {
          const _exhaustive: never = job.name
          return _exhaustive
        }
      }
    },
    { connection: conn, concurrency: 1 },
  )
  schedulerWorker.on('completed', (job, result) => {
    logger.info({ jobName: job.name, result }, '[bullmq scheduler] done')
  })
  schedulerWorker.on('failed', (job, err) => {
    logger.error({ jobName: job?.name, err: err.message }, '[bullmq scheduler] failed')
  })

  logger.info('[bullmq worker] started (email/sms/scheduler)')
}

/** SIGTERM/SIGINT 시 정상 종료. */
export async function stopWorkers(): Promise<void> {
  await Promise.all([
    emailWorker?.close().catch(() => undefined),
    smsWorker?.close().catch(() => undefined),
    schedulerWorker?.close().catch(() => undefined),
  ])
  await workerConnection?.quit().catch(() => undefined)
  emailWorker = null
  smsWorker = null
  schedulerWorker = null
  workerConnection = null
  logger.info('[bullmq worker] stopped')
}
```

- [ ] **Step 2: `src/index.ts` 수정 — Worker 시작 + shutdown hook**

`src/index.ts` 파악:
```bash
cat src/index.ts
```

기존 파일에서 `startScheduler` 호출 근처에 `startWorkers` 호출 추가. SIGTERM/SIGINT 핸들러가 있다면 `stopWorkers` 호출 추가. 없으면 `process.on('SIGTERM', ...)` 등록.

**정확한 수정 패턴:**

기존 import에 추가:
```ts
import { startWorkers, stopWorkers } from './lib/workers'
```

`startScheduler()` 호출 다음 줄에 추가:
```ts
startWorkers()
```

파일 하단에(또는 서버 리스닝 후) shutdown 핸들러 추가:
```ts
async function shutdown() {
  logger.info('[shutdown] received signal, stopping workers...')
  await stopWorkers()
  process.exit(0)
}
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
```

**주의:** 기존 SIGTERM/SIGINT 핸들러가 이미 있다면 그 안에 `await stopWorkers()`만 추가.

- [ ] **Step 3: TypeScript 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -10
```

- [ ] **Step 4: 커밋**

```bash
git add src/lib/workers.ts src/index.ts
git commit -m "feat/redis: BullMQ Worker 시작/정상종료 훅 추가"
```

---

### Task 3: 스케줄러를 BullMQ Repeatable Jobs로 이관

**Files:**
- Modify: `src/lib/scheduler.ts`

- [ ] **Step 1: `src/lib/scheduler.ts` 전체 교체**

```ts
// 스케줄러: BullMQ Repeatable Jobs로 5개 cron 잡을 등록.
// - jobId를 스케줄 이름으로 고정 → 다중 인스턴스에서 큐에 잡이 정확히 1건만 들어감.
// - Worker(별도 시작)가 실제 실행. 이 파일은 등록만 담당.
// - Redis 미설정 시 스킵.
//
// 기존 node-cron 대비 장점:
//   - 다중 Cloud Run 인스턴스에서 스케줄이 인스턴스 개수만큼 중복 실행되지 않음
//   - 잡 실패 시 로그·재시도 정책이 BullMQ 대시보드/로그에서 관찰 가능

import { logger } from './logger'
import { getSchedulerQueue, type SchedulerJobName } from './queues'

const TERMINATION_CRON = process.env['SCHEDULER_TERMINATION_CRON'] ?? '0 9 * * *'
const OUTBOX_CRON = process.env['SCHEDULER_OUTBOX_CRON'] ?? '*/5 * * * *'
const OVERDUE_CRON = process.env['SCHEDULER_OVERDUE_CRON'] ?? '0 10 * * *'
const COMPLIANCE_CRON = process.env['SCHEDULER_COMPLIANCE_CRON'] ?? '30 9 * * *'
const LICENSE_EXPIRY_CRON = process.env['SCHEDULER_LICENSE_EXPIRY_CRON'] ?? '0 8 * * *'
const TZ = process.env['SCHEDULER_TZ'] ?? 'Asia/Seoul'

interface ScheduleEntry {
  name: SchedulerJobName
  cron: string
}

const SCHEDULES: ScheduleEntry[] = [
  { name: 'termination-check', cron: TERMINATION_CRON },
  { name: 'outbox-process', cron: OUTBOX_CRON },
  { name: 'overdue-check', cron: OVERDUE_CRON },
  { name: 'compliance-check', cron: COMPLIANCE_CRON },
  { name: 'license-expiry-check', cron: LICENSE_EXPIRY_CRON },
]

export const startScheduler = async (): Promise<void> => {
  if (process.env['SCHEDULER_DISABLED'] === '1') {
    logger.info({ event: 'scheduler_disabled' }, 'SCHEDULER_DISABLED=1 — 스케줄러 비활성')
    return
  }

  const queue = getSchedulerQueue()
  if (!queue) {
    logger.warn('[scheduler] REDIS_URL not set — 스케줄러 비활성')
    return
  }

  for (const s of SCHEDULES) {
    await queue.add(
      s.name,
      {},
      {
        jobId: `repeatable:${s.name}`, // 동일 jobId → 다중 인스턴스에서 1건만 등록
        repeat: { pattern: s.cron, tz: TZ },
      },
    )
  }

  logger.info(
    {
      event: 'scheduler_started',
      schedules: SCHEDULES.map((s) => ({ name: s.name, cron: s.cron })),
      tz: TZ,
    },
    '[scheduler] BullMQ repeatable jobs registered',
  )
}
```

- [ ] **Step 2: `src/index.ts`의 `startScheduler()` 호출을 `await startScheduler()`로 변경**

async 함수가 됐으니 await 필요. 기존:
```ts
startScheduler()
```

로 되어 있다면:
```ts
await startScheduler()
```

로 변경. `app.listen` 콜백 안에 있으면 콜백을 `async`로 변경.

- [ ] **Step 3: node-cron 사용처 잔여 확인**

```bash
grep -rn "node-cron\|require.*node-cron" /Users/juno/asset-erp-backend/src --include="*.ts" 2>/dev/null
```

Expected: 출력 없음 (완전 제거).

- [ ] **Step 4: TypeScript 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -5
```

- [ ] **Step 5: 커밋**

```bash
git add src/lib/scheduler.ts src/index.ts
git commit -m "feat/redis: node-cron → BullMQ Repeatable Jobs 이관 (중복 실행 방지)"
```

---

### Task 4: Fire-and-forget 이메일 이관

**Files:**
- Modify: `src/modules/admin/admin.service.ts`
- Modify: `src/modules/admin/user.service.ts`

**목적:** 기존 `sendMail(...).catch(...)` fire-and-forget 호출을 `emailQueue.add(...)`로 이관. Redis 없으면 기존처럼 직접 호출로 fallback.

- [ ] **Step 1: `src/lib/mail-dispatch.ts` 헬퍼 생성**

여러 곳에서 재사용하려고 dispatch 헬퍼를 만든다.

```ts
// 이메일 발송을 BullMQ 큐로 dispatch. Redis 미설정 시 즉시 발송 fallback.

import { getEmailQueue } from './queues'
import { sendMail } from './mailer'
import { logger } from './logger'

export interface DispatchMailInput {
  to: string
  subject: string
  html: string
}

export async function dispatchMail(input: DispatchMailInput): Promise<void> {
  const queue = getEmailQueue()
  if (!queue) {
    // Redis 미설정 → 기존 fire-and-forget 발송 동작 유지
    sendMail(input).catch((err) => {
      logger.error({ err, to: input.to }, '[mail-dispatch] direct sendMail failed')
    })
    return
  }
  try {
    await queue.add('send', input, {
      // 잡 id는 자동. 재시도는 defaultJobOptions에서 3회.
    })
  } catch (err) {
    logger.warn({ err, to: input.to }, '[mail-dispatch] queue add failed — fallback to direct')
    sendMail(input).catch((sendErr) => {
      logger.error({ err: sendErr, to: input.to }, '[mail-dispatch] fallback sendMail failed')
    })
  }
}
```

- [ ] **Step 2: `src/modules/admin/admin.service.ts` 수정**

기존 (line 89 근처):
```ts
sendMail({ to: dto.email, subject, html }).catch((err) => {
  logger.error({ err }, '[Invite] 메일 발송 실패');
});
```

를 다음으로 변경:
```ts
await dispatchMail({ to: dto.email, subject, html })
```

파일 상단 import 변경:
```ts
import { sendMail } from "../../lib/mailer";
```
→
```ts
import { dispatchMail } from "../../lib/mail-dispatch";
```

- [ ] **Step 3: `src/modules/admin/user.service.ts` 수정**

기존 (line 306 근처):
```ts
await sendMail({ to: updated.email, subject, html })
```

를 다음으로 변경:
```ts
await dispatchMail({ to: updated.email, subject, html })
```

import 변경 동일.

- [ ] **Step 4: TypeScript + 기존 테스트 확인**

```bash
npx tsc --noEmit 2>&1 | grep -v node_modules | head -5
npx jest src/modules/admin/ 2>&1 | tail -5
```

Expected: tsc 에러 없음, 기존 테스트 통과 (jest mock이 sendMail을 mock 했다면 dispatchMail 경유로 여전히 sendMail 호출됨 → 테스트가 sendMail mock에 의존한다면 `queue`가 null이라 fallback 경유로 sendMail 호출됨).

Redis가 없는 테스트 환경에서는 `getEmailQueue()`가 null 반환 → `sendMail` 직접 호출 → 기존 테스트 동일 동작.

- [ ] **Step 5: 커밋**

```bash
git add src/lib/mail-dispatch.ts src/modules/admin/admin.service.ts src/modules/admin/user.service.ts
git commit -m "feat/redis: 이메일 fire-and-forget → BullMQ emailQueue 이관"
```

---

### Task 5: Fire-and-forget SMS 이관

**Files:**
- Modify: `src/modules/auth/auth.service.ts`
- Create: `src/lib/sms-dispatch.ts`

- [ ] **Step 1: SMS dispatch 헬퍼 생성**

`src/lib/sms-dispatch.ts`:

```ts
// SMS 발송을 BullMQ 큐로 dispatch. Redis 미설정 시 직접 호출 fallback.

import { getSmsQueue } from './queues'
import { SmsService } from '../services/sms.service'
import { logger } from './logger'

export async function dispatchSms(phoneNumber: string, message: string): Promise<void> {
  const queue = getSmsQueue()
  if (!queue) {
    const ok = await SmsService.sendSms(phoneNumber, message)
    if (!ok) throw new Error('SMS send returned false')
    return
  }
  try {
    await queue.add('send', { phoneNumber, message })
  } catch (err) {
    logger.warn({ err }, '[sms-dispatch] queue add failed — fallback to direct')
    const ok = await SmsService.sendSms(phoneNumber, message)
    if (!ok) throw new Error('SMS send returned false')
  }
}
```

- [ ] **Step 2: `src/modules/auth/auth.service.ts` 수정**

`src/modules/auth/auth.service.ts` 라인 392 근처:
```ts
const sent = await SmsService.sendSms(user.phoneNumber, message);
if (!sent) {
  throw new AppError(500, "SMS 발송에 실패했습니다. 다시 시도해주세요.");
}
```

를 다음으로 변경 (동기 SMS 검증이 필요하므로 dispatch가 아니라 그대로 유지):

**중요:** 비밀번호 리셋 SMS는 사용자가 즉시 결과를 봐야 하므로 큐잉하지 않고 동기 호출 유지. 이 파일은 변경하지 않는다.

**대신:** 초대 이메일 등 fire-and-forget 성격인 것만 큐로 이관. SMS는 auth reset처럼 즉시성이 필요한 경우 그대로 유지하는 게 안전.

**결론: Task 5는 SKIP.** (SMS 큐 인프라는 만들어뒀으므로 후속 작업에서 사용 가능)

**Step 2 skip.** 커밋할 것 없음.

---

### Task 6: 로컬 통합 검증

**Files:** 없음 (검증 단계)

- [ ] **Step 1: 로컬 Redis 기동**

```bash
docker run -d --name asset-erp-redis-bullmq -p 6379:6379 redis:7-alpine 2>&1 || \
  docker start asset-erp-redis-bullmq
sleep 2
```

- [ ] **Step 2: `.env`에 `REDIS_URL` 설정**

```bash
grep -v "^REDIS_URL=" /Users/juno/asset-erp-backend/.env > /tmp/env-new
echo "REDIS_URL=redis://localhost:6379" >> /tmp/env-new
mv /tmp/env-new /Users/juno/asset-erp-backend/.env
```

- [ ] **Step 3: 서버 재기동 + Worker 시작 확인**

```bash
kill $(lsof -ti:8080) 2>/dev/null; sleep 2
cd /Users/juno/asset-erp-backend
npm run dev > /tmp/erp-bullmq.log 2>&1 &
sleep 8
grep -E "bullmq|scheduler_started" /tmp/erp-bullmq.log | tail -10
```

Expected: `[bullmq worker] started (email/sms/scheduler)` + `[scheduler] BullMQ repeatable jobs registered`.

- [ ] **Step 4: Repeatable Jobs 등록 확인**

```bash
docker exec asset-erp-redis-bullmq redis-cli KEYS 'bull:scheduler:*'
```

Expected: `bull:scheduler:repeat:*` 등 여러 키. 5개 잡이 등록됨.

- [ ] **Step 5: 이메일 큐 잡 처리 확인 — 유저 초대**

```bash
ADMIN_TOKEN=$(curl -s -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin-1@verify.local","password":"test1234!"}' | jq -r '.tokens.accessToken')

TEST_EMAIL="bullmq-test-$(date +%s)@test.local"
TEAM_ID="cmr4bt5y2003lkqqofd3lm12i"

curl -s -X POST http://localhost:8080/admin/users/invite \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL\",\"name\":\"bullmq-test\",\"role\":\"USER\",\"teamId\":\"$TEAM_ID\",\"hireDate\":\"2026-09-27\"}" | jq '{email, name}'

sleep 2
# Worker가 잡을 처리했는지 로그 확인
grep -E "bullmq email|sendMail|email_send" /tmp/erp-bullmq.log | tail -5

# 큐에 잡이 남아있는지 (완료/실패 후 상태)
docker exec asset-erp-redis-bullmq redis-cli LLEN 'bull:email:wait'
docker exec asset-erp-redis-bullmq redis-cli LLEN 'bull:email:completed'
```

Expected: 초대 성공 응답 + 큐 처리 로그. `bull:email:completed` 리스트에 잡 남아있을 수 있음 (removeOnComplete가 age 기반).

- [ ] **Step 6: 스케줄러 잡 수동 트리거 (즉시 실행)**

```bash
# 큐에 즉시 실행할 잡 하나 넣어보기
docker exec asset-erp-redis-bullmq redis-cli LPUSH 'bull:scheduler:wait' '{"name":"outbox-process","data":{},"opts":{"jobId":"manual-outbox-1"}}' 2>&1 || echo "직접 큐 삽입 어려움 — 대신 서버 로그로 다음 스케줄 대기"

# 다음 outbox 실행(*/5분)까지 기다림 대신, 서버가 정상 기동됐는지 확인
sleep 5
grep -E "cron_outbox_done|scheduler.*done" /tmp/erp-bullmq.log | tail -3
```

Note: 즉시 실행 검증은 시간 걸리므로 큐 등록 확인으로 대체. 5분마다 outbox가 발동될 예정.

- [ ] **Step 7: Fallback 검증 — Redis 중단 후 유저 초대**

```bash
docker stop asset-erp-redis-bullmq
sleep 3

TEST_EMAIL2="fallback-test-$(date +%s)@test.local"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST http://localhost:8080/admin/users/invite \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$TEST_EMAIL2\",\"name\":\"fallback\",\"role\":\"USER\",\"teamId\":\"$TEAM_ID\",\"hireDate\":\"2026-09-27\"}")
echo "Redis 다운 시 초대 응답: HTTP $STATUS"

grep -E "mail-dispatch|queue add failed|fallback to direct" /tmp/erp-bullmq.log | tail -3
```

Expected: HTTP 201 (초대 성공, 이메일은 direct fallback으로 발송 시도).

- [ ] **Step 8: 정리**

```bash
kill $(lsof -ti:8080) 2>/dev/null || true
sleep 2

grep -v "^REDIS_URL=" /Users/juno/asset-erp-backend/.env > /tmp/env-new
mv /tmp/env-new /Users/juno/asset-erp-backend/.env

docker stop asset-erp-redis-bullmq 2>/dev/null || true
docker rm asset-erp-redis-bullmq 2>/dev/null || true

npm run dev > /tmp/erp-bullmq.log 2>&1 &
sleep 6
echo "dev 복원 완료"
```

---

## 자기검토 (Self-Review)

**스펙 커버리지:**
- ✅ 3개 큐(`email`, `sms`, `scheduler`) 정의 → Task 1
- ✅ Worker 등록/시작/graceful shutdown → Task 2
- ✅ node-cron → BullMQ Repeatable Jobs (jobId 고정으로 중복 방지) → Task 3
- ✅ 이메일 fire-and-forget → 큐 이관 (fallback 포함) → Task 4
- ⏸ SMS는 즉시성 필요로 Task 5 SKIP (인프라만 유지)

**타입 일관성:**
- `EmailJob`, `SmsJob`, `SchedulerJobName`이 Task 1에서 정의, Task 2/3/4에서 참조
- `Queue<EmailJob>` 등 제네릭 타입 일관됨

**Placeholder 없음:** 모든 코드 블록 완전한 구현.

**리스크:**
- Worker와 API 서버가 같은 프로세스에서 실행 → 대량 잡 처리 시 API 응답 지연 가능. 초기 스케일에서는 문제 없음. 후속으로 별도 Worker 프로세스 분리 가능.
- BullMQ Redis 연결은 별도 IORedis 인스턴스 사용 (Phase 1의 `getRedis`는 `maxRetriesPerRequest: 3`이라 BullMQ 블로킹 명령과 호환 안 됨).
