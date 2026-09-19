---
type: community
cohesion: 0.05
members: 74
---

# 대여 서비스 로직

**Cohesion:** 0.05 - loosely connected
**Members:** 74 nodes

## Members
- [[ActivateUserInput]] - code - src/schemas/user.schema.ts
- [[AuditContext]] - code - src/lib/requestHelpers.ts
- [[DeactivateUserInput]] - code - src/schemas/user.schema.ts
- [[InviteEmailResult]] - code - src/lib/emailTemplates.ts
- [[InviteUserDto]] - code - src/modules/admin/admin.types.ts
- [[InviteUserResult]] - code - src/modules/admin/admin.types.ts
- [[ListUserHistoryQuery]] - code - src/schemas/user.schema.ts
- [[ListUsersQuery]] - code - src/schemas/user.schema.ts
- [[MailOptions]] - code - src/lib/mailer.ts
- [[ReinviteUserInput]] - code - src/schemas/user.schema.ts
- [[SensitiveAction]] - code - src/lib/sensitiveAuditLog.ts
- [[SensitiveAuditEntry]] - code - src/lib/sensitiveAuditLog.ts
- [[UpdateUserInput]] - code - src/schemas/user.schema.ts
- [[UserListItem]] - code - src/modules/admin/user.service.ts
- [[activate()_1]] - code - src/modules/admin/user.service.ts
- [[activateUserSchema]] - code - src/schemas/user.schema.ts
- [[admin.controller.ts]] - code - src/modules/admin/admin.controller.ts
- [[admin.router.ts]] - code - src/modules/admin/admin.router.ts
- [[admin.service.ts]] - code - src/modules/admin/admin.service.ts
- [[admin.types.ts]] - code - src/modules/admin/admin.types.ts
- [[baseUser]] - code - src/modules/admin/__tests__/admin.service.test.ts
- [[baseUser_1]] - code - src/modules/admin/__tests__/user.service.test.ts
- [[deactivate()_1]] - code - src/modules/admin/user.service.ts
- [[deactivateUserSchema]] - code - src/schemas/user.schema.ts
- [[decryptPhone()]] - code - src/lib/phoneEncryption.ts
- [[emailTemplates.ts]] - code - src/lib/emailTemplates.ts
- [[encryptPhone()]] - code - src/lib/phoneEncryption.ts
- [[env]] - code - src/config/env.ts
- [[env.ts]] - code - src/config/env.ts
- [[getById()]] - code - src/modules/admin/user.controller.ts
- [[getById()_1]] - code - src/modules/admin/user.service.ts
- [[getKey()_1]] - code - src/lib/phoneEncryption.ts
- [[getTransporter()]] - code - src/lib/mailer.ts
- [[hashPhone()]] - code - src/lib/phoneEncryption.ts
- [[index.ts]] - code - src/index.ts
- [[inviteEmailTemplate()]] - code - src/lib/emailTemplates.ts
- [[inviteUser()]] - code - src/modules/admin/admin.controller.ts
- [[inviteUser()_1]] - code - src/modules/admin/admin.service.ts
- [[list()]] - code - src/modules/admin/user.controller.ts
- [[list()_1]] - code - src/modules/admin/user.service.ts
- [[listHistory()]] - code - src/modules/admin/user.controller.ts
- [[listHistory()_1]] - code - src/modules/admin/user.service.ts
- [[listUserHistoryQuerySchema]] - code - src/schemas/user.schema.ts
- [[listUsersQuerySchema]] - code - src/schemas/user.schema.ts
- [[logger]] - code - src/lib/logger.ts
- [[logger.ts]] - code - src/lib/logger.ts
- [[mailer.ts]] - code - src/lib/mailer.ts
- [[maskPhone()]] - code - src/lib/phoneEncryption.ts
- [[mockCount]] - code - src/modules/admin/__tests__/user.service.test.ts
- [[mockCreate]] - code - src/modules/admin/__tests__/admin.service.test.ts
- [[mockFindFirst]] - code - src/modules/admin/__tests__/admin.service.test.ts
- [[mockFindMany]] - code - src/modules/admin/__tests__/user.service.test.ts
- [[mockFindUnique]] - code - src/modules/admin/__tests__/admin.service.test.ts
- [[mockFindUnique_1]] - code - src/modules/admin/__tests__/user.service.test.ts
- [[mockUpdate]] - code - src/modules/admin/__tests__/user.service.test.ts
- [[numericString_1]] - code - src/schemas/user.schema.ts
- [[phoneEncryption.ts]] - code - src/lib/phoneEncryption.ts
- [[reinvite()_1]] - code - src/modules/admin/user.service.ts
- [[reinviteUserSchema]] - code - src/schemas/user.schema.ts
- [[requireEnv()]] - code - src/config/env.ts
- [[roleEnum]] - code - src/schemas/user.schema.ts
- [[router]] - code - src/modules/admin/admin.router.ts
- [[scheduler.ts]] - code - src/lib/scheduler.ts
- [[sendMail()]] - code - src/lib/mailer.ts
- [[sensitiveAuditLog.ts]] - code - src/lib/sensitiveAuditLog.ts
- [[startScheduler()]] - code - src/lib/scheduler.ts
- [[update()_1]] - code - src/modules/admin/user.service.ts
- [[updateUserSchema]] - code - src/schemas/user.schema.ts
- [[user.controller.ts]] - code - src/modules/admin/user.controller.ts
- [[user.schema.ts]] - code - src/schemas/user.schema.ts
- [[user.service.test.ts]] - code - src/modules/admin/__tests__/user.service.test.ts
- [[user.service.ts]] - code - src/modules/admin/user.service.ts
- [[userService]] - code - src/modules/admin/user.service.ts
- [[writeAudit()]] - code - src/modules/admin/user.service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/__
SORT file.name ASC
```

## Connections to other communities
- 10 edges to [[_COMMUNITY_카탈로그 서비스]]
- 8 edges to [[_COMMUNITY_Cloudinary 파일 업로드]]
- 8 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 8 edges to [[_COMMUNITY_개발 의존성]]
- 7 edges to [[_COMMUNITY_관리자 사용자 관리]]
- 6 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 5 edges to [[_COMMUNITY_인증 컨트롤러]]
- 5 edges to [[_COMMUNITY_필드 암호화 유틸]]
- 3 edges to [[_COMMUNITY_수리 컨트롤러]]
- 3 edges to [[_COMMUNITY_대여 반납 권한 테스트]]
- 3 edges to [[_COMMUNITY_제조사 컨트롤러]]
- 2 edges to [[_COMMUNITY_에러 처리 헬퍼]]
- 2 edges to [[_COMMUNITY_API 라우터 레이어]]
- 2 edges to [[_COMMUNITY_자산 분류 마스터]]
- 2 edges to [[_COMMUNITY_알림 서비스]]
- 2 edges to [[_COMMUNITY_TypeScript 빌드 설정]]

## Top bridge nodes
- [[logger.ts]] - degree 19, connects to 8 communities
- [[logger]] - degree 17, connects to 8 communities
- [[user.service.ts]] - degree 36, connects to 4 communities
- [[user.controller.ts]] - degree 21, connects to 3 communities
- [[admin.router.ts]] - degree 17, connects to 3 communities