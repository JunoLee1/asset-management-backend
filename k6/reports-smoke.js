import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

export const options = {
  vus: 1,
  iterations: 1,
}

export default function () {
  const jsonHeaders = { headers: { 'Content-Type': 'application/json' } }

  // 0. login (ADMIN)
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    jsonHeaders,
  )
  check(loginRes, { 'login 200': (r) => r.status === 200 })
  const token = loginRes.json('tokens.accessToken')
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  // 1. 리포트 요약 (ADMIN/ASSET_MANAGER)
  const summaryRes = http.get(`${BASE_URL}/reports/summary`, authHeaders)
  check(summaryRes, { 'reports/summary 200': (r) => r.status === 200 })

  // 2. 수리 리포트 목록 (REPAIR_OWNER/ADMIN/ASSET_MANAGER)
  const repairListRes = http.get(`${BASE_URL}/repair-reports?page=1&pageSize=5`, authHeaders)
  check(repairListRes, {
    'repair-reports list 200': (r) => r.status === 200,
    'repair-reports.items 배열': (r) => Array.isArray(r.json('items')),
  })

  // 3. 팀 월말 보고서 목록 (TEAM_LEAD/DEPT_LEAD/ADMIN/ASSET_MANAGER)
  const teamMonthlyRes = http.get(`${BASE_URL}/reports/monthly-team?page=1&pageSize=5`, authHeaders)
  check(teamMonthlyRes, { 'monthly-team 200': (r) => r.status === 200 })

  // 4. 부서 월말 보고서 목록 (DEPT_LEAD/ADMIN/ASSET_MANAGER)
  const deptMonthlyRes = http.get(`${BASE_URL}/reports/monthly-dept?page=1&pageSize=5`, authHeaders)
  check(deptMonthlyRes, { 'monthly-dept 200': (r) => r.status === 200 })
}
