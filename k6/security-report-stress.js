import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const SEC_EMAIL = __ENV.SEC_EMAIL || 'sec-officer@verify.local'
const PASSWORD = __ENV.PASSWORD || 'test1234!'

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:list}': ['p(95)<800'],
    'http_req_duration{name:stats}': ['p(95)<1000'],
  },
}

export function setup() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: SEC_EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )
  check(res, { '로그인 200': (r) => r.status === 200 })
  return { accessToken: res.json('tokens.accessToken') }
}

export default function (data) {
  const authHeaders = { headers: { Authorization: `Bearer ${data.accessToken}` } }

  const listRes = http.get(`${BASE_URL}/security-reports`, {
    ...authHeaders, tags: { name: 'list' },
  })
  check(listRes, { 'list 200': (r) => r.status === 200 })

  const statsRes = http.get(`${BASE_URL}/security-reports/stats?year=2026&month=9`, {
    ...authHeaders, tags: { name: 'stats' },
  })
  check(statsRes, { 'stats 200': (r) => r.status === 200 })
}
