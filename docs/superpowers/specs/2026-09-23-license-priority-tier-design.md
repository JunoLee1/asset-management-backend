# 라이선스 승인 대기열 우선순위 표시 — 설계

## 배경

k6 `license-seat-race.js` 테스트로 라이선스 좌석 동시성 가드를 검증하는 과정에서,
"좌석이 부족할 때 누가 우선인가"라는 질문이 나왔다. 현재 구현
(`license.service.ts`의 `request()`)은 DB row lock(`SELECT ... FOR UPDATE`)으로
좌석 초과 할당만 막을 뿐, 신청자 중 누구를 먼저 승인할지에 대한 비즈니스 기준은
전혀 없다 — 동시에 도착한 요청 중 어느 것이 이기는지는 Postgres 락 획득 순서에
달려있고, 그마저도 결정적이지 않다.

## 문제 정의

관리자가 `PENDING_ADMIN` 단계의 라이선스 요청 대기열을 검토할 때, 어떤 요청을
먼저 승인해야 할지 판단할 근거(정렬/표시)가 없다.

## 범위

**포함**
- 라이선스별 "핵심 부서" 지정 (데이터 모델 + 생성/수정 API)
- 요청 목록 조회 시 우선순위 티어 계산 및 정렬 (`GET /licenses/:id/requests`)
- 백엔드 API·데이터 모델·검증 스키마

**제외 (이번 스코프 아님)**
- 프론트엔드 (현재 프론트에는 라이선스 승인 요청 관련 화면 자체가 없음 — 향후 별도 프로젝트)
- 2순위(프로젝트/계약 기반), 3순위(빈번 사용) 티어 — 근거 데이터(프로젝트 마감일,
  실제 사용 빈도)가 시스템에 없어 이번엔 1순위(핵심부서)/4순위(기본값) 2단계만 구현
- 자동 좌석 배정 로직 변경 — 승인/거절은 계속 관리자가 수동으로 판단. 이 기능은
  대기열을 "보여주는" 정렬 보조일 뿐, 누가 좌석을 받을지 시스템이 대신 결정하지 않음
- k6 `license-seat-race.js`의 검증식 버그(`ok.length <= 1` 하드코딩, 400/409 불일치) —
  별도로 알려진 이슈, 이번 스펙과 무관

## 설계

### 1. 데이터 모델

`License`에 필드 추가:

```prisma
model License {
  // ...기존 필드
  coreDepartmentIds String[] @default([])
}
```

- 기존 `aliases`(catalog), `certifications`(user) 필드와 동일하게 raw `String[]`
  패턴 사용 — 이 스키마의 기존 컨벤션과 일치, 별도 join 테이블 불필요
- `@default([])`라 기존 라이선스 레코드에 영향 없는 additive 마이그레이션
- FK 제약은 걸지 않음(다른 `String[]` 필드들과 동일) — Department가 삭제되면
  dangling id가 남을 수 있으나, 우선순위 계산 시 존재하지 않는 department는
  자연히 매칭되지 않아 안전하게 무시됨

### 2. 우선순위 계산

**기준: 신청자(requestedBy)가 아니라 대상자(targetUser)의 부서.**
관리자가 대신 신청하는 경우가 있어, "누가 실제로 이 라이선스를 업무에 쓰는가"는
`targetUserId` 기준이 맞다고 판단.

```
priorityTier =
  targetUser.team?.departmentId가 license.coreDepartmentIds에 포함 → 'CORE'
  아니면→ 'DEFAULT'
```

- `targetUser`가 소속 팀이 없거나(team null) 팀에 부서가 없는 경우 → `DEFAULT`
  (에러 아님, 그냥 최하위 우선순위로 취급)
- `license.coreDepartmentIds`가 비어있으면(기본값) 전원 `DEFAULT` — 즉 이 필드를
  설정 안 한 기존 라이선스는 지금과 동일한 동작(순수 `createdAt` 정렬)

### 3. `listRequests()` 변경

`src/modules/licenses/license.service.ts`

- `targetUser` include에 `team: { select: { departmentId: true } }` 추가
- `license` include에 `coreDepartmentIds` 추가 (또는 별도 조회)
- 매핑 시 각 row에 `priorityTier` 계산해서 추가
- 정렬: 기존 `orderBy: { createdAt: 'desc' }`(Prisma 쿼리 레벨) 대신, 조회 후
  애플리케이션 레벨에서 `[...CORE(createdAt desc), ...DEFAULT(createdAt desc)]`로 재정렬
  (Prisma만으로는 "계산된 필드" 기준 정렬이 안 되므로 in-memory sort 필요 —
  대기열 규모가 페이지네이션 없는 라이선스당 요청 목록이라 성능 문제 없음)

### 4. API 계약 변경

- `POST /licenses`, `PATCH /licenses/:id`: body에 `coreDepartmentIds?: string[]` 허용
- `GET /licenses/:id/requests`: 응답 배열의 각 아이템에 `priorityTier: 'CORE' | 'DEFAULT'` 추가

### 5. 검증 스키마

`src/schemas/` 내 라이선스 생성/수정 zod 스키마에 추가:
```ts
coreDepartmentIds: z.array(z.string()).optional()
```
department id 존재 여부는 검증하지 않음(느슨한 검증 — 위 dangling id 처리와 일관).

## 테스트 계획

- 서비스 유닛 테스트: `coreDepartmentIds`에 포함된 부서 소속 targetUser의 요청이
  `CORE`로 분류되는지, 없으면 `DEFAULT`인지
- `listRequests` 정렬 순서: CORE가 DEFAULT보다 항상 앞에 오는지, 각 티어 내부는
  createdAt desc 유지되는지
- 기존 라이선스(coreDepartmentIds 미설정)의 요청 목록이 기존과 동일한 순서로
  나오는지 (회귀 확인)
- create/update API가 `coreDepartmentIds`를 정상 저장/갱신하는지

## 미해결 질문 (구현 중 확인 필요)

- `listRequests`가 페이지네이션 없이 전체를 반환하는 현재 구조가 유지된다는 전제.
  향후 페이지네이션이 추가되면 in-memory 정렬 방식을 재검토해야 함.
