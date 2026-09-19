import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const PASSWORD = __ENV.PASSWORD || 'test1234!'
const ASSET_ID = __ENV.ASSET_ID || 'cmr4bt67o0043kqqoh3uc9goo' // HAR-VRF-0002, IDLE, no active loan
const CONCURRENCY = Number(__ENV.CONCURRENCY || 10)

// disposal.service.ts의 approveManager/approveAdmin/complete 전부 findOrThrow +
// assertTransition(락 없는 사전 체크) 후 prisma.disposal.update({ where: { id } })로
// 쓰는데, where 절에 status 조건이 없음 — loans/licenses/maintenance와 동일한 패턴.
// complete()는 자산을 RETIRED로 확정하는 최종 단계라 가장 결과가 큼 — 동시에
// complete()를 여러 번 쏴서 몇 건이 통과하는지 센다.
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
  const manager = login('asset-mgr-1@verify.local')
  const admin = login('admin-1@verify.local')

  const createRes = http.post(
    `${BASE_URL}/disposals`,
    JSON.stringify({
      assetId: ASSET_ID,
      reason: 'SCRAP',
      criteria: { lowBookValue: true, severeDamage: false, supportEnded: false, noAlternative: false },
    }),
    authHeaders(manager),
  )
  check(createRes, { 'create 201': (r) => r.status === 201 })
  const disposalId = createRes.json('id')

  const mgrApproveRes = http.post(`${BASE_URL}/disposals/${disposalId}/approve-manager`, '{}', authHeaders(admin))
  check(mgrApproveRes, { 'approve-manager 200': (r) => r.status === 200 })

  const adminApproveRes = http.post(`${BASE_URL}/disposals/${disposalId}/approve-admin`, '{}', authHeaders(admin))
  check(adminApproveRes, {
    'approve-admin 200': (r) => r.status === 200,
    'APPROVED으로 진입': (r) => r.json('status') === 'APPROVED',
  })

  const completeReqs = Array.from({ length: CONCURRENCY }, () => ({
    method: 'POST',
    url: `${BASE_URL}/disposals/${disposalId}/complete`,
    body: '{}',
    params: authHeaders(admin),
  }))
  const completeResps = http.batch(completeReqs)
  const ok = completeResps.filter((r) => r.status === 200).length
  const blocked = completeResps.filter((r) => r.status === 409).length
  const other = completeResps.filter((r) => r.status !== 200 && r.status !== 409)

  console.log(`[disposal complete race] 시도 ${CONCURRENCY}건 중 성공 ${ok}건, 409 차단 ${blocked}건, 그외 ${other.length}건`)
  if (other.length > 0) {
    console.log('기타 응답: ' + other.map((r) => `${r.status} ${r.body}`).join(' | '))
  }

  check(null, { 'complete는 정확히 1건만 성공': () => ok === 1 })
}
