---
type: community
cohesion: 0.22
members: 11
---

# 자산 컨트롤러

**Cohesion:** 0.22 - loosely connected
**Members:** 11 nodes

## Members
- [[CreateAssetCategoryInput]] - code - src/schemas/master.schema.ts
- [[UpdateAssetCategoryInput]] - code - src/schemas/master.schema.ts
- [[assetCategory.service.ts]] - code - src/modules/master/assetCategory.service.ts
- [[create()_12]] - code - src/modules/master/assetCategory.service.ts
- [[getById()_14]] - code - src/modules/master/assetCategory.service.ts
- [[mockAssetCount_2]] - code - src/modules/master/__tests__/assetCategory.service.test.ts
- [[mockCat]] - code - src/modules/master/__tests__/assetCategory.service.test.ts
- [[restore()]] - code - src/modules/master/assetCategory.service.ts
- [[sample]] - code - src/modules/master/__tests__/assetCategory.service.test.ts
- [[softDelete()]] - code - src/modules/master/assetCategory.service.ts
- [[update()_12]] - code - src/modules/master/assetCategory.service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 4 edges to [[_COMMUNITY_대시보드]]
- 3 edges to [[_COMMUNITY_감가상각 서비스]]
- 2 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 1 edge to [[_COMMUNITY_TypeScript 빌드 설정]]

## Top bridge nodes
- [[assetCategory.service.ts]] - degree 20, connects to 5 communities
- [[CreateAssetCategoryInput]] - degree 2, connects to 1 community
- [[UpdateAssetCategoryInput]] - degree 2, connects to 1 community