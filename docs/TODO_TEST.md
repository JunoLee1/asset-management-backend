# 도메인별 테스트 TODO

## 범례
- ✅ 완료
- 🔲 미완료
- ➖ 해당 없음

---

## 1. Auth `/auth`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ 9/9 PASS |
| Stress | ✅ 490/490 PASS, 에러율 0% — login p(95) 982ms (임계값 1,000ms 근접, 주의) |
| 보안 — 인증 우회 (토큰 없음/변조/alg:none) | ✅ |
| 보안 — 브루트포스 / Rate Limiting | ✅ 단계별 차단 적용 (`feat/progressive-rate-limit`) — 5회→10분, 10회→30분, 15회→1시간, 20회→24시간 |
| 보안 — Refresh 토큰 재사용 | ✅ 로그아웃 후 재사용 차단 확인 |

---

## 2. Admin `/admin`, `/admin/detected-software`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/admin-smoke.js` 8/8 PASS |
| Stress | ✅ `k6/admin-stress.js` 32,320/32,320 PASS, 에러율 0% |
| 보안 — USER → ADMIN 전용 접근 차단 | ✅ summary, invite, deactivate 모두 403 |
| 보안 — TEAM_LEAD → ADMIN 전용 접근 차단 | ✅ 비활성화, 역할 변경 모두 403 |
| 보안 — 유저 정보 IDOR (USER → 타인 조회) | ✅ 403 차단 |
| 보안 — 역할 변경 Mass Assignment | ✅ TEAM_LEAD 역할 변경 시도 403 차단 |
| 보안 — 팀원(USER) 권한 경계 검증 | ✅ 목록/상세/초대/비활성화 모두 403 |
| 보안 — 팀장(TEAM_LEAD) 권한 경계 검증 | ✅ ADMIN 전용 작업 403 차단 |
| 보안 — 부서장(DEPT_LEAD) 권한 경계 검증 | ✅ 목록/상세 허용, ADMIN 전용(초대/비활성화/역할변경/요약) 403 차단 |

---

## 3. Software `/software`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/software-smoke.js` |
| Stress | ✅ `k6/software-stress.js` |
| 보안 — 입력값 퍼징 (SQL injection, XSS, 오버사이즈) | ✅ |
| 보안 — 오버사이즈 문자열 차단 | ✅ 수정 완료 (`fix/input-length-validation`) |
| 보안 — 권한 상승 (USER → ADMIN) | ✅ |

---

## 4. License `/licenses`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/license-smoke.js` 11/11 PASS |
| Stress | ✅ `k6/license-seat-race.js` PASS — 잔여 3석에 7건 동시 요청, 3건만 통과 (TOCTOU 수정 완료 `fix/license-seat-race-condition`) |
| 보안 — productKey 노출 (역할별) | ✅ |
| 보안 — IDOR (다른 유저 라이선스 접근) | ✅ 403 차단 확인 |
| 보안 — 라이선스 요청 권한 우회 | ✅ 역할별·단계별 모두 차단 확인 |

---

## 5. Assets `/assets`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/asset-smoke.js` 11/11 PASS |
| Stress | ✅ `k6/asset-stress.js` 65,986/65,986 PASS, 에러율 0% |
| 보안 — IDOR (다른 부서 자산 접근) | ✅ OPERATING 타인 할당 자산 403 차단 (IDLE은 대여 신청용 허용) |
| 보안 — USER → 자산 생성/수정 권한 차단 | ✅ 403 차단 |
| 보안 — 입력값 퍼징 (오버사이즈 name) | ✅ 403 차단 (권한 선차단) |
| 보안 — 오버사이즈 차단 | ✅ 스키마 수정 완료 (`fix/input-length-validation`) |

---

