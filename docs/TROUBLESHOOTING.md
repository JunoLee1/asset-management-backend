# 배포 트러블슈팅

Cloud Run + Cloud SQL 배포및 프로젝트 구현 과정에서 겪은 문제와 해결 방법 기록.

---

## 1. Docker 빌드 실패 — `ERR_PNPM_IGNORED_BUILDS`

**증상**
```
Error: ERR_PNPM_IGNORED_BUILDS
Ignored build scripts: @parcel/watcher, @prisma/engines, bcrypt, core-js, prisma, puppeteer, unrs-resolver
help: Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
```

**원인**
pnpm 10+ 부터 의존성의 postinstall 스크립트를 기본적으로 차단한다. `pnpm approve-builds`는 인터랙티브 명령이라 Docker 빌드(비-TTY) 안에서는 쓸 수 없다.

또한 이 설정의 저장 위치가 pnpm 버전에 따라 다르다:
- `package.json`의 `pnpm.onlyBuiltDependencies` → pnpm 10+ 에서 더 이상 읽지 않음 (경고만 뜨고 무시됨)
- `pnpm-workspace.yaml`의 `allowBuilds` → 실제로 동작하는 위치 (pnpm 12 기준)

**해결**

`pnpm-workspace.yaml`에 추가:
```yaml
allowBuilds:
  '@parcel/watcher': true
  '@prisma/engines': true
  bcrypt: true
  core-js: true
  prisma: true
  puppeteer: true
  unrs-resolver: true
```

확인 방법: `pnpm approve-builds --all`을 로컬(또는 컨테이너)에서 한 번 실행하면 이 형식 그대로 `pnpm-workspace.yaml`에 자동으로 써준다.

---

## 2. Docker 빌드는 되는데 `dist/`가 없음

**증상**
```
COPY --from=builder /app/dist ./dist
ERROR: "/app/dist": not found
```

**원인**
Dockerfile의 builder 스테이지가 `pnpm install`만 하고 실제 빌드(`pnpm run build` = `prisma generate && tsc`)를 실행하지 않았음.

**해결**
builder 스테이지의 `COPY . .` 다음에 `RUN pnpm run build` 추가.

---

## 3. Cloud Run: "container failed to start and listen on the port"

**증상**
```
The user-provided container failed to start and listen on the port defined
provided by the PORT=8080 environment variable within the allocated timeout.
```

**원인 (복합적)**
- `cloudrun.yaml`의 `containerPort`/`PORT` env가 실제 리스닝 포트와 불일치했음 (3001 vs 8080)
- `PORT`는 Cloud Run 예약 환경변수라 `env:` 목록에 직접 선언하면 안 됨 — Cloud Run이 `containerPort` 기준으로 자동 주입
- Dockerfile의 `CMD`가 `npx prisma migrate deploy && exec node dist/index.js` 형태라, 마이그레이션이 끝나야 포트가 열림 — DB 연결이 늦어지면 헬스체크 타임아웃에 걸림

**해결**
- Cloud run Port 8080 및 ENV 파일 내용 추가
- `containerPort: 8080`로 통일, `PORT` env 선언 제거
- `startupProbe`로 헬스체크 타임아웃 연장:
  ```yaml
  startupProbe:
    tcpSocket:
      port: 8080
    periodSeconds: 10
    failureThreshold: 30
    timeoutSeconds: 5
  ```

---

## 4. Secret Manager 관련

**증상 A** — 시크릿이 아예 없음
```
Permission denied on secret: projects/.../secrets/DATABASE_URL/versions/latest
```
IAM 권한을 줘도 계속 같은 에러가 남 → `gcloud secrets describe DATABASE_URL`로 확인해보면 `NOT_FOUND`. GCP는 "권한 없음"과 "존재하지 않음"을 구분해서 보여주지 않는다.

**해결**: `gcloud secrets create <NAME> --data-file=-`로 실제 값 채워서 생성. 이번 프로젝트는 시크릿 10개(`DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET` 등)가 하나도 없는 상태였음.

**증상 B** — 빈 값으로 시크릿을 만들려고 하면
```
ERROR: (gcloud.secrets.versions.add) INVALID_ARGUMENT: Secret Payload cannot be empty.
```
Secret Manager는 완전히 빈 payload를 허용하지 않는다.

**해결**: 아직 실제 값이 없는 선택적 항목(Google/Kakao OAuth, Gmail, Naver SMS 등)은 `cloudrun.yaml`의 `env:`에서 아예 선언을 빼버린다 — 앱 코드가 `process.env.X ?? ''`로 기본값 처리하는 경우, 미선언 = 빈 값과 동일하게 동작한다.

---

## 5. Cloud SQL 연결

**필요한 설정 3가지 (하나라도 빠지면 실패)**
1. `cloudrun.yaml`의 서비스 어노테이션에 Cloud SQL 인스턴스 연결:
   ```yaml
   run.googleapis.com/cloudsql-instances: 'PROJECT:REGION:INSTANCE'
   ```
2. Cloud Run 런타임 서비스 계정(기본은 `<PROJECT_NUMBER>-compute@developer.gserviceaccount.com`)에 `roles/cloudsql.client` 부여
3. `DATABASE_URL`을 유닉스 소켓 형식으로:
   ```
   postgresql://USER:PASSWORD@localhost/DB_NAME?host=/cloudsql/PROJECT:REGION:INSTANCE
   ```

