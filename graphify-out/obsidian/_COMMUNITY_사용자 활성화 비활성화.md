---
type: community
cohesion: 0.12
members: 20
---

# 사용자 활성화 비활성화

**Cohesion:** 0.12 - loosely connected
**Members:** 20 nodes

## Members
- [[CreateMaintenanceBody]] - code - src/schemas/maintenance.schema.ts
- [[ListMaintenancesQuery_1]] - code - src/schemas/maintenance.schema.ts
- [[RejectMaintenanceBody]] - code - src/schemas/maintenance.schema.ts
- [[UpdateMaintenanceBody]] - code - src/schemas/maintenance.schema.ts
- [[approve()]] - code - src/modules/maintenance/maintenance.controller.ts
- [[approveMaintenanceSchema]] - code - src/schemas/maintenance.schema.ts
- [[cancel()_2]] - code - src/modules/maintenance/maintenance.controller.ts
- [[create()_8]] - code - src/modules/maintenance/maintenance.controller.ts
- [[createMaintenanceSchema]] - code - src/schemas/maintenance.schema.ts
- [[getById()_10]] - code - src/modules/maintenance/maintenance.controller.ts
- [[list()_10]] - code - src/modules/maintenance/maintenance.controller.ts
- [[listMaintenancesQuerySchema]] - code - src/schemas/maintenance.schema.ts
- [[maintenance.controller.ts]] - code - src/modules/maintenance/maintenance.controller.ts
- [[maintenance.schema.ts]] - code - src/schemas/maintenance.schema.ts
- [[payerEnum]] - code - src/schemas/maintenance.schema.ts
- [[reject()_2]] - code - src/modules/maintenance/maintenance.controller.ts
- [[rejectMaintenanceSchema]] - code - src/schemas/maintenance.schema.ts
- [[statusEnum]] - code - src/schemas/maintenance.schema.ts
- [[update()_8]] - code - src/modules/maintenance/maintenance.controller.ts
- [[updateMaintenanceSchema]] - code - src/schemas/maintenance.schema.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/__
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_알림 서비스]]
- 6 edges to [[_COMMUNITY_개발 의존성]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]
- 1 edge to [[_COMMUNITY_관리자 사용자 관리]]
- 1 edge to [[_COMMUNITY_카탈로그 서비스]]

## Top bridge nodes
- [[maintenance.controller.ts]] - degree 17, connects to 5 communities
- [[approve()]] - degree 3, connects to 2 communities
- [[cancel()_2]] - degree 3, connects to 2 communities
- [[getById()_10]] - degree 3, connects to 2 communities
- [[reject()_2]] - degree 3, connects to 2 communities