---
type: community
cohesion: 0.10
members: 36
---

# 인증 컨트롤러

**Cohesion:** 0.10 - loosely connected
**Members:** 36 nodes

## Members
- [[AssignLicenseInput]] - code - src/modules/licenses/license.types.ts
- [[CreateLicenseInput]] - code - src/modules/licenses/license.types.ts
- [[LicenseAssignmentDetail]] - code - src/modules/licenses/license.types.ts
- [[LicenseDetail]] - code - src/modules/licenses/license.types.ts
- [[LicenseListItem]] - code - src/modules/licenses/license.types.ts
- [[ListLicensesQuery]] - code - src/modules/licenses/license.types.ts
- [[UpdateLicenseInput]] - code - src/modules/licenses/license.types.ts
- [[adminCtx_2]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[assign()_1]] - code - src/modules/licenses/license.service.ts
- [[baseLicense]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[countActiveSeats()]] - code - src/modules/licenses/license.service.ts
- [[create()_5]] - code - src/modules/licenses/license.service.ts
- [[encryptLicenseKey()]] - code - src/lib/licenseKey.ts
- [[getById()_7]] - code - src/modules/licenses/license.service.ts
- [[getKey()]] - code - src/lib/licenseKey.ts
- [[license.service.ts]] - code - src/modules/licenses/license.service.ts
- [[license.types.ts]] - code - src/modules/licenses/license.types.ts
- [[licenseKey.ts]] - code - src/lib/licenseKey.ts
- [[managerCtx_1]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[maskLicenseKey()]] - code - src/lib/licenseKey.ts
- [[mockAssetFindUnique_1]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLACount]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLACreate]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLAFindFirst]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLAFindUnique]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLAUpdate]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLicenseCreate]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLicenseDelete]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLicenseFindUnique]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockLicenseUpdate]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[mockUserFindUnique_1]] - code - src/modules/licenses/__tests__/license.service.test.ts
- [[remove()_5]] - code - src/modules/licenses/license.service.ts
- [[requireManager()_1]] - code - src/modules/licenses/license.service.ts
- [[unassign()_1]] - code - src/modules/licenses/license.service.ts
- [[update()_7]] - code - src/modules/licenses/license.service.ts
- [[userCtx_2]] - code - src/modules/licenses/__tests__/license.service.test.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_관리자 사용자 관리]]
- 5 edges to [[_COMMUNITY_대여 서비스 로직]]
- 2 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]
- 1 edge to [[_COMMUNITY_개발 의존성]]

## Top bridge nodes
- [[license.service.ts]] - degree 47, connects to 5 communities
- [[license.types.ts]] - degree 12, connects to 2 communities
- [[getById()_7]] - degree 7, connects to 1 community