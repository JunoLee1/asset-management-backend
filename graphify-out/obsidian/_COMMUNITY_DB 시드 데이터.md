---
type: community
cohesion: 0.33
members: 6
---

# DB 시드 데이터

**Cohesion:** 0.33 - loosely connected
**Members:** 6 nodes

## Members
- [[adminCtx_4]] - code - src/modules/loans/__tests__/loan.service.approve-ooo.test.ts
- [[loan.service.approve-ooo.test.ts]] - code - src/modules/loans/__tests__/loan.service.approve-ooo.test.ts
- [[makeLoan()]] - code - src/modules/loans/__tests__/loan.service.approve-ooo.test.ts
- [[managerCtx_3]] - code - src/modules/loans/__tests__/loan.service.approve-ooo.test.ts
- [[mockDeptFindMany_1]] - code - src/modules/loans/__tests__/loan.service.approve-ooo.test.ts
- [[mockLoanFindUnique]] - code - src/modules/loans/__tests__/loan.service.approve-ooo.test.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/DB__
SORT file.name ASC
```

## Connections to other communities
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 1 edge to [[_COMMUNITY_API 라우터 레이어]]

## Top bridge nodes
- [[loan.service.approve-ooo.test.ts]] - degree 8, connects to 2 communities