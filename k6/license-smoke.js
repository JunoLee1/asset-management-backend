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

  // 1. list
  const listRes = http.get(`${BASE_URL}/licenses?page=1&pageSize=10`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list.items 배열': (r) => Array.isArray(r.json('items')),
  })
  const licId = listRes.json('items.0.id')

  // 2. getById
  const getRes = http.get(`${BASE_URL}/licenses/${licId}`, authHeaders)
  check(getRes, {
    'getById 200': (r) => r.status === 200,
    'getById.suggestedCoreJobTypes 포함': (r) => Array.isArray(r.json('suggestedCoreJobTypes')),
  })

  // 3. create
  const uniqueName = `k6-smoke-lic-${Date.now()}`
  const createRes = http.post(
    `${BASE_URL}/licenses`,
    JSON.stringify({
      name: uniqueName,
      seatsTotal: 5,
      purchaseDate: '2026-01-01T00:00:00.000Z',
    }),
    authHeaders,
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.name 일치': (r) => r.json('name') === uniqueName,
  })
  const newId = createRes.json('id')

  // 4. update
  const updateRes = http.patch(
    `${BASE_URL}/licenses/${newId}`,
    JSON.stringify({ seatsTotal: 10 }),
    authHeaders,
  )
  check(updateRes, {
    'update 200': (r) => r.status === 200,
    'update.seatsTotal 반영': (r) => r.json('seatsTotal') === 10,
  })

  // 5. delete
  const deleteRes = http.del(`${BASE_URL}/licenses/${newId}`, null, authHeaders)
  check(deleteRes, { 'delete 204': (r) => r.status === 204 })

  // 6. delete 후 조회는 404
  const getAfterDelete = http.get(`${BASE_URL}/licenses/${newId}`, authHeaders)
  check(getAfterDelete, { 'delete 후 getById는 404': (r) => r.status === 404 })
}
