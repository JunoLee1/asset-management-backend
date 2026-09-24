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
    'http_req_duration{name:list}': ['p(95)<1000'],
    'http_req_duration{name:getById}': ['p(95)<800'],
    'http_req_duration{name:summary}': ['p(95)<1000'],
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
  const authHeaders = {
    headers: { Authorization: `Bearer ${data.accessToken}` },
  }

  // 유저 목록 조회
  const listRes = http.get(`${BASE_URL}/admin/users?page=1&pageSize=20`, {
    ...authHeaders,
    tags: { name: 'list' },
  })
  check(listRes, { 'list 200': (r) => r.status === 200 })

  const userId = listRes.json('items.0.id')
  if (!userId) return

  // 유저 상세 조회
  const getRes = http.get(`${BASE_URL}/admin/users/${userId}`, {
    ...authHeaders,
    tags: { name: 'getById' },
  })
  check(getRes, { 'getById 200': (r) => r.status === 200 })

  // 관리자 요약
  const summaryRes = http.get(`${BASE_URL}/admin/summary`, {
    ...authHeaders,
    tags: { name: 'summary' },
  })
  check(summaryRes, { 'summary 200': (r) => r.status === 200 })
}
