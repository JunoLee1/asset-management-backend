import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

// GET /catalogs (list) 는 요청마다 findMany + count 두 쿼리를 Promise.all 로 동시에 날림 —
// 요청 1건당 pg pool 커넥션을 2개씩 순간적으로 점유. PrismaPg는 connection_limit을
// DATABASE_URL에 명시하지 않으면 pg.Pool 기본값(10)을 씀 — 동시 요청이 많아지면
// 커넥션 풀 대기가 병목이 되는지 확인.
export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:list}': ['p(95)<1000'],
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
  const res = http.get(`${BASE_URL}/catalogs?page=1&pageSize=20`, {
    headers: { Authorization: `Bearer ${data.accessToken}` },
    tags: { name: 'list' },
  })
  check(res, { 'list 200': (r) => r.status === 200 })
}
