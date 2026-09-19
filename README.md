# 자산관리 ERP — Backend

Express 5 + TypeScript + Prisma + PostgreSQL 기반 기업 자산관리 ERP 백엔드.

**Live API:** https://asset-erp-backend.fly.dev  
**Frontend:** https://github.com/JunoLee1/asset-management-erp

---

## 테스트 계정

비밀번호 공통: `test1234!`

| 이메일 | 역할 | 설명 |
|---|---|---|
| `admin-1@verify.local` | ADMIN | 전체 권한 |
| `asset-mgr-1@verify.local` | ASSET_MANAGER | 자산 등록·출고·검수 |
| `manager-1@verify.local` | TEAM_LEAD | 팀 대여 승인 |
| `dept-lead-1@verify.local` | DEPT_LEAD | 부서 승인·월말보고서 확정 |
| `user-normal@verify.local` | USER | 일반 사원 (대여 신청) |
| `sec-officer-1@verify.local` | SECURITY_OFFICER | 보안 모니터링·보고서 |
| `repair-owner-1@verify.local` | REPAIR_OWNER | 수리업체 담당자 |

---

## 주요 API

### 인증
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/auth/login` | 로그인 (accessToken + refreshToken) |
| POST | `/auth/refresh` | 토큰 갱신 |
| POST | `/auth/logout` | 로그아웃 |

### 자산
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/assets` | 자산 목록 (페이지네이션, 필터, 검색) |
| POST | `/assets` | 자산 등록 |
| GET | `/assets/:id` | 자산 상세 |
| PATCH | `/assets/:id` | 자산 수정 |
| GET | `/assets/stats/by-model` | 모델별 보유 현황 |

### 대여
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/loans` | 대여 목록 |
| POST | `/loans` | 대여 신청 |
| POST | `/loans/:id/approve` | 승인 (팀장→부서장→관리자 단계별) |
| POST | `/loans/:id/checkout` | 출고 처리 |
| POST | `/loans/:id/inspect` | 반납 검수 |
| POST | `/loans/:id/return` | 반납 완료 |
| POST | `/loans/:id/recall` | 회수 |

### 수리·유지보수
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/maintenances` | 정비 목록 |
| POST | `/maintenances` | 정비 등록 |
| PATCH | `/maintenances/:id/status` | 상태 변경 |

### 폐기
| 메서드 | 경로 | 설명 |
|---|---|---|
| POST | `/disposals` | 폐기 신청 |
| POST | `/disposals/:id/approve` | 폐기 승인 |
| POST | `/disposals/:id/complete` | 폐기 완료 |
| GET | `/disposals/assets` | 폐기 자산 대장 (Excel 내보내기 포함) |

### 보고서
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/reports/summary` | 보고서 허브 요약 |
| GET | `/reports/monthly-team` | 팀 월말보고서 목록 |
| POST | `/reports/monthly-team/:id/submit` | 팀 보고서 제출 |
| POST | `/reports/monthly-dept/:id/finalize` | 부서 보고서 확정 |
| GET | `/reports/security` | 보안 월간 보고서 목록 |

### 보안 모니터링
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET | `/security/dashboard` | 보안 현황 집계 |
| GET | `/software` | 소프트웨어 인벤토리 |
| POST | `/agent/collect` | 엔드포인트 에이전트 수집 데이터 적재 |
| GET | `/admin/detected-software` | 미승인 소프트웨어 검토 큐 |

### 마스터 데이터
| 메서드 | 경로 | 설명 |
|---|---|---|
| GET/POST | `/master/departments` | 부서 |
| GET/POST | `/master/vendors` | 공급업체 |
| GET/POST | `/master/asset-categories` | 자산 카테고리 |
| GET/POST | `/catalog` | 자산 카탈로그 (모델) |
| GET/POST | `/manufacturer` | 제조사 |

---

## 기술 스택

- **런타임:** Node.js + Express 5 + TypeScript
- **ORM:** Prisma + PostgreSQL
- **인증:** JWT (Access 15m / Refresh DB 검증) + 단일 세션 강제
- **스케줄러:** node-cron (라이선스 만료 알림, 월말보고서 자동 생성)
- **배포:** fly.io

## 프로젝트 구조

```
src/
├── modules/          # 도메인별 router + service (18개 모듈)
├── middlewares/      # authenticate, authorize, errorHandler
├── schemas/          # Zod 입력 검증 스키마
├── lib/              # 유틸리티 (krBusinessNumber 등)
└── index.ts          # 서버 진입점
prisma/
├── schema.prisma     # 전체 도메인 스키마
└── seed.ts           # 테스트 데이터 시드
docs/adr/             # 아키텍처 결정 기록 (ADR 0001~0017)
```
# asset-management-backend
