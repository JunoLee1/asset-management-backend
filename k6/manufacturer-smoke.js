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
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  }

  // 1. 제조사 목록
  const listRes = http.get(`${BASE_URL}/manufacturers?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const mfrId = listRes.json('items.0.id')

  // 2. 제조사 상세
  const getRes = http.get(`${BASE_URL}/manufacturers/${mfrId}`, authHeaders)
  check(getRes, {
    'getById 200': (r) => r.status === 200,
    'getById.id 일치': (r) => r.json('id') === mfrId,
  })

  // 3. 제조사 생성 (ADMIN 전용)
  const createRes = http.post(
    `${BASE_URL}/manufacturers`,
    JSON.stringify({ name: `k6-mfr-${Date.now()}` }),
    authHeaders,
  )
  check(createRes, { 'create 201': (r) => r.status === 201 })
  const newId = createRes.json('id')

  // 4. 제조사 수정
  const updateRes = http.patch(
    `${BASE_URL}/manufacturers/${newId}`,
    JSON.stringify({ isActive: false }),
    authHeaders,
  )
  check(updateRes, { 'update 200': (r) => r.status === 200 })

  // 5. 제조사 삭제
  const deleteRes = http.del(`${BASE_URL}/manufacturers/${newId}`, null, authHeaders)
  check(deleteRes, { 'delete 200 or 204': (r) => r.status === 200 || r.status === 204 })
}
