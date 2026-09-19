---
type: community
cohesion: 0.13
members: 23
---

# 개발 의존성

**Cohesion:** 0.13 - loosely connected
**Members:** 23 nodes

## Members
- [[AssignLicenseBody]] - code - src/schemas/license.schema.ts
- [[CreateLicenseBody]] - code - src/schemas/license.schema.ts
- [[ListLicensesQuery_1]] - code - src/schemas/license.schema.ts
- [[UpdateLicenseBody]] - code - src/schemas/license.schema.ts
- [[activate()]] - code - src/modules/admin/user.controller.ts
- [[assign()]] - code - src/modules/licenses/license.controller.ts
- [[assignLicenseSchema]] - code - src/schemas/license.schema.ts
- [[create()_4]] - code - src/modules/licenses/license.controller.ts
- [[createLicenseSchema]] - code - src/schemas/license.schema.ts
- [[deactivate()]] - code - src/modules/admin/user.controller.ts
- [[getAuditContext()]] - code - src/lib/requestHelpers.ts
- [[getById()_6]] - code - src/modules/licenses/license.controller.ts
- [[license.controller.ts]] - code - src/modules/licenses/license.controller.ts
- [[license.schema.ts]] - code - src/schemas/license.schema.ts
- [[list()_6]] - code - src/modules/licenses/license.controller.ts
- [[listLicensesQuerySchema]] - code - src/schemas/license.schema.ts
- [[reinvite()]] - code - src/modules/admin/user.controller.ts
- [[remove()_4]] - code - src/modules/licenses/license.controller.ts
- [[requireId()]] - code - src/lib/requestHelpers.ts
- [[unassign()]] - code - src/modules/licenses/license.controller.ts
- [[update()]] - code - src/modules/admin/user.controller.ts
- [[update()_6]] - code - src/modules/licenses/license.controller.ts
- [[updateLicenseSchema]] - code - src/schemas/license.schema.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 29 edges to [[_COMMUNITY_알림 서비스]]
- 8 edges to [[_COMMUNITY_대여 서비스 로직]]
- 7 edges to [[_COMMUNITY_에러 처리 헬퍼]]
- 7 edges to [[_COMMUNITY_TypeScript 빌드 설정]]
- 6 edges to [[_COMMUNITY_사용자 활성화 비활성화]]
- 5 edges to [[_COMMUNITY_대여 반납 권한 테스트]]
- 4 edges to [[_COMMUNITY_부서 마스터 서비스]]
- 4 edges to [[_COMMUNITY_위치 마스터 서비스]]
- 4 edges to [[_COMMUNITY_자산 서비스]]
- 1 edge to [[_COMMUNITY_인증 컨트롤러]]
- 1 edge to [[_COMMUNITY_카탈로그 서비스]]

## Top bridge nodes
- [[requireId()]] - degree 65, connects to 9 communities
- [[license.controller.ts]] - degree 17, connects to 4 communities
- [[getAuditContext()]] - degree 6, connects to 2 communities
- [[activate()]] - degree 4, connects to 2 communities
- [[deactivate()]] - degree 4, connects to 2 communities