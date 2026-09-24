import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

const CATALOG_ID = __ENV.CATALOG_ID || 'cmr4bt5f0001rkqqomhr8ml3k'   // 노트북 카탈로그
const CATEGORY_ID = __ENV.CATEGORY_ID || 'cmr4bt4m00007kqqopwa5m8n5'  // 노트북 카테고리
const DEPT_ID = __ENV.DEPT_ID || 'cmr4bt5y1003kkqqomtjseyvn'
const LOCATION_ID = __ENV.LOCATION_ID || 'cmr4bt5y4003mkqqonta9hqxk'

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

  // 1. 자산 목록 조회
  const listRes = http.get(`${BASE_URL}/assets?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const assetId = listRes.json('items.0.id')

  // 2. 자산 상세 조회
  const getRes = http.get(`${BASE_URL}/assets/${assetId}`, authHeaders)
  check(getRes, {
    'getById 200': (r) => r.status === 200,
    'getById.id 일치': (r) => r.json('id') === assetId,
  })

  // 3. 자산 히스토리 조회
  const historyRes = http.get(`${BASE_URL}/assets/${assetId}/history`, authHeaders)
  check(historyRes, { 'history 200': (r) => r.status === 200 })

  // 4. 모델별 통계
  const statsRes = http.get(`${BASE_URL}/assets/stats/by-model`, authHeaders)
  check(statsRes, { 'stats/by-model 200': (r) => r.status === 200 })

  // 5. 카탈로그 목록
  const catalogsRes = http.get(`${BASE_URL}/assets/catalogs`, authHeaders)
  check(catalogsRes, { 'catalogs 200': (r) => r.status === 200 })

  // 6. 자산 생성
  const createRes = http.post(
    `${BASE_URL}/assets`,
    JSON.stringify({
      name: `k6-smoke-asset-${Date.now()}`,
      class: 'IT_ASSET',
      categoryId: CATEGORY_ID,
      catalogId: CATALOG_ID,
      departmentId: DEPT_ID,
      locationId: LOCATION_ID,
      purchaseDate: '2026-01-01T00:00:00.000Z',
      purchasePrice: 100000,
      hardware: { serialNo: `K6-${Date.now()}`, cpu: 'Intel i7', ramGb: 16, storageGb: 512 },
    }),
    authHeaders,
  )
  check(createRes, { 'create 201': (r) => r.status === 201 })
  const newId = createRes.json('id')

  // 7. 자산 수정
  const updateRes = http.patch(
    `${BASE_URL}/assets/${newId}`,
    JSON.stringify({ status: 'IDLE' }),
    authHeaders,
  )
  check(updateRes, {
    'update 200': (r) => r.status === 200,
    'update.status 반영': (r) => r.json('status') === 'IDLE',
  })
}
