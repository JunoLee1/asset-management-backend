import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as KakaoStrategy } from 'passport-kakao'
import { env } from './env'
import { authService } from '../modules/auth/auth.service'
import { prisma } from '../lib/prisma'
import { AppError } from '../lib/AppError'
import type { JwtPayload } from '../modules/auth/auth.types'

export const configurePassport = (): void => {
  // Local: 이메일/비밀번호 → done(null, UserDto)
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        const result = await authService.login({ email, password })
        done(null, result.user)
      } catch (err) {
        if (err instanceof AppError && err.statusCode === 401) {
          done(null, false, { message: err.message })
        } else {
          done(err)
        }
      }
    }),
  )

  // JWT: Authorization: Bearer <token> → done(null, UserDto)
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env.jwt.secret,
      },
      async (payload: JwtPayload, done) => {
        try {
          // team.department 까지 펼쳐서 req.user 에 부서 정보 노출 (TEAM_LEAD 의 "내 부서" 자동 필터 등)
          const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            include: { team: { include: { department: true } } },
          })
          if (!user?.isActive) return done(null, false)
          done(null, {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            isOutOfOffice: user.isOutOfOffice,
            teamId: user.team?.id ?? null,
            teamName: user.team?.name ?? null,
            departmentId: user.team?.department.id ?? null,
            departmentName: user.team?.department.name ?? null,
          })
        } catch (err) {
          done(err)
        }
      },
    ),
  )

  // Google OAuth
  if (env.google.clientId) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: env.google.clientId,
          clientSecret: env.google.clientSecret,
          callbackURL: env.google.callbackUrl,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value
            if (!email) return done(new AppError(400, 'Google 계정에 이메일 정보가 없습니다.'))
            const result = await authService.findOrCreateOAuthUser(
              'GOOGLE',
              { providerId: profile.id, email, name: profile.displayName },
              accessToken,
              refreshToken,
            )
            done(null, result.user)
          } catch (err) {
            done(err as Error)
          }
        },
      ),
    )
  }

  // Kakao OAuth
  if (env.kakao.clientId) {
    passport.use(
      new KakaoStrategy(
        { clientID: env.kakao.clientId, callbackURL: env.kakao.callbackUrl },
        async (accessToken, refreshToken, profile, done) => {
          try {
            const email = profile._json.kakao_account?.email
            if (!email) return done(new AppError(400, 'Kakao 계정에 이메일 정보가 없습니다.'))
            const result = await authService.findOrCreateOAuthUser(
              'KAKAO',
              { providerId: profile.id, email, name: profile.displayName },
              accessToken,
              refreshToken,
            )
            done(null, result.user)
          } catch (err) {
            done(err as Error)
          }
        },
      ),
    )
  }
}
