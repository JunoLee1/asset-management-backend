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
    'http_req_duration{name:list}': ['p(95)<800'],
    'http_req_duration{name:getById}': ['p(95)<800'],
  },
}

export function setup() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )
  check(res, { '로그인 200': (r) => r.status === 200 })
  const token = res.json('tokens.accessToken')
  const mfrId = http.get(`${BASE_URL}/manufacturers?page=1&pageSize=5`, {
    headers: { Authorization: `Bearer ${token}` },
  }).json('items.0.id')
  return { accessToken: token, mfrId }
}

export default function (data) {
  const authHeaders = { headers: { Authorization: `Bearer ${data.accessToken}` } }

  const listRes = http.get(`${BASE_URL}/manufacturers?page=1&pageSize=20`, {
    ...authHeaders, tags: { name: 'list' },
  })
  check(listRes, { 'list 200': (r) => r.status === 200 })

  if (data.mfrId) {
    const getRes = http.get(`${BASE_URL}/manufacturers/${data.mfrId}`, {
      ...authHeaders, tags: { name: 'getById' },
    })
    check(getRes, { 'getById 200': (r) => r.status === 200 })
  }
}
