// ADR 0010 — 비허가 앱(DISALLOWED) 감지 검증 케이스
//
// 검증 대상 로직: softwareService.ingest() 내 ADR 0010 블록 (lines 557–599)
//
// 감지 발동 조건 (AND):
//   C1. SW가 기존 카탈로그에 있음 (!isNewSoftware)
//   C2. payload.userId 있음
//   C3. SoftwarePermission.status === 'DISALLOWED'
//   C4. DisallowedDetection 미존재 (첫 감지)
//
// ── 사용 방법 ─────────────────────────────────────────────────────
//   1. 각 테스트를 실행하면 console.log 로 실제 호출 횟수가 출력됩니다.
//   2. 직접 확인 후 '// TODO: expect' 주석을 해제하고 기대값을 채우세요.
//   3. 모든 TODO 를 채운 뒤 마지막 placeholder `expect(true).toBe(true)` 를 제거하세요.

// ── tx 모킹 (jest.mock 호이스팅 때문에 factory 밖에서 선언) ────────
//   jest.clearMocks: true 설정이 call 추적은 초기화하지만 구현은 유지하므로,
//   $transaction 구현은 beforeEach 에서 매번 재설정.
const mockTx = {
  device: { upsert: jest.fn() },
  software: { findFirst: jest.fn(), create: jest.fn() },
  softwareInstance: { findUnique: jest.fn(), update: jest.fn(), create: jest.fn() },
  softwareUsageEvent: { create: jest.fn() },
  softwarePermission: { findUnique: jest.fn() },
}

jest.mock('../../../../lib/prisma', () => ({
  prisma: {
    $transaction: jest.fn(),
    disallowedDetection: { findUnique: jest.fn(), create: jest.fn() },
    user: { findUnique: jest.fn(), findMany: jest.fn() },
  },
}))

jest.mock('../../audit/audit.service', () => ({
  logAudit: jest.fn().mockResolvedValue(undefined),
}))

jest.mock('../../../notifications/notification.service', () => ({
  notificationService: { createInApp: jest.fn().mockResolvedValue(undefined) },
}))

import { prisma } from '../../../../lib/prisma'
import { notificationService } from '../../../notifications/notification.service'
import { softwareService } from '../software.service'

// ── 타입 단언 헬퍼 ────────────────────────────────────────────────
const mockPrisma = prisma as unknown as {
  $transaction: jest.Mock
  disallowedDetection: { findUnique: jest.Mock; create: jest.Mock }
  user: { findUnique: jest.Mock; findMany: jest.Mock }
}
const mockCreateInApp = notificationService.createInApp as jest.Mock

// ── 픽스처 ───────────────────────────────────────────────────────
const REQUESTER = { id: 'sec-1', role: 'SECURITY_OFFICER' as const }

const BASE_PAYLOAD = {
  hostname: 'PC-001',
  userId: 'user-1',
  items: [{ name: 'BadApp', vendor: 'BadCo', executedOs: 'Windows 11' }],
}

const EXISTING_SOFTWARE = { id: 'sw-1', name: 'BadApp', vendor: 'BadCo' }
const EXISTING_INSTANCE = { id: 'inst-1' }
const EXISTING_DEVICE = { id: 'device-1', hostname: 'PC-001' }
const TARGET_USER = { id: 'user-1', name: '홍길동' }
const ONE_OFFICER = [{ id: 'officer-1' }]
const TWO_OFFICERS = [{ id: 'officer-1' }, { id: 'officer-2' }]

