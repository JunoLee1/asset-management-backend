---
type: community
cohesion: 0.25
members: 8
---

# Prisma 클라이언트

**Cohesion:** 0.25 - loosely connected
**Members:** 8 nodes

## Members
- [[ListAssetsQuery]] - code - src/schemas/asset.schema.ts
- [[adminRequester]] - code - src/modules/assets/__tests__/asset.service.list.test.ts
- [[asset.service.list.test.ts]] - code - src/modules/assets/__tests__/asset.service.list.test.ts
- [[emptyQuery]] - code - src/modules/assets/__tests__/asset.service.list.test.ts
- [[mockCount_1]] - code - src/modules/assets/__tests__/asset.service.list.test.ts
- [[mockFindMany_1]] - code - src/modules/assets/__tests__/asset.service.list.test.ts
- [[sampleAssetRow]] - code - src/modules/assets/__tests__/asset.service.list.test.ts
- [[userRequester]] - code - src/modules/assets/__tests__/asset.service.list.test.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Prisma_
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 2 edges to [[_COMMUNITY_제조사 컨트롤러]]
- 2 edges to [[_COMMUNITY_카탈로그 서비스]]
- 1 edge to [[_COMMUNITY_관리자 사용자 관리]]
- 1 edge to [[_COMMUNITY_감가상각 컨트롤러]]

## Top bridge nodes
- [[asset.service.list.test.ts]] - degree 13, connects to 5 communities
- [[ListAssetsQuery]] - degree 3, connects to 2 communities