## 6. Master `/master` (부서·팀·위치)

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/master-smoke.js` 13/13 PASS |
| Stress | ✅ `k6/master-stress.js` 93,367/93,367 PASS, 에러율 0% |
| 보안 — USER/TEAM_LEAD → 부서 생성/수정/삭제 차단 | ✅ 전부 403 (Burp 확인) |
| 보안 — USER → 위치 생성 차단 | ✅ 403 차단 |

---

## 7. Maintenance `/maintenances`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/maintenance-smoke.js` 9/9 PASS |
| Stress | ✅ `k6/maintenance-stress.js` 51,703/51,703 PASS, 에러율 0% |
| 보안 — USER → 승인/거절/assign 권한 우회 | ✅ 전부 403 차단 (Burp 확인) |
| 보안 — IDOR (타인 유지보수 수정 시도) | ✅ 403 차단 |

---

## 8. Loans `/loans`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/loan-smoke.js` 8/8 PASS |
| Stress | ✅ `k6/loan-stress.js` 58,633/58,633 PASS, 에러율 0% |
| 보안 — USER → approve/checkout 권한 우회 | ✅ 403 차단 (Burp 확인) |
| 보안 — USER → 타인 대여 취소 IDOR | ✅ 403 차단 |
| 보안 — 동시 대여 race condition | ✅ create race: 1건만 통과 4건 거부 / checkout race: 3건 동시 시도 1건만 성공 2건 차단 |

---

## 9. Disposals `/disposals`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/disposal-smoke.js` 7/7 PASS |
| Stress | ✅ `k6/disposal-stress.js` 83,933/83,933 PASS, 에러율 0% |
| 보안 — USER/TEAM_LEAD → 목록/생성/승인/완료 권한 우회 | ✅ 전부 403 차단 (Burp 확인) |
| 보안 — 동시 폐기 race condition | ✅ 5건 동시 complete 시도 → 1건만 성공, 4건 409 차단 |

---

## 10. Catalogs `/catalogs`

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/catalog-smoke.js` 11/11 PASS |
| Stress | ✅ `k6/catalog-stress.js` 78,945/78,945 PASS, 에러율 0% |
| 보안 — GET(목록/상세) 인증만 필요, 모든 역할 허용 | ✅ USER 조회 성공 확인 |
| 보안 — POST/PATCH/DELETE ADMIN 전용 차단 | ✅ USER/TEAM_LEAD 403 차단 (Burp 확인) |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — 입력값 퍼징 | ✅ SQL injection 안전, 오버사이즈/javascript:URL 수정 완료 (`fix/catalog-input-validation`) |

---

## 11. Dashboard `/dashboard`

> 역할별 다른 데이터 반환 (USER/TEAM_LEAD/DEPT_LEAD 등 서비스 레이어 분기)

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/dashboard-smoke.js` 12/12 PASS (ADMIN/TEAM_LEAD/DEPT_LEAD/REPAIR_OWNER 역할별) |
| Stress | ✅ `k6/dashboard-stress.js` 34,557/34,557 PASS, 에러율 0%, p(95) 83ms |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — 역할별 데이터 노출 범위 | ✅ USER/ADMIN 동일 구조 반환 (서비스 레이어 분기는 데이터 필터링 레벨) |

---

## 12. Analytics `/analytics`

> 인증만 필요, 역할 제한 없음 — 서비스 레이어 내부 분기 확인 필요

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/analytics-smoke.js` 8/8 PASS |
| Stress | ✅ `k6/analytics-stress.js` 31,219/31,219 PASS, 에러율 0% |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — 민감 집계 데이터 역할별 노출 범위 | ✅ USER 접근 허용 (역할 제한 없음 — 의도된 설계) |

---

## 13. Depreciations `/depreciations`

> `requireManager()` — ADMIN 또는 ASSET_MANAGER만 쓰기 가능

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/depreciation-smoke.js` 6/6 PASS |
| Stress | ✅ `k6/depreciation-stress.js` 98,883/98,883 PASS, 에러율 0% |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — USER/TEAM_LEAD → upsert/delete 차단 | ✅ 403 차단 (Burp 확인) |
| 보안 — GET 모든 역할 허용 | ✅ USER 조회 성공 확인 |

---

## 14. Manufacturers `/manufacturers`

