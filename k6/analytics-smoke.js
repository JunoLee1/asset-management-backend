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

  // 0. login
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    jsonHeaders,
  )
  check(loginRes, { 'login 200': (r) => r.status === 200 })
  const token = loginRes.json('tokens.accessToken')
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } }

  // 1. 분포 통계
  const distRes = http.get(`${BASE_URL}/analytics/distribution`, authHeaders)
  check(distRes, {
    'distribution 200': (r) => r.status === 200,
    'distribution.byClass 존재': (r) => !!r.json('byClass'),
  })

  // 2. 활용률
  const utilRes = http.get(`${BASE_URL}/analytics/utilization`, authHeaders)
  check(utilRes, { 'utilization 200': (r) => r.status === 200 })

  // 3. 부서별 활용률
  const utilDeptRes = http.get(`${BASE_URL}/analytics/utilization-by-department`, authHeaders)
  check(utilDeptRes, { 'utilization-by-department 200': (r) => r.status === 200 })

  // 4. 부서별 자산 가치
  const valueRes = http.get(`${BASE_URL}/analytics/value-by-department`, authHeaders)
  check(valueRes, { 'value-by-department 200': (r) => r.status === 200 })

  // 5. 유지보수 비용
  const costRes = http.get(`${BASE_URL}/analytics/maintenance-cost`, authHeaders)
  check(costRes, { 'maintenance-cost 200': (r) => r.status === 200 })

  // 6. 컴플라이언스 만료
  const complianceRes = http.get(`${BASE_URL}/analytics/compliance-expiry`, authHeaders)
  check(complianceRes, { 'compliance-expiry 200': (r) => r.status === 200 })
}
