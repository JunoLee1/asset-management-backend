import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'
const IDLE_ASSET_ID = __ENV.IDLE_ASSET_ID || 'cmuf725zk000djoqoncvaqxa6'

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

  // 1. 대여 목록
  const listRes = http.get(`${BASE_URL}/loans?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const loanId = listRes.json('items.0.id')

  // 2. 대여 상세
  const getRes = http.get(`${BASE_URL}/loans/${loanId}`, authHeaders)
  check(getRes, { 'getById 200': (r) => r.status === 200 })

  // 3. 내 대여 목록
  const myRes = http.get(`${BASE_URL}/loans/my`, authHeaders)
  check(myRes, { 'my 200': (r) => r.status === 200 })

  // 4. 연체 목록
  const overdueRes = http.get(`${BASE_URL}/loans/overdue`, authHeaders)
  check(overdueRes, { 'overdue 200': (r) => r.status === 200 })

  // 5. 대여 생성
  const createRes = http.post(
    `${BASE_URL}/loans`,
    JSON.stringify({
      assetId: IDLE_ASSET_ID,
      purpose: `k6-smoke-loan-${Date.now()}`,
      expectedReturnDate: '2026-12-31T00:00:00.000Z',
    }),
    authHeaders,
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.id 존재': (r) => !!r.json('id'),
  })
}