**로컬에서 프로덕션 DB에 접근해야 할 때** (예: 시드 실행)
Cloud SQL Auth Proxy를 로컬에 띄운다. ADC가 없으면 `-g`(`--gcloud-auth`) 플래그로 이미 로그인된 gcloud 계정을 사용:
```bash
cloud-sql-proxy --gcloud-auth --port 5433 PROJECT:REGION:INSTANCE
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5433/DB_NAME" npx prisma db seed
```

---

## 6. Cloud Run 403 Forbidden (배포 성공 후)

**증상**
```
Error: Forbidden
Your client does not have permission to get URL / from this server.
```

**원인**
Cloud Run은 기본적으로 인증되지 않은 요청을 막지 않음. `google-github-actions/deploy-cloudrun`이나 `gcloud run services replace`로 배포해도 퍼블릭 접근은 자동으로 열리지 않는 문제.

**해결** (앱 자체가 JWT 등으로 자체 인증을 하는 공개 API라면):
```bash
gcloud run services add-iam-policy-binding SERVICE_NAME \
  --region=REGION --member="allUsers" --role="roles/run.invoker"
```

---

## 7. 로그인 500 에러 — 프론트엔드가 옛 백엔드 주소를 호출

**증상**
프론트엔드에서 로그인 시 500 에러 상태 코드 발생. 새로 배포한 백엔드(Cloud Run) 로그에는 아무 요청도 안 찍힘.

**원인**
프론트엔드(별도 저장소 `assetmanagement-web`)가 예전 fly.io 백엔드 URL(`https://asset-erp-backend.fly.dev`)을 여러 곳에 하드코딩하고 있었음 (`src/services/api.ts`, `src/services/master.service.ts`, `AssetImageUpload.tsx`, `nginx.conf`). Cloud Run으로 이전하면서 이 부분을 놓침.

**진단 팁**: 브라우저 Network 탭 응답 헤더에 `Server: Fly/...`, `fly-request-id`, `Via: 2 fly.io`가 보이면 여전히 fly.io를 호출 중인부분을 확인.

**해결**: 모든 하드코딩된 URL을 새 Cloud Run 백엔드 주소로 교체 후 재배포.

**주의**: SPA라서 배포 후에도 브라우저가 이미 로드한 옛 JS를 메모리에 들고 있으면 새로고침 없이는 계속 옛 동작을 한다 — 반드시 완전 새로고침(Cmd+Shift+R) 또는 새 탭/시크릿 창에서 확인할 것.

---
## 8. 정비 등록 API가 타부서 자산 요청을 막음 (k6 race 테스트에서 발견)

**증상**
`maintenance-approve-race.js` 실행 시 정비 신청 생성(`create`) 단계에서 403 발생 —
뒤따르는 동시성 검증(승인 10건 중 1건만 성공하는지) 자체를 시작도 못 함.

**원인**
정비 등록 API에는 "자신의 부서 소속 자산만 등록 가능"이라는 권한 체크가 있다.
k6 스크립트가 하드코딩한 요청자(`lead-dev@verify.local`, 개발본부 소속)와
대상 자산(`HAR-VRF-0001`, IT본부 소속)의 부서가 서로 달라 403으로 정상 차단됨.
**애플리케이션 버그 아님** — 권한 체크가 의도대로 동작한 것이고, 문제는 테스트
스크립트가 쓰던 유저/자산 조합이 (재시드 등으로) 더 이상 같은 부서가 아니게 된
것뿐이었음.

**해결**
요청자를 대상 자산과 같은 부서 소속 TEAM_LEAD로 교체
(`lead-dev` → `manager-1@verify.local`, IT본부). 수정 후 재실행 시 3/3 통과.

---

## 9. 라이선스 대여시 직무와 연관없는 라이선스 대여가능한 설계 결함

**원인**
라이선스 대여에 대한 기준이 없어서 직무와 연관이 없는 사람들 또한 대여가 가능 했음.

**해결**
우선 순위를 가중치로 계산한다음 잔여석 대기 항목 추가후 큐로 잔여석 수 만큼(가치 높은 순으로 ) POP()하여 불편함 감소 

---
## 10. 중복된 리프레쉬 토큰생성되는 설계 결함 

**원인** 동일 계정에서 동시에 여러 요청이 발생할 경우 동일한 Refresh Token을 사용하여 토큰 재발급을 요청하는 Race Condition이 발생했다. 한 요청에서 Refresh Token이 갱신·폐기된 이후 다른 동시 요청들이 기존 Refresh Token을 사용하면서 인증에 실패했고, 이로 인해 후속 작업이 정상적으로 진행되지 않아 대량의 요청이 에러를 반환하는 문제가 발생함에 따라 900 건중에서 대략 70 퍼센트 에러 발생

**해결** 
리프레쉬 토큰에 고유 식별자를 부여하여서 중복된 토큰이 생성 되지 않도록 함으로써 약 20퍼센트 이상의 응답성공률 개선 

---

## 11. 이름 저장시에 글자수 제한이 없어서 스토리지 낭비 발생

**원인** 글자수 제한이 없을때 payload가 너무 커지거나, 용량이 낭비되는 문제 발생 

**해결** zod를 이용하여 이름 유효성 검사 추가 하여서 이를 방지

---


---