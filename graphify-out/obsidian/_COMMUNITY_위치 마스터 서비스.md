---
type: community
cohesion: 0.29
members: 8
---

# 위치 마스터 서비스

**Cohesion:** 0.29 - loosely connected
**Members:** 8 nodes

## Members
- [[UpsertDepreciationBody]] - code - src/schemas/depreciation.schema.ts
- [[depreciation.controller.ts]] - code - src/modules/depreciation/depreciation.controller.ts
- [[depreciation.schema.ts]] - code - src/schemas/depreciation.schema.ts
- [[getByAssetId()]] - code - src/modules/depreciation/depreciation.controller.ts
- [[methodEnum]] - code - src/schemas/depreciation.schema.ts
- [[remove()_2]] - code - src/modules/depreciation/depreciation.controller.ts
- [[upsert()]] - code - src/modules/depreciation/depreciation.controller.ts
- [[upsertDepreciationSchema]] - code - src/schemas/depreciation.schema.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/__
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_알림 서비스]]
- 4 edges to [[_COMMUNITY_개발 의존성]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]
- 1 edge to [[_COMMUNITY_자산 분류 마스터]]
- 1 edge to [[_COMMUNITY_카탈로그 서비스]]

## Top bridge nodes
- [[depreciation.controller.ts]] - degree 10, connects to 5 communities
- [[getByAssetId()]] - degree 3, connects to 2 communities
- [[remove()_2]] - degree 3, connects to 2 communities
- [[upsert()]] - degree 3, connects to 2 communities