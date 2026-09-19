---
type: community
cohesion: 0.06
members: 62
---

# API 라우터 레이어

**Cohesion:** 0.06 - loosely connected
**Members:** 62 nodes

## Members
- [[ACTION_MAP]] - code - src/modules/loans/loan.types.ts
- [[ALLOWED_TRANSITIONS]] - code - src/modules/loans/loan.service.ts
- [[ApproveLoanBody]] - code - src/schemas/loan.schema.ts
- [[CONDITION_MAP]] - code - src/modules/loans/loan.types.ts
- [[CreateLoanBody]] - code - src/schemas/loan.schema.ts
- [[EdfLoanRow]] - code - src/modules/loans/loan.service.ts
- [[EdfMetrics]] - code - src/modules/loans/loan.service.ts
- [[InspectLoanBody]] - code - src/schemas/loan.schema.ts
- [[LOAN_INCLUDE]] - code - src/modules/loans/loan.service.ts
- [[ListLoansQuery]] - code - src/schemas/loan.schema.ts
- [[LoanDetail]] - code - src/modules/loans/loan.types.ts
- [[LoanListItem]] - code - src/modules/loans/loan.types.ts
- [[LoanReturnDetail]] - code - src/modules/loans/loan.types.ts
- [[LoanWithRelations]] - code - src/modules/loans/loan.service.ts
- [[LookupLoanQuery]] - code - src/schemas/loan.schema.ts
- [[RecallLoanBody]] - code - src/schemas/loan.schema.ts
- [[RejectLoanBody]] - code - src/schemas/loan.schema.ts
- [[ResponseAssetCondition]] - code - src/modules/loans/loan.types.ts
- [[ReturnAction]] - code - src/modules/loans/loan.types.ts
- [[ReturnLoanBody]] - code - src/schemas/loan.schema.ts
- [[approveAdmin()_1]] - code - src/modules/loans/loan.service.ts
- [[approveExtensionAdmin()_1]] - code - src/modules/loans/loan.service.ts
- [[approveExtensionManager()_1]] - code - src/modules/loans/loan.service.ts
- [[approveLoanSchema]] - code - src/schemas/loan.schema.ts
- [[approveManager()_1]] - code - src/modules/loans/loan.service.ts
- [[approveReturnManager()_1]] - code - src/modules/loans/loan.service.ts
- [[assertNotSelfApprove()]] - code - src/modules/loans/loan.service.ts
- [[assertTransition()]] - code - src/modules/loans/loan.service.ts
- [[assetStatusForCondition()]] - code - src/modules/loans/__tests__/loan.types.test.ts
- [[cancel()_1]] - code - src/modules/loans/loan.service.ts
- [[checkout()_1]] - code - src/modules/loans/loan.service.ts
- [[computeEdfMetrics()]] - code - src/modules/loans/loan.service.ts
- [[create()_7]] - code - src/modules/loans/loan.service.ts
- [[createLoanSchema]] - code - src/schemas/loan.schema.ts
- [[finalizeReturn()_1]] - code - src/modules/loans/loan.service.ts
- [[getById()_9]] - code - src/modules/loans/loan.service.ts
- [[inspect()_1]] - code - src/modules/loans/loan.service.ts
- [[inspectLoanSchema]] - code - src/schemas/loan.schema.ts
- [[isQueueStatus()]] - code - src/modules/loans/loan.service.ts
- [[list()_9]] - code - src/modules/loans/loan.service.ts
- [[listLoansQuerySchema]] - code - src/schemas/loan.schema.ts
- [[loan.schema.ts]] - code - src/schemas/loan.schema.ts
- [[loan.service.ts]] - code - src/modules/loans/loan.service.ts
- [[loan.types.test.ts]] - code - src/modules/loans/__tests__/loan.types.test.ts
- [[loan.types.ts]] - code - src/modules/loans/loan.types.ts
- [[loanStatusEnum]] - code - src/schemas/loan.schema.ts
- [[lookup()_1]] - code - src/modules/loans/loan.service.ts
- [[lookupLoanQuerySchema]] - code - src/schemas/loan.schema.ts
- [[my()_1]] - code - src/modules/loans/loan.service.ts
- [[overdue()_1]] - code - src/modules/loans/loan.service.ts
- [[recall()_1]] - code - src/modules/loans/loan.service.ts
- [[recallLoanSchema]] - code - src/schemas/loan.schema.ts
- [[receive()_1]] - code - src/modules/loans/loan.service.ts
- [[reject()_1]] - code - src/modules/loans/loan.service.ts
- [[rejectExtension()_1]] - code - src/modules/loans/loan.service.ts
- [[rejectLoanSchema]] - code - src/schemas/loan.schema.ts
- [[requestExtension()_1]] - code - src/modules/loans/loan.service.ts
- [[requestReturn()]] - code - src/modules/loans/loan.service.ts
- [[returnLoanSchema]] - code - src/schemas/loan.schema.ts
- [[toDetail()_1]] - code - src/modules/loans/loan.service.ts
- [[toListItem()]] - code - src/modules/loans/loan.service.ts
- [[toReturnDetail()]] - code - src/modules/loans/loan.service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/API__
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_알림 서비스]]
- 8 edges to [[_COMMUNITY_관리자 사용자 관리]]
- 4 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 2 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 2 edges to [[_COMMUNITY_대여 서비스 로직]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]
- 1 edge to [[_COMMUNITY_수리 컨트롤러]]
- 1 edge to [[_COMMUNITY_DB 시드 데이터]]
- 1 edge to [[_COMMUNITY_카탈로그 컨트롤러]]
- 1 edge to [[_COMMUNITY_패키지 메타정보]]

## Top bridge nodes
- [[loan.service.ts]] - degree 63, connects to 9 communities
- [[loan.types.ts]] - degree 13, connects to 2 communities
- [[loan.schema.ts]] - degree 19, connects to 1 community
- [[list()_9]] - degree 3, connects to 1 community
- [[approveLoanSchema]] - degree 2, connects to 1 community