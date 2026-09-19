import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const ADMIN_EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const ADMIN_PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

// 생성되는 테스트 유저는 전부 이 prefix로 시작 → 테스트 후 이메일 LIKE 'k6-stress-%' 로 일괄 정리
const EMAIL_PREFIX = 'k6-stress-'

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '30s', target: 30 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:invite}': ['p(95)<1000'],
  },
}

export function setup() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )

  check(res, {
    '로그인 200': (r) => r.status === 200,
    'accessToken 발급': (r) => !!r.json('tokens.accessToken'),
  })

  return { accessToken: res.json('tokens.accessToken') }
}

export default function (data) {
  const uniqueEmail = `${EMAIL_PREFIX}${Date.now()}-${__VU}-${__ITER}@verify.local`

  const res = http.post(
    `${BASE_URL}/admin/users/invite`,
    JSON.stringify({
      email: uniqueEmail,
      name: 'k6 스트레스 테스트',
      hireDate: '2026-01-15',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${data.accessToken}`,
      },
      tags: { name: 'invite' },
    },
  )

  check(res, {
    'invite 201': (r) => r.status === 201,
  })
}
