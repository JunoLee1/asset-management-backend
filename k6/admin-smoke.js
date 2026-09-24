import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

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
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }

  // 1. 유저 목록 조회
  const listRes = http.get(`${BASE_URL}/admin/users?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'users list 200': (r) => r.status === 200,
    'users list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const userId = listRes.json('items.0.id')

  // 2. 유저 상세 조회
  const getRes = http.get(`${BASE_URL}/admin/users/${userId}`, authHeaders)
  check(getRes, {
    'users getById 200': (r) => r.status === 200,
    'users getById.id 일치': (r) => r.json('id') === userId,
  })

  // 3. 유저 히스토리 조회
  const historyRes = http.get(`${BASE_URL}/admin/users/${userId}/history`, authHeaders)
  check(historyRes, {
    'users history 200': (r) => r.status === 200,
  })

  // 4. 관리자 요약 조회
  const summaryRes = http.get(`${BASE_URL}/admin/summary`, authHeaders)
  check(summaryRes, {
    'admin summary 200': (r) => r.status === 200,
  })

  // 5. detected-software 목록 조회
  const detectedRes = http.get(`${BASE_URL}/admin/detected-software`, authHeaders)
  check(detectedRes, {
    'detected-software list 200': (r) => r.status === 200,
  })
}
