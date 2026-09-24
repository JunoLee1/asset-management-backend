import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'
const ASSET_ID = __ENV.ASSET_ID || 'cmuf725zk000djoqoncvaqxa6'

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

  // 1. 폐기 목록
  const listRes = http.get(`${BASE_URL}/disposals?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const disposalId = listRes.json('items.0.id')

  // 2. 폐기 상세
  const getRes = http.get(`${BASE_URL}/disposals/${disposalId}`, authHeaders)
  check(getRes, { 'getById 200': (r) => r.status === 200 })

  // 3. 폐기 신청 생성
  const createRes = http.post(
    `${BASE_URL}/disposals`,
    JSON.stringify({
      assetId: ASSET_ID,
      reason: 'SCRAP',
      criteria: { lowBookValue: true },
    }),
    authHeaders,
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.status PENDING_MANAGER': (r) => r.json('status') === 'PENDING_MANAGER',
  })
  const newId = createRes.json('id')

  // 4. 폐기 취소
  const cancelRes = http.post(
    `${BASE_URL}/disposals/${newId}/cancel`,
    JSON.stringify({}),
    authHeaders,
  )
  check(cancelRes, { 'cancel 200': (r) => r.status === 200 })
}
