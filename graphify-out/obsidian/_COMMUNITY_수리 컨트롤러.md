---
type: community
cohesion: 0.14
members: 21
---

# 수리 컨트롤러

**Cohesion:** 0.14 - loosely connected
**Members:** 21 nodes

## Members
- [[ChannelResult]] - code - src/modules/notifications/notification.service.ts
- [[CreateNotificationInput]] - code - src/modules/notifications/notification.service.ts
- [[NotificationListItem]] - code - src/modules/notifications/notification.service.ts
- [[OutboxResult]] - code - src/modules/notifications/notification.service.ts
- [[PrismaTx]] - code - src/modules/notifications/notification.service.ts
- [[TerminationCheckResult]] - code - src/modules/notifications/notification.service.ts
- [[createInApp()]] - code - src/modules/notifications/notification.service.ts
- [[createInAppMany()]] - code - src/modules/notifications/notification.service.ts
- [[createLoanApprovedNotification()]] - code - src/modules/notifications/notification.service.ts
- [[createLoanCheckedOutNotification()]] - code - src/modules/notifications/notification.service.ts
- [[createLoanReceivedNotifications()]] - code - src/modules/notifications/notification.service.ts
- [[getMailTransporter()]] - code - src/modules/notifications/notification.service.ts
- [[listMy()]] - code - src/modules/notifications/notification.service.ts
- [[markRead()_1]] - code - src/modules/notifications/notification.service.ts
- [[notification.service.ts]] - code - src/modules/notifications/notification.service.ts
- [[processEmailOutbox()]] - code - src/modules/notifications/notification.service.ts
- [[processOutbox()_1]] - code - src/modules/notifications/notification.service.ts
- [[processSlackOutbox()]] - code - src/modules/notifications/notification.service.ts
- [[runTerminationCheck()_1]] - code - src/modules/notifications/notification.service.ts
- [[sendEmail()]] - code - src/modules/notifications/notification.service.ts
- [[sendSlack()]] - code - src/modules/notifications/notification.service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/_
SORT file.name ASC
```

## Connections to other communities
- 3 edges to [[_COMMUNITY_대여 서비스 로직]]
- 2 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 2 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 1 edge to [[_COMMUNITY_API 라우터 레이어]]
- 1 edge to [[_COMMUNITY_관리자 사용자 관리]]
- 1 edge to [[_COMMUNITY_대여 반납 권한 테스트]]

## Top bridge nodes
- [[notification.service.ts]] - degree 30, connects to 6 communities