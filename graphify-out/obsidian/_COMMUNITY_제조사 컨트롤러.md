---
type: community
cohesion: 0.20
members: 12
---

# 제조사 컨트롤러

**Cohesion:** 0.20 - loosely connected
**Members:** 12 nodes

## Members
- [[HistoryMetadata]] - code - src/modules/assets/asset.service.ts
- [[UpdateAssetInput]] - code - src/schemas/asset.schema.ts
- [[asset.service.ts]] - code - src/modules/assets/asset.service.ts
- [[create()_1]] - code - src/modules/assets/asset.service.ts
- [[detailInclude]] - code - src/modules/assets/asset.service.ts
- [[generateAssetCode()]] - code - src/modules/assets/assetCodeGenerator.ts
- [[getById()_3]] - code - src/modules/assets/asset.service.ts
- [[getHistory()_1]] - code - src/modules/assets/asset.service.ts
- [[list()_3]] - code - src/modules/assets/asset.service.ts
- [[retire()_1]] - code - src/modules/assets/asset.service.ts
- [[toDetail()]] - code - src/modules/assets/asset.service.ts
- [[update()_3]] - code - src/modules/assets/asset.service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 3 edges to [[_COMMUNITY_감가상각 컨트롤러]]
- 3 edges to [[_COMMUNITY_대여 서비스 로직]]
- 2 edges to [[_COMMUNITY_관리자 사용자 관리]]
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 2 edges to [[_COMMUNITY_대여 직무대행 승인 테스트]]
- 2 edges to [[_COMMUNITY_Prisma 클라이언트]]
- 2 edges to [[_COMMUNITY_에러 처리 헬퍼]]
- 2 edges to [[_COMMUNITY_대여 연체 테스트]]
- 2 edges to [[_COMMUNITY_카탈로그 서비스]]
- 1 edge to [[_COMMUNITY_테스트 TypeScript 설정]]
- 1 edge to [[_COMMUNITY_카카오 Passport 타입]]

## Top bridge nodes
- [[asset.service.ts]] - degree 32, connects to 12 communities
- [[UpdateAssetInput]] - degree 3, connects to 2 communities
- [[generateAssetCode()]] - degree 3, connects to 1 community
- [[retire()_1]] - degree 2, connects to 1 community