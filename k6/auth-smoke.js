import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

export const options = {
  vus: 1,
  iterations: 1,
}

export default function () {
  const jsonHeaders = { headers: { 'Content-Type': 'application/json' } }

  // 1. login
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    jsonHeaders,
  )
  check(loginRes, {
    'login 200': (r) => r.status === 200,
    'accessToken 발급': (r) => !!r.json('tokens.accessToken'),
    'refreshToken 발급': (r) => !!r.json('tokens.refreshToken'),
  })
  const accessToken = loginRes.json('tokens.accessToken')
  const refreshToken = loginRes.json('tokens.refreshToken')
  const authHeaders = { headers: { Authorization: `Bearer ${accessToken}` } }

  // 2. me
  const meRes = http.get(`${BASE_URL}/auth/me`, authHeaders)
  check(meRes, {
    'me 200': (r) => r.status === 200,
    'me.email 일치': (r) => r.json('email') === EMAIL,
  })

  // 3. refresh
  const refreshRes = http.post(
    `${BASE_URL}/auth/refresh`,
    JSON.stringify({ refreshToken }),
    jsonHeaders,
  )
  check(refreshRes, {
    'refresh 200': (r) => r.status === 200,
    '새 accessToken 발급': (r) => !!r.json('accessToken'),
  })

  // 4. logout
  const logoutRes = http.post(
    `${BASE_URL}/auth/logout`,
    JSON.stringify({ refreshToken }),
    jsonHeaders,
  )
  check(logoutRes, { 'logout 204': (r) => r.status === 204 })

  // 5. logout 후 refresh는 거부돼야 함 (revoke 확인)
  const refreshAfterLogout = http.post(
    `${BASE_URL}/auth/refresh`,
    JSON.stringify({ refreshToken }),
    jsonHeaders,
  )
  check(refreshAfterLogout, {
    'logout 후 refresh는 401': (r) => r.status === 401,
  })
}
