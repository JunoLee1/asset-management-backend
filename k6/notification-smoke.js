import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.EMAIL || 'user-dev-1@verify.local'
const PASSWORD = __ENV.PASSWORD || 'test1234!'

export const options = {
  vus: 1,
  iterations: 1,
}

export default function () {
  const jsonHeaders = { headers: { 'Content-Type': 'application/json' } }

  // 0. login
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    jsonHeaders,
  )
  check(loginRes, { 'login 200': (r) => r.status === 200 })
  const token = loginRes.json('tokens.accessToken')
  const authHeaders = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }

  // 1. 내 알림 목록
  const myRes = http.get(`${BASE_URL}/notifications/my`, authHeaders)
  check(myRes, {
    'my 200': (r) => r.status === 200,
    'my 배열': (r) => Array.isArray(r.json()),
  })
  const notifId = myRes.json('0.id')

  // 2. 읽음 처리 (본인 알림)
  if (notifId) {
    const readRes = http.post(
      `${BASE_URL}/notifications/${notifId}/read`,
      JSON.stringify({}),
      authHeaders,
    )
    check(readRes, { 'read 204': (r) => r.status === 204 })
  }
}