// ── beforeEach: 기본 동작 세팅 (각 테스트에서 필요한 부분만 오버라이드) ──
beforeEach(() => {
  // $transaction 은 콜백을 mockTx 와 함께 동기 실행
  mockPrisma.$transaction.mockImplementation((fn: (tx: typeof mockTx) => Promise<unknown>) =>
    fn(mockTx),
  )

  // tx 내부 기본값: 기존 SW 존재, 기존 Instance 존재(update 경로), DISALLOWED
  mockTx.device.upsert.mockResolvedValue(EXISTING_DEVICE)
  mockTx.software.findFirst.mockResolvedValue(EXISTING_SOFTWARE)   // isNewSoftware = false
  mockTx.software.create.mockResolvedValue({ id: 'sw-new', name: 'NewApp' })
  mockTx.softwareInstance.findUnique.mockResolvedValue(EXISTING_INSTANCE)
  mockTx.softwareInstance.update.mockResolvedValue({})
  mockTx.softwareInstance.create.mockResolvedValue({})
  mockTx.softwarePermission.findUnique.mockResolvedValue({ status: 'DISALLOWED' })

  // outer prisma 기본값: 미감지, 1명 SECURITY_OFFICER
  mockPrisma.disallowedDetection.findUnique.mockResolvedValue(null)
  mockPrisma.disallowedDetection.create.mockResolvedValue({})
  mockPrisma.user.findUnique.mockResolvedValue(TARGET_USER)
  mockPrisma.user.findMany.mockResolvedValue(ONE_OFFICER)
})

// ─────────────────────────────────────────────────────────────────
// V-01  조건 C1+C2+C3+C4 모두 충족 → 감지 발동
// ─────────────────────────────────────────────────────────────────
it('V-01: 기존 DISALLOWED SW + userId 있음 + 미감지 → DisallowedDetection 생성 및 알림 발송', async () => {
  // Arrange: beforeEach 기본값 그대로 (C1 기존SW, C2 userId, C3 DISALLOWED, C4 미감지)

  // Act
  const result = await softwareService.ingest(BASE_PAYLOAD, REQUESTER)

  // ── 검증 포인트 ───────────────────────────────────────────────
  const detectionCreates = mockPrisma.disallowedDetection.create.mock.calls.length
  const notifCalls = mockCreateInApp.mock.calls.length
  console.log('[V-01] disallowedDetection.create 호출 횟수:', detectionCreates)
  console.log('[V-01] createInApp 호출 횟수:', notifCalls)
  console.log('[V-01] createInApp recipients:', mockCreateInApp.mock.calls.map((c) => c[0].recipientId))
  console.log('[V-01] result:', result)

  expect(detectionCreates).toBe(1)
  expect(notifCalls).toBe(2) // 사용자 1 + officer 1
  expect(mockCreateInApp.mock.calls.map((c) => c[0].recipientId)).toEqual(['user-1', 'officer-1'])
  expect(result.newSoftwareCount).toBe(0)
})

// ─────────────────────────────────────────────────────────────────
// V-02  C4 미충족 — 동일 (userId, softwareId) 재ingest → 중복 감지 방지
// ─────────────────────────────────────────────────────────────────
it('V-02: 이미 감지된 (userId, softwareId) 재ingest → DisallowedDetection 생성 스킵', async () => {
  // Arrange: C4 위반 — 이미 DetectionRecord 존재
  mockPrisma.disallowedDetection.findUnique.mockResolvedValue({ id: 'det-1' })

  // Act
  await softwareService.ingest(BASE_PAYLOAD, REQUESTER)

  const detectionCreates = mockPrisma.disallowedDetection.create.mock.calls.length
  const notifCalls = mockCreateInApp.mock.calls.length
  console.log('[V-02] disallowedDetection.create 호출 횟수:', detectionCreates)
  console.log('[V-02] createInApp 호출 횟수:', notifCalls)

  expect(detectionCreates).toBe(0)
  expect(notifCalls).toBe(0)
})

// ─────────────────────────────────────────────────────────────────
// V-03  C1 미충족 — 신규 SW 발견 (isNewSoftware = true)
// ─────────────────────────────────────────────────────────────────
it('V-03: 처음 발견된 신규 SW → UNCLASSIFIED 생성, 감지 로직 건너뜀', async () => {
  // Arrange: C1 위반 — SW 없음, create 경로
  mockTx.software.findFirst.mockResolvedValue(null)
  mockTx.software.create.mockResolvedValue({ id: 'sw-new', name: 'BadApp', vendor: 'BadCo' })

  // Act
  await softwareService.ingest(BASE_PAYLOAD, REQUESTER)

  const detectionCreates = mockPrisma.disallowedDetection.create.mock.calls.length
  const permissionLookups = mockTx.softwarePermission.findUnique.mock.calls.length
  console.log('[V-03] disallowedDetection.create 호출 횟수:', detectionCreates)
  console.log('[V-03] softwarePermission.findUnique 호출 횟수:', permissionLookups)

  expect(detectionCreates).toBe(0)
  expect(permissionLookups).toBe(0) // isNewSoftware=true 경로는 permission 조회 자체를 건너뜀
})

