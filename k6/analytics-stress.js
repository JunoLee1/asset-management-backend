import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:distribution}': ['p(95)<1500'],
    'http_req_duration{name:utilization}': ['p(95)<1500'],
  },
}

export function setup() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )
  check(res, { '로그인 200': (r) => r.status === 200 })
  return { accessToken: res.json('tokens.accessToken') }
}

export default function (data) {
  const authHeaders = { headers: { Authorization: `Bearer ${data.accessToken}` } }

  const distRes = http.get(`${BASE_URL}/analytics/distribution`, {
    ...authHeaders,
    tags: { name: 'distribution' },
  })
  check(distRes, { 'distribution 200': (r) => r.status === 200 })

  const utilRes = http.get(`${BASE_URL}/analytics/utilization`, {
    ...authHeaders,
    tags: { name: 'utilization' },
  })
  check(utilRes, { 'utilization 200': (r) => r.status === 200 })
}
