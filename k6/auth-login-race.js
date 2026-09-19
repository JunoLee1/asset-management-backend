import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

// 같은 계정으로 다수 VU가 동시에 로그인을 반복 — 두 가지를 본다
//  1) bcrypt.compare(cost=12)가 libuv 기본 threadpool(4)에서 병목을 만드는지 (지연시간)
//  2) "단일 세션 강제"(revokeAllUserSessions → create) 가 원자적이지 않아
//     동시 로그인 시 활성 refreshToken이 2개 이상 동시에 남는 race가 실제로 나는지
//     (DB 확인은 이 스크립트 밖에서 psql로 수행)
export const options = {
  scenarios: {
    concurrent_login: {
      executor: 'constant-vus',
      vus: 20,
      duration: '20s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:login}': ['p(95)<1000'],
  },
}

export default function () {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    {
      headers: { 'Content-Type': 'application/json' },
      tags: { name: 'login' },
    },
  )
  check(res, { 'login 200': (r) => r.status === 200 })
}
