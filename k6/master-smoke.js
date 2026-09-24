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

  // 1. 부서 목록
  const deptListRes = http.get(`${BASE_URL}/master/departments`, authHeaders)
  check(deptListRes, {
    'departments list 200': (r) => r.status === 200,
    'departments 배열': (r) => Array.isArray(r.json()),
  })
  const deptId = deptListRes.json('0.id')

  // 2. 부서 상세
  const deptGetRes = http.get(`${BASE_URL}/master/departments/${deptId}`, authHeaders)
  check(deptGetRes, { 'departments getById 200': (r) => r.status === 200 })

  // 3. 팀 목록
  const teamListRes = http.get(`${BASE_URL}/master/teams`, authHeaders)
  check(teamListRes, { 'teams list 200': (r) => r.status === 200 })

  // 4. 위치 목록
  const locListRes = http.get(`${BASE_URL}/master/locations`, authHeaders)
  check(locListRes, { 'locations list 200': (r) => r.status === 200 })
  const locId = locListRes.json('0.id')

  // 5. 위치 상세
  const locGetRes = http.get(`${BASE_URL}/master/locations/${locId}`, authHeaders)
  check(locGetRes, { 'locations getById 200': (r) => r.status === 200 })

  // 6. 카테고리 목록
  const catListRes = http.get(`${BASE_URL}/master/categories`, authHeaders)
  check(catListRes, { 'categories list 200': (r) => r.status === 200 })

  // 7. 제조사 목록 (/manufacturers 별도 라우트)
  const mfrListRes = http.get(`${BASE_URL}/manufacturers`, authHeaders)
  check(mfrListRes, { 'manufacturers list 200': (r) => r.status === 200 })

  // 8. 벤더 목록
  const vendorListRes = http.get(`${BASE_URL}/master/vendors`, authHeaders)
  check(vendorListRes, { 'vendors list 200': (r) => r.status === 200 })

  // 9. 부서 생성 (ADMIN 전용)
  const deptCreateRes = http.post(
    `${BASE_URL}/master/departments`,
    JSON.stringify({ name: `k6-dept-${Date.now()}`, code: `K6-${Date.now()}` }),
    authHeaders,
  )
  check(deptCreateRes, { 'departments create 201': (r) => r.status === 201 })
  const newDeptId = deptCreateRes.json('id')

  // 10. 부서 수정
  const deptUpdateRes = http.patch(
    `${BASE_URL}/master/departments/${newDeptId}`,
    JSON.stringify({ name: `k6-dept-updated-${Date.now()}` }),
    authHeaders,
  )
  check(deptUpdateRes, { 'departments update 200': (r) => r.status === 200 })

  // 11. 부서 삭제 (소프트 삭제 — 200 반환)
  const deptDeleteRes = http.del(`${BASE_URL}/master/departments/${newDeptId}`, null, authHeaders)
  check(deptDeleteRes, { 'departments delete 200': (r) => r.status === 200 })
}
