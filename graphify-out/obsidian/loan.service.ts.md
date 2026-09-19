---
source_file: "src/modules/loans/loan.service.ts"
type: "code"
community: "API 라우터 레이어"
location: "L1"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/API__
---

# loan.service.ts

## Connections
- [[ACTION_MAP]] - `imports` [EXTRACTED]
- [[ALLOWED_TRANSITIONS]] - `contains` [EXTRACTED]
- [[AppError]] - `imports` [EXTRACTED]
- [[AppError.ts]] - `imports_from` [EXTRACTED]
- [[ApproveLoanBody]] - `imports` [EXTRACTED]
- [[CONDITION_MAP]] - `imports` [EXTRACTED]
- [[CreateLoanBody]] - `imports` [EXTRACTED]
- [[EdfLoanRow]] - `contains` [EXTRACTED]
- [[EdfMetrics]] - `contains` [EXTRACTED]
- [[InspectLoanBody]] - `imports` [EXTRACTED]
- [[LOAN_INCLUDE]] - `contains` [EXTRACTED]
- [[ListLoansQuery]] - `imports` [EXTRACTED]
- [[LoanDetail]] - `imports` [EXTRACTED]
- [[LoanListItem]] - `imports` [EXTRACTED]
- [[LoanReturnDetail]] - `imports` [EXTRACTED]
- [[LoanWithRelations]] - `contains` [EXTRACTED]
- [[PaginatedResult]] - `imports` [EXTRACTED]
- [[RecallLoanBody]] - `imports` [EXTRACTED]
- [[RejectLoanBody]] - `imports` [EXTRACTED]
- [[RequesterContext]] - `imports` [EXTRACTED]
- [[approveAdmin()_1]] - `contains` [EXTRACTED]
- [[approveExtensionAdmin()_1]] - `contains` [EXTRACTED]
- [[approveExtensionManager()_1]] - `contains` [EXTRACTED]
- [[approveManager()_1]] - `contains` [EXTRACTED]
- [[approveReturnManager()_1]] - `contains` [EXTRACTED]
- [[assertNotSelfApprove()]] - `contains` [EXTRACTED]
- [[assertTransition()]] - `contains` [EXTRACTED]
- [[cancel()_1]] - `contains` [EXTRACTED]
- [[checkout()_1]] - `contains` [EXTRACTED]
- [[computeEdfMetrics()]] - `contains` [EXTRACTED]
- [[create()_7]] - `contains` [EXTRACTED]
- [[finalizeReturn()_1]] - `contains` [EXTRACTED]
- [[getById()_9]] - `contains` [EXTRACTED]
- [[inspect()_1]] - `contains` [EXTRACTED]
- [[isQueueStatus()]] - `contains` [EXTRACTED]
- [[list()_9]] - `contains` [EXTRACTED]
- [[loan.controller.ts]] - `imports_from` [EXTRACTED]
- [[loan.schema.ts]] - `imports_from` [EXTRACTED]
- [[loan.service.approve-ooo.test.ts]] - `imports_from` [EXTRACTED]
- [[loan.service.department-manager.test.ts]] - `imports_from` [EXTRACTED]
- [[loan.service.maintenance-auto.test.ts]] - `imports_from` [EXTRACTED]
- [[loan.service.overdue.test.ts]] - `imports_from` [EXTRACTED]
- [[loan.service.return-manager-gate.test.ts]] - `imports_from` [EXTRACTED]
- [[loan.types.ts]] - `imports_from` [EXTRACTED]
- [[logger]] - `imports` [EXTRACTED]
- [[logger.ts]] - `imports_from` [EXTRACTED]
- [[lookup()_1]] - `contains` [EXTRACTED]
- [[my()_1]] - `contains` [EXTRACTED]
- [[notification.service.ts]] - `imports_from` [EXTRACTED]
- [[overdue()_1]] - `contains` [EXTRACTED]
- [[paginate()]] - `imports` [EXTRACTED]
- [[pagination.ts]] - `imports_from` [EXTRACTED]
- [[prisma_1]] - `imports` [EXTRACTED]
- [[prisma.ts]] - `imports_from` [EXTRACTED]
- [[recall()_1]] - `contains` [EXTRACTED]
- [[receive()_1]] - `contains` [EXTRACTED]
- [[reject()_1]] - `contains` [EXTRACTED]
- [[rejectExtension()_1]] - `contains` [EXTRACTED]
- [[requestExtension()_1]] - `contains` [EXTRACTED]
- [[requestReturn()]] - `contains` [EXTRACTED]
- [[toDetail()_1]] - `contains` [EXTRACTED]
- [[toListItem()]] - `contains` [EXTRACTED]
- [[toReturnDetail()]] - `contains` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/API__