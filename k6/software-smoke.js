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

  // 1. list — suggestedJobTypes 없이도 목록 정상 반환
  const listRes = http.get(`${BASE_URL}/software`, authHeaders)
  check(listRes, {
    'list 200': (r) => r.status === 200,
    'list 배열': (r) => Array.isArray(r.json()),
  })

  // 2. create — suggestedJobTypes 포함
  const uniqueName = `k6-sw-smoke-${Date.now()}`
  const createRes = http.post(
    `${BASE_URL}/software`,
    JSON.stringify({
      name: uniqueName,
      vendor: 'k6-vendor',
      suggestedJobTypes: ['DESIGNER', 'DEVELOPER'],
    }),
    authHeaders,
  )
  check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.suggestedJobTypes 저장': (r) => {
      const jt = r.json('suggestedJobTypes')
      return Array.isArray(jt) && jt.length === 2
    },
  })
  const id = createRes.json('id')

  // 3. getById — suggestedJobTypes 반환 확인
  const getRes = http.get(`${BASE_URL}/software/${id}`, authHeaders)
  check(getRes, {
    'getById 200': (r) => r.status === 200,
    'getById.suggestedJobTypes 포함': (r) => Array.isArray(r.json('suggestedJobTypes')),
    'getById.suggestedJobTypes 값 일치': (r) => {
      const jt = r.json('suggestedJobTypes')
      return jt.includes('DESIGNER') && jt.includes('DEVELOPER')
    },
  })

  // 4. update — suggestedJobTypes만 변경
  const updateRes = http.patch(
    `${BASE_URL}/software/${id}`,
    JSON.stringify({ suggestedJobTypes: ['DESIGNER'] }),
    authHeaders,
  )
  check(updateRes, {
    'update 200': (r) => r.status === 200,
    'update.suggestedJobTypes 갱신': (r) => {
      const jt = r.json('suggestedJobTypes')
      return Array.isArray(jt) && jt.length === 1 && jt[0] === 'DESIGNER'
    },
  })

  // 5. update — suggestedJobTypes 빈 배열로 초기화
  const clearRes = http.patch(
    `${BASE_URL}/software/${id}`,
    JSON.stringify({ suggestedJobTypes: [] }),
    authHeaders,
  )
  check(clearRes, {
    'update(clear) 200': (r) => r.status === 200,
    'update(clear).suggestedJobTypes 빈 배열': (r) => {
      const jt = r.json('suggestedJobTypes')
      return Array.isArray(jt) && jt.length === 0
    },
  })

  // 6. delete
  const deleteRes = http.del(`${BASE_URL}/software/${id}`, null, authHeaders)
  check(deleteRes, { 'delete 204': (r) => r.status === 204 })

  // 7. delete 후 조회는 404
  const getAfterDeleteRes = http.get(`${BASE_URL}/software/${id}`, authHeaders)
  check(getAfterDeleteRes, { 'delete 후 getById는 404': (r) => r.status === 404 })
}
