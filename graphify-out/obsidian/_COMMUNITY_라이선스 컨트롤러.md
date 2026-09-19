---
type: community
cohesion: 0.11
members: 20
---

# 라이선스 컨트롤러

**Cohesion:** 0.11 - loosely connected
**Members:** 20 nodes

## Members
- [[ADMIN]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[AlertItem]] - code - src/modules/dashboard/dashboard.types.ts
- [[CategoryStat]] - code - src/modules/dashboard/dashboard.types.ts
- [[DashboardData]] - code - src/modules/dashboard/dashboard.types.ts
- [[DashboardStats]] - code - src/modules/dashboard/dashboard.types.ts
- [[DepartmentStat]] - code - src/modules/dashboard/dashboard.types.ts
- [[HistoryItem]] - code - src/modules/dashboard/dashboard.types.ts
- [[TEAM_LEAD]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[dashboard.controller.ts]] - code - src/modules/dashboard/dashboard.controller.ts
- [[dashboard.service.ts]] - code - src/modules/dashboard/dashboard.service.ts
- [[dashboard.types.ts]] - code - src/modules/dashboard/dashboard.types.ts
- [[getDashboard()]] - code - src/modules/dashboard/dashboard.controller.ts
- [[getDashboard()_1]] - code - src/modules/dashboard/dashboard.service.ts
- [[mockAssetCount_1]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[mockCategoryFindMany]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[mockDeptFindMany]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[mockHistoryFindMany]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[mockLoanCount]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[mockMaintenanceFindMany]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts
- [[mockTeamFindFirst]] - code - src/modules/dashboard/__tests__/dashboard.service.test.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 1 edge to [[_COMMUNITY_카탈로그 서비스]]

## Top bridge nodes
- [[dashboard.service.ts]] - degree 15, connects to 1 community
- [[dashboard.controller.ts]] - degree 3, connects to 1 community