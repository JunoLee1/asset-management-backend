---
type: community
cohesion: 0.08
members: 47
---

# Cloudinary 파일 업로드

**Cohesion:** 0.08 - loosely connected
**Members:** 47 nodes

## Members
- [[AcceptInviteDto]] - code - src/modules/auth/auth.types.ts
- [[AcceptInviteInput]] - code - src/schemas/auth.schema.ts
- [[AuthResponse]] - code - src/modules/auth/auth.types.ts
- [[ChangePasswordInput]] - code - src/schemas/auth.schema.ts
- [[InviteUserInput]] - code - src/schemas/auth.schema.ts
- [[IssueTokenMeta]] - code - src/modules/auth/auth.service.ts
- [[JwtPayload]] - code - src/modules/auth/auth.types.ts
- [[LoginDto]] - code - src/modules/auth/auth.types.ts
- [[LoginInput]] - code - src/schemas/auth.schema.ts
- [[OAuthProfile]] - code - src/modules/auth/auth.types.ts
- [[RegisterDto]] - code - src/modules/auth/auth.types.ts
- [[TokenPair]] - code - src/modules/auth/auth.types.ts
- [[UserDto]] - code - src/modules/auth/auth.types.ts
- [[acceptInvite()]] - code - src/modules/auth/auth.controller.ts
- [[acceptInvite()_1]] - code - src/modules/auth/auth.service.ts
- [[acceptInviteSchema]] - code - src/schemas/auth.schema.ts
- [[auth.controller.ts]] - code - src/modules/auth/auth.controller.ts
- [[auth.router.ts]] - code - src/modules/auth/auth.router.ts
- [[auth.schema.test.ts]] - code - src/schemas/__tests__/auth.schema.test.ts
- [[auth.schema.ts]] - code - src/schemas/auth.schema.ts
- [[auth.service.ts]] - code - src/modules/auth/auth.service.ts
- [[auth.types.ts]] - code - src/modules/auth/auth.types.ts
- [[changePassword()]] - code - src/modules/auth/auth.controller.ts
- [[changePassword()_1]] - code - src/modules/auth/auth.service.ts
- [[changePasswordSchema]] - code - src/schemas/auth.schema.ts
- [[extractMeta()]] - code - src/modules/auth/auth.controller.ts
- [[findOrCreateOAuthUser()]] - code - src/modules/auth/auth.service.ts
- [[hashToken()_1]] - code - src/modules/auth/auth.service.ts
- [[inviteUserSchema]] - code - src/schemas/auth.schema.ts
- [[issueTokenPair()]] - code - src/modules/auth/auth.service.ts
- [[login()]] - code - src/modules/auth/auth.controller.ts
- [[login()_1]] - code - src/modules/auth/auth.service.ts
- [[loginSchema]] - code - src/schemas/auth.schema.ts
- [[logout()]] - code - src/modules/auth/auth.controller.ts
- [[logout()_1]] - code - src/modules/auth/auth.service.ts
- [[logoutAll()]] - code - src/modules/auth/auth.controller.ts
- [[logoutAll()_1]] - code - src/modules/auth/auth.service.ts
- [[me()]] - code - src/modules/auth/auth.controller.ts
- [[oauthCallback()]] - code - src/modules/auth/auth.controller.ts
- [[passport.ts]] - code - src/config/passport.ts
- [[passwordSchema]] - code - src/schemas/auth.schema.ts
- [[refresh()]] - code - src/modules/auth/auth.controller.ts
- [[refresh()_1]] - code - src/modules/auth/auth.service.ts
- [[revokeAllUserSessions()]] - code - src/modules/auth/auth.service.ts
- [[router_2]] - code - src/modules/auth/auth.router.ts
- [[setOutOfOffice()]] - code - src/modules/auth/auth.controller.ts
- [[toUserDto()]] - code - src/modules/auth/auth.service.ts

## Live Query (requires Dataview plugin)

```dataview
TABLE source_file, type FROM #community/Cloudinary__
SORT file.name ASC
```

## Connections to other communities
- 8 edges to [[_COMMUNITY_대여 서비스 로직]]
- 6 edges to [[_COMMUNITY_카탈로그 서비스]]
- 6 edges to [[_COMMUNITY_대여 부서장 권한 테스트]]
- 6 edges to [[_COMMUNITY_인증 서비스 테스트]]
- 2 edges to [[_COMMUNITY_TypeScript 빌드 설정]]
- 1 edge to [[_COMMUNITY_자산 스키마 Enum]]

## Top bridge nodes
- [[auth.service.ts]] - degree 33, connects to 4 communities
- [[passport.ts]] - degree 11, connects to 4 communities
- [[auth.controller.ts]] - degree 21, connects to 2 communities
- [[auth.router.ts]] - degree 11, connects to 2 communities
- [[auth.schema.ts]] - degree 14, connects to 1 community