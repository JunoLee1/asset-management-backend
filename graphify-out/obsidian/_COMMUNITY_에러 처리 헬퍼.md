---
type: community
cohesion: 0.29
members: 12
---

# 에러 처리 헬퍼

**Cohesion:** 0.29 - loosely connected
**Members:** 12 nodes

## Members
- [[asset.controller.ts]] - code - src/modules/assets/asset.controller.ts
- [[create()]] - code - src/modules/assets/asset.controller.ts
- [[deleteImage()]] - code - src/lib/cloudinary.ts
- [[getById()_2]] - code - src/modules/assets/asset.controller.ts
- [[getHistory()]] - code - src/modules/assets/asset.controller.ts
- [[isCloudinaryConfigured()]] - code - src/lib/cloudinary.ts
- [[list()_2]] - code - src/modules/assets/asset.controller.ts
- [[removeImage()]] - code - src/modules/assets/asset.controller.ts
- [[retire()]] - code - src/modules/assets/asset.controller.ts
- [[update()_2]] - code - src/modules/assets/asset.controller.ts
- [[uploadImage()]] - code - src/modules/assets/asset.controller.ts
- [[uploadVendorDocumentHandler()]] - code - src/modules/master/master.controller.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/__
SORT file.name ASC
```

## Connections to other communities
- 9 edges to [[_COMMUNITY_알림 서비스]]
- 7 edges to [[_COMMUNITY_개발 의존성]]
- 4 edges to [[_COMMUNITY_요청자 컨텍스트 테스트]]
- 3 edges to [[_COMMUNITY_TypeScript 빌드 설정]]
- 3 edges to [[_COMMUNITY_카탈로그 서비스]]
- 2 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 2 edges to [[_COMMUNITY_대여 서비스 로직]]
- 2 edges to [[_COMMUNITY_제조사 컨트롤러]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]
- 1 edge to [[_COMMUNITY_대여 직무대행 승인 테스트]]

## Top bridge nodes
- [[asset.controller.ts]] - degree 24, connects to 9 communities
- [[uploadVendorDocumentHandler()]] - degree 5, connects to 3 communities
- [[uploadImage()]] - degree 7, connects to 2 communities
- [[removeImage()]] - degree 6, connects to 2 communities
- [[isCloudinaryConfigured()]] - degree 6, connects to 2 communities