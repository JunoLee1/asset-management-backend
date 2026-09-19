---
type: community
cohesion: 0.40
members: 5
---

# 대여 직무대행 승인 테스트

**Cohesion:** 0.40 - moderately connected
**Members:** 5 nodes

## Members
- [[CreateAssetInput]] - code - src/schemas/asset.schema.ts
- [[asset.service.create.test.ts]] - code - src/modules/assets/__tests__/asset.service.create.test.ts
- [[baseHardwareInput]] - code - src/modules/assets/__tests__/asset.service.create.test.ts
- [[createdAsset]] - code - src/modules/assets/__tests__/asset.service.create.test.ts
- [[prismaWithTx]] - code - src/modules/assets/__tests__/asset.service.create.test.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/___
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 2 edges to [[_COMMUNITY_제조사 컨트롤러]]
- 2 edges to [[_COMMUNITY_카탈로그 서비스]]
- 1 edge to [[_COMMUNITY_에러 처리 헬퍼]]

## Top bridge nodes
- [[asset.service.create.test.ts]] - degree 10, connects to 4 communities
- [[CreateAssetInput]] - degree 4, connects to 3 communities