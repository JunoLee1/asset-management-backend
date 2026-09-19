import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const PASSWORD = __ENV.PASSWORD || 'test1234!'
const ASSET_ID = __ENV.ASSET_ID || 'cmr4bt67i0041kqqooo394fo9' // HAR-VRF-0001
const CONCURRENCY = Number(__ENV.CONCURRENCY || 10)

// approve()의 PENDING_ADMIN 분기는 ALLOWED_TRANSITIONS 체크 후
// prisma.$transaction([...]) 로 업데이트하는데, update의 where 절에 status
// 조건이 없음 — 체크와 쓰기 사이에 원자성이 없다(licenses의 수정 전과 같은 패턴).
// 같은 정비 건에 동시에 approve()를 여러 번 쏴서 몇 건이 통과하는지 센다.
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
  const teamLead = login('lead-dev@verify.local')
  const admin = login('admin-1@verify.local')

  // TEAM_LEAD가 만들면 즉시 PENDING_ADMIN으로 시작 (1차 승인 스킵) — 바로 race 대상 상태
  const createRes = http.post(
    `${BASE_URL}/maintenances`,
    JSON.stringify({
      assetId: ASSET_ID,
      title: 'k6 approve race',
      description: '동시 승인 레이스 테스트',
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      type: 'REPAIR',
    }),
    authHeaders(teamLead),
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'PENDING_ADMIN으로 시작': (r) => r.json('status') === 'PENDING_ADMIN',
  })
  const maintenanceId = createRes.json('id')

  const approveReqs = Array.from({ length: CONCURRENCY }, () => ({
    method: 'POST',
    url: `${BASE_URL}/maintenances/${maintenanceId}/approve`,
    body: '{}',
    params: authHeaders(admin),
  }))
  const approveResps = http.batch(approveReqs)
  const ok = approveResps.filter((r) => r.status === 200).length
  const blocked = approveResps.filter((r) => r.status === 400).length
  const other = approveResps.filter((r) => r.status !== 200 && r.status !== 400)

  console.log(`[maintenance approve race] 시도 ${CONCURRENCY}건 중 성공 ${ok}건, 400 차단 ${blocked}건, 그외 ${other.length}건`)
  if (other.length > 0) {
    console.log('기타 응답: ' + other.map((r) => `${r.status} ${r.body}`).join(' | '))
  }

  check(null, { 'approve는 정확히 1건만 성공': () => ok === 1 })
}