> `requireAdmin()` — ADMIN만 쓰기 가능 (catalog과 동일 패턴)

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/manufacturer-smoke.js` 8/8 PASS |
| Stress | ✅ `k6/manufacturer-stress.js` 116,709/116,709 PASS, 에러율 0% |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — GET 모든 역할 허용 | ✅ USER 조회 성공 |
| 보안 — POST/PATCH/DELETE ADMIN 전용 차단 | ✅ USER/TEAM_LEAD 403 차단 (Burp 확인) |
| 보안 — 입력값 퍼징 | 🔲 |

---

## 15. Notifications `/notifications`

> 인증만 필요, 본인 알림만 조회 가능

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/notification-smoke.js` 4/4 PASS |
| Stress | ✅ `k6/notification-stress.js` 100,323/100,323 PASS, 에러율 0% |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — 다른 유저 알림 read IDOR 차단 | ✅ 403 차단 |
| 보안 — USER → process-outbox 차단 (ADMIN 전용) | ✅ 403 차단 |

---

## 16. Reports `/reports`, `/repair-reports`

> TEAM_LEAD/DEPT_LEAD/ADMIN/ASSET_MANAGER만 접근 가능 (authorize 미들웨어)

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/reports-smoke.js` 6/6 PASS |
| Stress | ✅ `k6/reports-stress.js` 85,151/85,151 PASS, 에러율 0% |
| 보안 — USER → 수리/월말 리포트 접근 차단 | ✅ 403 차단 (Burp 확인) |
| 보안 — TEAM_LEAD → monthly-dept 접근 차단 (DEPT_LEAD 전용) | ✅ 403 차단 |
| 보안 — 인증 없는 접근 차단 | ✅ 401 차단 |
| 보안 — 보고서 승인/거절 플로우 | ✅ submit/review/reject/acknowledge 상태전이로 처리 (별도 approve 없음) |

---

## 17. Security Reports `/security-reports`

> SECURITY_OFFICER 전용 보안 리포트 도메인

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | 🔲 |
| Stress | 🔲 |
| 보안 — USER/TEAM_LEAD → 접근 시도 (SECURITY_OFFICER 전용) | 🔲 |
| 보안 — SECURITY_OFFICER → 리포트 생성/수정/제출/삭제 | 🔲 |
| 보안 — ADMIN → 리포트 조회 (허용 역할) | 🔲 |
| 보안 — 민감 정보(SW 차단 현황) 노출 범위 | 🔲 |

---

## 18. Security SW 관리 `/software`, `/admin/detected-software`

> SECURITY_OFFICER 권한 경계 검증 — 이미 일부 완료

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | ✅ `k6/software-smoke.js` | Section 3 참고 |
| Stress | ✅ `k6/software-stress.js` | Section 3 참고 |
| 보안 — 입력값 퍼징 / 오버사이즈 차단 | ✅ | Section 3 참고 |
| 보안 — USER → SW 카탈로그 접근 차단 | ✅ | Section 3 참고 |
| 보안 — SECURITY_OFFICER → detected-software approve/reject | 🔲 |
| 보안 — USER/TEAM_LEAD → detected-software approve/reject 차단 | 🔲 |
| 보안 — SECURITY_OFFICER → SW permission 변경 권한 | 🔲 |

---

## 19. Agent `/agent`, Webhooks `/webhooks`

> `/agent` — JWT 인증 필요 / `/webhooks/mailgun-inbound` — 인증 없음 (외부 수신용)

| 항목 | 상태 | 비고 |
|---|---|---|
| Smoke | 🔲 |
| Stress | 🔲 |
| 보안 — `/agent` 인증 없는 접근 차단 | 🔲 |
| 보안 — `/webhooks/mailgun-inbound` 인증 없이 접근 가능 여부 확인 | 🔲 | 외부 수신용이므로 의도된 설계인지 확인 필요 |
| 보안 — webhook payload 변조 가능 여부 (HMAC 서명 검증 유무) | 🔲 |

---

## 공통 보안 테스트 (전 도메인)

| 항목 | 상태 |
|---|---|
| Rate Limiting (브루트포스) | ✅ 단계별 누적 잠금 적용 (5/10/15/20회) |
| IDOR (ID 추측 접근) | ✅ 라이선스·자산 모두 차단 확인 |
| 에러 메시지 스택트레이스 노출 | 🔲 |
| XSS 저장 후 프론트 sanitize | 🔲 |
