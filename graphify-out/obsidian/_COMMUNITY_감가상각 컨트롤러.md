---
type: community
cohesion: 0.29
members: 7
---

# 감가상각 컨트롤러

**Cohesion:** 0.29 - loosely connected
**Members:** 7 nodes

## Members
- [[AssetDetail]] - code - src/modules/assets/asset.types.ts
- [[AssetHistoryDetail]] - code - src/modules/assets/asset.types.ts
- [[AssetListItem]] - code - src/modules/assets/asset.types.ts
- [[HardwareDetail]] - code - src/modules/assets/asset.types.ts
- [[PeripheralDetail]] - code - src/modules/assets/asset.types.ts
- [[SoftwareDetail]] - code - src/modules/assets/asset.types.ts
- [[asset.types.ts]] - code - src/modules/assets/asset.types.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_관리자 사용자 관리]]
- 3 edges to [[_COMMUNITY_제조사 컨트롤러]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]
- 1 edge to [[_COMMUNITY_테스트 TypeScript 설정]]
- 1 edge to [[_COMMUNITY_Prisma 클라이언트]]

## Top bridge nodes
- [[asset.types.ts]] - degree 13, connects to 5 communities
- [[AssetDetail]] - degree 2, connects to 1 community
- [[AssetListItem]] - degree 2, connects to 1 community