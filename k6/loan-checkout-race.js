import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const PASSWORD = __ENV.PASSWORD || 'test1234!'
const ASSET_ID = __ENV.ASSET_ID || 'cmr4bt6f30052kqqoeb224ur9' // LG Gram 17 (공용), IDLE
const CONCURRENCY = Number(__ENV.CONCURRENCY || 10)

// loan.service.ts에 추가한 두 가드를 "진짜 동시 요청"으로 검증한다.
//  1) create() 의 중복 신청 차단(findFirst 기반, DB 유니크 제약 없음 — race에 취약할 수 있음)
//  2) checkout() 의 원자적 updateMany(where: status='IDLE') — 이게 최종 방어선이어야 함
// http.batch()로 완전히 동시에 여러 요청을 쏴서 몇 건이 통과하는지 센다.
export const options = { vus: 1, iterations: 1 }

function login(email) {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )
  if (res.status !== 200) throw new Error(`login failed for ${email}: ${res.status} ${res.body}`)
  return res.json('tokens.accessToken')
}

function authHeaders(token) {
  return { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }
}

export default function () {
  const requester = login('user-design-2@verify.local')
  const teamLead = login('lead-dev@verify.local')
  const deptLead = login('dept-lead-dev@verify.local')
  const assetMgr = login('asset-mgr-1@verify.local')
  const admin = login('admin-1@verify.local')

  // ── Phase 1: 같은 자산에 N건의 대여 신청을 완전히 동시에 쏨 ──────────────
  const createReqs = Array.from({ length: CONCURRENCY }, () => ({
    method: 'POST',
    url: `${BASE_URL}/loans`,
    body: JSON.stringify({ assetId: ASSET_ID, purpose: 'k6 checkout race', expectedReturnDate: '2026-12-31T00:00:00.000Z' }),
    params: authHeaders(requester),
  }))
  const createResps = http.batch(createReqs)
  const created = createResps.filter((r) => r.status === 201).map((r) => r.json('id'))
  const createRejected = createResps.filter((r) => r.status === 409).length
  console.log(`[create race] 시도 ${CONCURRENCY}건 중 성공 ${created.length}건, 409 거부 ${createRejected}건`)

  check(null, {
    'create 시도 + 거부 합이 전체와 일치': () => created.length + createRejected === CONCURRENCY,
  })

  // ── Phase 2: 살아남은 대여 건 전부를 APPROVED까지 순서대로 승인 (경쟁 대상 아님) ──
  for (const id of created) {
    http.post(`${BASE_URL}/loans/${id}/approve-manager`, '{}', authHeaders(teamLead))
    http.post(`${BASE_URL}/loans/${id}/approve-dept`, '{}', authHeaders(deptLead))
    http.post(`${BASE_URL}/loans/${id}/approve-admin`, '{}', authHeaders(assetMgr))
  }

  // ── Phase 3: APPROVED된 대여 건 전부에 대해 checkout을 완전히 동시에 쏨 ──────
  const checkoutReqs = created.map((id) => ({
    method: 'POST',
    url: `${BASE_URL}/loans/${id}/checkout`,
    body: '{}',
    params: authHeaders(admin),
  }))
  const checkoutResps = http.batch(checkoutReqs)
  const checkoutOk = checkoutResps.filter((r) => r.status === 200).length
  const checkoutBlocked = checkoutResps.filter((r) => r.status === 409).length
  console.log(
    `[checkout race] APPROVED ${created.length}건 중 checkout 성공 ${checkoutOk}건, 409 차단 ${checkoutBlocked}건`,
  )

  check(null, {
    '자산 하나당 checkout은 정확히 1건만 성공': () => checkoutOk === 1,
    '나머지 전부 409로 차단됨': () => checkoutBlocked === created.length - 1,
  })
}
