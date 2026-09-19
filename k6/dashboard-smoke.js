import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const PASSWORD = __ENV.PASSWORD || 'test1234!'

// 역할별로 dashboard.service.ts의 분기 쿼리가 다 달라서 — 4개 역할 전부 확인
const ACCOUNTS = [
  { role: 'ADMIN', email: 'admin-1@verify.local' },
  { role: 'TEAM_LEAD', email: 'manager-1@verify.local' },
  { role: 'DEPT_LEAD', email: 'dept-lead-1@verify.local' },
  { role: 'REPAIR_OWNER', email: 'repair-owner-1@verify.local' },
]

export const options = {
  vus: 1,
  iterations: 1,
}

export default function () {
  for (const account of ACCOUNTS) {
    const loginRes = http.post(
      `${BASE_URL}/auth/login`,
      JSON.stringify({ email: account.email, password: PASSWORD }),
      { headers: { 'Content-Type': 'application/json' } },
    )
    check(loginRes, { [`${account.role} 로그인 200`]: (r) => r.status === 200 })

    const dashRes = http.get(`${BASE_URL}/dashboard`, {
      headers: { Authorization: `Bearer ${loginRes.json('tokens.accessToken')}` },
    })
    check(dashRes, {
      [`${account.role} dashboard 200`]: (r) => r.status === 200,
      [`${account.role} stats 존재`]: (r) => !!r.json('stats'),
    })
  }
}
