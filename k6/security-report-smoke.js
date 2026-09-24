import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const SEC_EMAIL = __ENV.SEC_EMAIL || 'sec-officer@verify.local'
const ADMIN_EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.PASSWORD || 'test1234!'

export const options = {
  vus: 1,
  iterations: 1,
}

export default function () {
  const jsonHeaders = { headers: { 'Content-Type': 'application/json' } }

  // SECURITY_OFFICER 로그인
  const secLoginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: SEC_EMAIL, password: PASSWORD }),
    jsonHeaders,
  )
  check(secLoginRes, { 'sec login 200': (r) => r.status === 200 })
  const secToken = secLoginRes.json('tokens.accessToken')
  const secHeaders = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secToken}` } }

  // ADMIN 로그인
  const adminLoginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: ADMIN_EMAIL, password: PASSWORD }),
    jsonHeaders,
  )
  const adminToken = adminLoginRes.json('tokens.accessToken')
  const adminHeaders = { headers: { Authorization: `Bearer ${adminToken}` } }

  // 1. 보안 리포트 목록 (SECURITY_OFFICER)
  const listRes = http.get(`${BASE_URL}/security-reports`, secHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list 배열': (r) => Array.isArray(r.json()),
  })

  // 2. 보안 통계 (SECURITY_OFFICER/ADMIN) — year/month 필수
  const statsRes = http.get(`${BASE_URL}/security-reports/stats?year=2026&month=9`, secHeaders)
  check(statsRes, { 'stats 200': (r) => r.status === 200 })

  // 3. ADMIN → 목록 조회 허용
  const adminListRes = http.get(`${BASE_URL}/security-reports`, adminHeaders)
  check(adminListRes, { 'admin list 200': (r) => r.status === 200 })

  // 4. 보안 리포트 생성 (SECURITY_OFFICER 전용)
  const createRes = http.post(
    `${BASE_URL}/security-reports`,
    JSON.stringify({ year: 2026, month: 9, title: `k6-sec-report-${Date.now()}`, comment: 'k6 smoke test' }),
    secHeaders,
  )
  check(createRes, { 'create 201': (r) => r.status === 201 })
  const newId = createRes.json('id')

  // 5. 보안 리포트 상세 (SECURITY_OFFICER/ADMIN)
  if (newId) {
    const getRes = http.get(`${BASE_URL}/security-reports/${newId}`, secHeaders)
    check(getRes, { 'getById 200': (r) => r.status === 200 })

    // 6. 삭제
    const deleteRes = http.del(`${BASE_URL}/security-reports/${newId}`, null, secHeaders)
    check(deleteRes, { 'delete 200 or 204': (r) => r.status === 200 || r.status === 204 })
  }
}