// ─────────────────────────────────────────────────────────────────
// V-04  C2 미충족 — payload.userId 없음
// ─────────────────────────────────────────────────────────────────
it('V-04: userId 없는 payload → 감지 로직 진입 안 함', async () => {
  // Arrange: C2 위반 — userId null
  const payload = { ...BASE_PAYLOAD, userId: undefined }

  // Act
  await softwareService.ingest(payload, REQUESTER)

  const detectionCreates = mockPrisma.disallowedDetection.create.mock.calls.length
  const detectionLookups = mockPrisma.disallowedDetection.findUnique.mock.calls.length
  console.log('[V-04] disallowedDetection.findUnique 호출 횟수:', detectionLookups)
  console.log('[V-04] disallowedDetection.create 호출 횟수:', detectionCreates)

  expect(detectionLookups).toBe(0) // userId 없으면 감지 블록 자체에 진입 안 함
  expect(detectionCreates).toBe(0)
})

// ─────────────────────────────────────────────────────────────────
// V-05  C3 미충족 — ALLOWED SW
// ─────────────────────────────────────────────────────────────────
it('V-05: ALLOWED SW ingest → 감지 없음', async () => {
  // Arrange: C3 위반
  mockTx.softwarePermission.findUnique.mockResolvedValue({ status: 'ALLOWED' })

  // Act
  await softwareService.ingest(BASE_PAYLOAD, REQUESTER)

  const detectionCreates = mockPrisma.disallowedDetection.create.mock.calls.length
  console.log('[V-05] disallowedDetection.create 호출 횟수:', detectionCreates)

  expect(detectionCreates).toBe(0)
})

// ─────────────────────────────────────────────────────────────────
// V-06  C3 미충족 — UNCLASSIFIED SW
// ─────────────────────────────────────────────────────────────────
it('V-06: UNCLASSIFIED SW ingest → 감지 없음', async () => {
  // Arrange: C3 위반
  mockTx.softwarePermission.findUnique.mockResolvedValue({ status: 'UNCLASSIFIED' })

  // Act
  await softwareService.ingest(BASE_PAYLOAD, REQUESTER)

  const detectionCreates = mockPrisma.disallowedDetection.create.mock.calls.length
  console.log('[V-06] disallowedDetection.create 호출 횟수:', detectionCreates)

  expect(detectionCreates).toBe(0)
})

// ─────────────────────────────────────────────────────────────────
// V-07  SECURITY_OFFICER 2명일 때 알림 수신자 수
// ─────────────────────────────────────────────────────────────────
it('V-07: SECURITY_OFFICER 2명 환경 → 알림 수신자 수 확인', async () => {
  // Arrange: officer 2명
  mockPrisma.user.findMany.mockResolvedValue(TWO_OFFICERS)

  // Act
  await softwareService.ingest(BASE_PAYLOAD, REQUESTER)

  const notifCalls = mockCreateInApp.mock.calls.length
  const recipients = mockCreateInApp.mock.calls.map((c) => ({
    recipientId: c[0].recipientId,
    type: c[0].type,
  }))
  console.log('[V-07] createInApp 호출 횟수:', notifCalls)
  console.log('[V-07] recipients:', JSON.stringify(recipients, null, 2))

  expect(notifCalls).toBe(3) // 사용자 1 + officer 2
  expect(mockCreateInApp.mock.calls.map((c) => c[0].recipientId)).toEqual([
    'user-1',
    'officer-1',
    'officer-2',
  ])
})
