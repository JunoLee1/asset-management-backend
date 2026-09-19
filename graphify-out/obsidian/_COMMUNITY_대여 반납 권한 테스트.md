---
type: community
cohesion: 0.33
members: 6
---

# 대여 반납 권한 테스트

**Cohesion:** 0.33 - loosely connected
**Members:** 6 nodes

## Members
- [[markRead()]] - code - src/modules/notifications/notification.controller.ts
- [[my()_2]] - code - src/modules/notifications/notification.controller.ts
- [[notification.controller.ts]] - code - src/modules/notifications/notification.controller.ts
- [[processOutbox()]] - code - src/modules/notifications/notification.controller.ts
- [[requestHelpers.ts]] - code - src/lib/requestHelpers.ts
- [[runTerminationCheck()]] - code - src/modules/notifications/notification.controller.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/___
SORT file.name ASC
```

## Connections to other communities
- 7 edges to [[_COMMUNITY_알림 서비스]]
- 5 edges to [[_COMMUNITY_개발 의존성]]
- 4 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 4 edges to [[_COMMUNITY_관리자 사용자 관리]]
- 3 edges to [[_COMMUNITY_대여 서비스 로직]]
- 1 edge to [[_COMMUNITY_에러 처리 헬퍼]]
- 1 edge to [[_COMMUNITY_감가상각 컨트롤러]]
- 1 edge to [[_COMMUNITY_부서 마스터 서비스]]
- 1 edge to [[_COMMUNITY_위치 마스터 서비스]]
- 1 edge to [[_COMMUNITY_인증 컨트롤러]]
- 1 edge to [[_COMMUNITY_API 라우터 레이어]]
- 1 edge to [[_COMMUNITY_사용자 활성화 비활성화]]
- 1 edge to [[_COMMUNITY_자산 서비스]]
- 1 edge to [[_COMMUNITY_TypeScript 빌드 설정]]
- 1 edge to [[_COMMUNITY_자산 분류 마스터]]
- 1 edge to [[_COMMUNITY_수리 컨트롤러]]
- 1 edge to [[_COMMUNITY_카탈로그 서비스]]

## Top bridge nodes
- [[requestHelpers.ts]] - degree 25, connects to 15 communities
- [[notification.controller.ts]] - degree 11, connects to 5 communities
- [[markRead()]] - degree 3, connects to 2 communities
- [[my()_2]] - degree 2, connects to 1 community
- [[processOutbox()]] - degree 2, connects to 1 community