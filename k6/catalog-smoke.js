import http from 'k6/http'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3001'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

// 시드 데이터에 이미 있는 카테고리/제조사 — smoke 전용, 삭제하지 않음
const CATEGORY_ID = __ENV.CATEGORY_ID || 'cmr4bt4m00007kqqopwa5m8n5' // 노트북 (IT_ASSET)
const MANUFACTURER_ID = __ENV.MANUFACTURER_ID || 'mfg_apple'

export const options = {
  vus: 1,
  iterations: 1,
}

export default function () {
  // 0. login
  const loginRes = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )
  check(loginRes, { 'login 200': (r) => r.status === 200 })
  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${loginRes.json('tokens.accessToken')}`,
    },
  }

  // 1. list
  const listRes = http.get(`${BASE_URL}/catalogs?page=1&pageSize=20`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })

  // 2. search (q) — 한글 쿼리는 URL 인코딩 필요 (k6 http.get은 자동 인코딩하지 않음)
  const searchRes = http.get(`${BASE_URL}/catalogs?q=${encodeURIComponent('맥북')}`, authHeaders)
  check(searchRes, { 'search 200': (r) => r.status === 200 })

  // 3. create
  const uniqueName = `k6 스모크 카탈로그 ${Date.now()}`
  const createRes = http.post(
    `${BASE_URL}/catalogs`,
    JSON.stringify({
      name: uniqueName,
      class: 'IT_ASSET',
      categoryId: CATEGORY_ID,
      manufacturerId: MANUFACTURER_ID,
      modelCode: `K6-${Date.now()}`,
    }),
    authHeaders,
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.name 일치': (r) => r.json('name') === uniqueName,
  })
  const id = createRes.json('id')

  // 4. getById
  const getRes = http.get(`${BASE_URL}/catalogs/${id}`, authHeaders)
  check(getRes, { 'getById 200': (r) => r.status === 200 })

  // 5. update
  const updateRes = http.patch(
    `${BASE_URL}/catalogs/${id}`,
    JSON.stringify({ isActive: false }),
    authHeaders,
  )
  check(updateRes, {
    'update 200': (r) => r.status === 200,
    'update.isActive 반영': (r) => r.json('isActive') === false,
  })

  // 6. delete (asset이 참조하지 않으므로 성공해야 함)
  const deleteRes = http.del(`${BASE_URL}/catalogs/${id}`, null, authHeaders)
  check(deleteRes, { 'delete 204': (r) => r.status === 204 })

  // 7. delete 후 조회는 404
  const getAfterDeleteRes = http.get(`${BASE_URL}/catalogs/${id}`, authHeaders)
  check(getAfterDeleteRes, { 'delete 후 getById는 404': (r) => r.status === 404 })
}
