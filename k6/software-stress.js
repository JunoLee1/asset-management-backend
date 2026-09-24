import http from 'k6/http'
import { check } from 'k6'

// Software create+getById+update(suggestedJobTypes) 경로의 동시 부하 테스트.
// suggestedJobTypes 배열 필드가 고부하 쓰기·읽기에서도 정합성을 유지하는지 확인한다.
const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080'
const EMAIL = __ENV.ADMIN_EMAIL || 'admin-1@verify.local'
const PASSWORD = __ENV.ADMIN_PASSWORD || 'test1234!'

export const options = {
  stages: [
    { duration: '20s', target: 20 },
    { duration: '20s', target: 50 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    'http_req_duration{name:create}': ['p(95)<1500'],
    'http_req_duration{name:getById}': ['p(95)<800'],
    'http_req_duration{name:update}': ['p(95)<1000'],
    'http_req_duration{name:list}': ['p(95)<1000'],
  },
}

export function setup() {
  const res = http.post(
    `${BASE_URL}/auth/login`,
    JSON.stringify({ email: EMAIL, password: PASSWORD }),
    { headers: { 'Content-Type': 'application/json' } },
  )
  check(res, { '로그인 200': (r) => r.status === 200 })
  return { accessToken: res.json('tokens.accessToken') }
}

export default function (data) {
  const authHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.accessToken}`,
    },
  }

  // list
  const listRes = http.get(`${BASE_URL}/software`, {
    headers: { Authorization: `Bearer ${data.accessToken}` },
    tags: { name: 'list' },
  })
  check(listRes, { 'list 200': (r) => r.status === 200 })

  // create with suggestedJobTypes
  const uniqueName = `k6-sw-stress-${Date.now()}-${Math.random()}`
  const createRes = http.post(
    `${BASE_URL}/software`,
    JSON.stringify({
      name: uniqueName,
      vendor: 'k6-stress-vendor',
      suggestedJobTypes: ['DEVELOPER'],
    }),
    { ...authHeaders, tags: { name: 'create' } },
  )
  const created = check(createRes, {
    'create 201': (r) => r.status === 201,
    'create.suggestedJobTypes 저장': (r) => {
      const jt = r.json('suggestedJobTypes')
      return Array.isArray(jt) && jt[0] === 'DEVELOPER'
    },
  })

  if (!created) return

  const id = createRes.json('id')
  if (!id) return

  // getById — 저장된 suggestedJobTypes 조회
  const getRes = http.get(`${BASE_URL}/software/${id}`, {
    ...authHeaders,
    tags: { name: 'getById' },
  })
  check(getRes, {
    'getById 200': (r) => r.status === 200,
    'getById.suggestedJobTypes 정합성': (r) => {
      const jt = r.json('suggestedJobTypes')
      return Array.isArray(jt) && jt.includes('DEVELOPER')
    },
  })

  // update suggestedJobTypes
  const updateRes = http.patch(
    `${BASE_URL}/software/${id}`,
    JSON.stringify({ suggestedJobTypes: ['DESIGNER', 'DEVELOPER'] }),
    { ...authHeaders, tags: { name: 'update' } },
  )
  check(updateRes, {
    'update 200': (r) => r.status === 200,
    'update.suggestedJobTypes 갱신': (r) => {
      const jt = r.json('suggestedJobTypes')
      return Array.isArray(jt) && jt.length === 2
    },
  })

  // cleanup — 생성한 SW 삭제
  http.del(`${BASE_URL}/software/${id}`, null, authHeaders)
}
