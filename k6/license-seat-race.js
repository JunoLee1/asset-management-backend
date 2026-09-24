import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const PASSWORD = __ENV.PASSWORD || 'test1234!'
const LICENSE_ID = __ENV.LICENSE_ID
const TARGET_USER_IDS = (__ENV.TARGET_USER_IDS || '').split(',').filter(Boolean)
const REMAINING_SEATS = parseInt(__ENV.REMAINING_SEATS || '1', 10)

// license.service.ts의 request()는 countActiveSeats()로 "active >= seatsTotal"을
// 체크하지만 이 체크와 licenseRequest.create()가 트랜잭션/원자적 조건부 UPDATE로
// 묶여있지 않음 (loans/create()의 수정 전과 동일한 형태의 TOCTOU).
// 서로 다른 targetUserId로 완전히 동시에 요청을 쏴서, 잔여 시트보다 많은 요청이
// 통과하는지 확인한다.
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

export default function () {
  if (!LICENSE_ID || TARGET_USER_IDS.length === 0) {
    throw new Error('LICENSE_ID, TARGET_USER_IDS 환경변수를 지정하세요')
  }

  const admin = login('admin-1@verify.local')
  const authHeaders = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${admin}` } }

  const reqs = TARGET_USER_IDS.map((targetUserId) => ({
    method: 'POST',
    url: `${BASE_URL}/licenses/${LICENSE_ID}/requests`,
    body: JSON.stringify({ targetUserId }),
    params: authHeaders,
  }))
  const resps = http.batch(reqs)
  const ok = resps.filter((r) => r.status === 201)
  const blocked = resps.filter((r) => r.status === 400).length
  const other = resps.filter((r) => r.status !== 201 && r.status !== 400)

  console.log(
    `[license seat race] 시도 ${TARGET_USER_IDS.length}건 중 성공 ${ok.length}건, 시트부족 400 ${blocked}건, 그외 ${other.length}건`,
  )
  if (other.length > 0) {
    console.log('기타 응답: ' + other.map((r) => `${r.status} ${r.body}`).join(' | '))
  }

  check(null, {
    '성공한 요청 수가 실제 잔여 시트 이내': () => ok.length <= REMAINING_SEATS,
  })
}
