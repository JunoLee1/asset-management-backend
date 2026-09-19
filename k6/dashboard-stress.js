import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const EMAIL = __ENV.EMAIL || 'repair-owner-1@verify.local' // 가장 쿼리가 많은 분기 (REPAIR_OWNER)
const PASSWORD = __ENV.PASSWORD || 'test1234!'

// GET /dashboard 하나가 역할에 따라 10~15개의 개별 prisma 쿼리를 던짐
// (앞단 Promise.all 6개 + 뒷단 Promise.all 4개 + REPAIR_OWNER 전용 Promise.all 5개).
// catalog list(쿼리 2개)는 50 VU에서도 멀쩡했는데, dashboard는 요청 1건당 커넥션
// 점유가 훨씬 커서 커넥션 풀(기본 10)이 먼저 병목이 될 가능성이 높음.
export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:dashboard}': ['p(95)<1000'],
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
  const res = http.get(`${BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${data.accessToken}` },
    tags: { name: 'dashboard' },
  })
  check(res, { 'dashboard 200': (r) => r.status === 200 })
}
