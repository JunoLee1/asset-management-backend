import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'
const ASSET_ID = __ENV.ASSET_ID || 'cmuf72s1c000ojoqo9m2k3fs8'

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

  // 1. 유지보수 목록
  const listRes = http.get(`${BASE_URL}/maintenances?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const maintenanceId = listRes.json('items.0.id')

  // 2. 유지보수 상세
  const getRes = http.get(`${BASE_URL}/maintenances/${maintenanceId}`, authHeaders)
  check(getRes, { 'getById 200': (r) => r.status === 200 })

  // 3. 내 유지보수 목록
  const myRes = http.get(`${BASE_URL}/maintenances/my`, authHeaders)
  check(myRes, { 'my 200': (r) => r.status === 200 })

  // 4. 유지보수 생성
  const createRes = http.post(
    `${BASE_URL}/maintenances`,
    JSON.stringify({
      assetId: ASSET_ID,
      title: `k6-smoke-maintenance-${Date.now()}`,
      description: 'k6 smoke test',
      scheduledAt: '2026-12-01T09:00:00.000Z',
    }),
    authHeaders,
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.id 존재': (r) => !!r.json('id'),
  })
  const newId = createRes.json('id')

  // 5. 유지보수 수정
  const updateRes = http.patch(
    `${BASE_URL}/maintenances/${newId}`,
    JSON.stringify({ title: `k6-smoke-updated-${Date.now()}` }),
    authHeaders,
  )
  check(updateRes, { 'update 200': (r) => r.status === 200 })

  // 6. 취소 (본인 취소 가능 여부 — APPROVED 상태는 취소 불가이므로 결과 확인만)
  const cancelRes = http.post(
    `${BASE_URL}/maintenances/${newId}/cancel`,
    JSON.stringify({}),
    authHeaders,
  )
  check(cancelRes, { 'cancel 응답 수신': (r) => r.status === 200 || r.status === 400 })
}
