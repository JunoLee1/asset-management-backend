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

  // 1. 감가상각 목록
  const listRes = http.get(`${BASE_URL}/depreciations?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const assetId = listRes.json('items.0.assetId')

  // 2. 자산별 감가상각 조회
  const getRes = http.get(`${BASE_URL}/depreciations/${assetId}`, authHeaders)
  check(getRes, {
    'getByAssetId 200': (r) => r.status === 200,
    'getByAssetId.assetId 일치': (r) => r.json('assetId') === assetId,
  })

  // 3. 감가상각 등록/수정 (PUT upsert)
  const upsertRes = http.put(
    `${BASE_URL}/depreciations/${assetId}`,
    JSON.stringify({
      method: 'STRAIGHT_LINE',
      usefulLifeYears: 5,
      salvageValue: 0,
    }),
    authHeaders,
  )
  check(upsertRes, { 'upsert 200': (r) => r.status === 200 || r.status === 201 })
}
