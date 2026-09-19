import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const ADMIN_EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const ADMIN_PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

export const options = {
  vus: 1,
  iterations: 1,
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
  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
    },
  }

  // 정상 케이스: hireDate 포함 → 201 + inviteToken
  const uniqueEmail = `k6-smoke-${Date.now()}@verify.local`
  const okRes = http.post(
    `${BASE_URL}/admin/users/invite`,
    JSON.stringify({
      email: uniqueEmail,
      name: 'k6 스모크 테스트',
      hireDate: '2026-01-15',
    }),
    authHeaders,
  )

  check(okRes, {
    'invite 201': (r) => r.status === 201,
    'inviteToken 반환': (r) => !!r.json('inviteToken'),
  })

  // 회귀 케이스: hireDate 누락 → 400 (검증 메시지로 실패해야지, 다른 이유로 실패하면 안 됨)
  const missingHireDateRes = http.post(
    `${BASE_URL}/admin/users/invite`,
    JSON.stringify({
      email: `k6-smoke-missing-hiredate-${Date.now()}@verify.local`,
      name: 'k6 스모크 테스트',
    }),
    authHeaders,
  )

  check(missingHireDateRes, {
    'hireDate 누락 시 400': (r) => r.status === 400,
  })
}
