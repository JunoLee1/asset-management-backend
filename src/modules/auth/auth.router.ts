import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { authController } from './auth.controller'
import { authenticate } from '../../middlewares/authenticate'
import { validateBody } from '../../middlewares/validate'
import { getRedis } from '../../lib/redis'
import {
  loginSchema,
  acceptInviteSchema,
  changePasswordSchema,
  requestPasswordResetSchema,
  verifyResetCodeSchema,
} from '../../schemas/auth.schema'

const router: Router = Router()

// 단계별 잠금: 5회→10분, 10회→30분, 15회→1시간, 20회→24시간
// windowMs가 큰 순서로 정렬 (긴 잠금이 우선 검사되어야 함)
const TIERS = [
  { limit: 20, windowMs: 24 * 60 * 60 * 1000, message: '로그인이 차단됐습니다. 24시간 후 다시 시도해주세요.' },
  { limit: 15, windowMs: 60 * 60 * 1000,       message: '로그인 시도가 너무 많습니다. 1시간 후 다시 시도해주세요.' },
  { limit: 10, windowMs: 30 * 60 * 1000,       message: '로그인 시도가 너무 많습니다. 30분 후 다시 시도해주세요.' },
  { limit:  5, windowMs: 10 * 60 * 1000,       message: '로그인 시도가 너무 많습니다. 10분 후 다시 시도해주세요.' },
]

const progressiveLoginLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (process.env['NODE_ENV'] !== 'production') {
    next()
    return
  }
  const ip = req.ip ?? 'unknown'
  const redis = getRedis()
  if (!redis) {
    next()
    return
  }
  try {
    // 각 tier별 카운터를 개별 키로 관리 (windowMs가 서로 달라 하나의 카운터로는 불가)
    for (const tier of TIERS) {
      const key = `ratelimit:login:tier${tier.limit}:${ip}`
      const count = await redis.incr(key)
      if (count === 1) await redis.expire(key, Math.ceil(tier.windowMs / 1000))
      if (count > tier.limit) {
        res.status(429).json({ message: tier.message })
        return
      }
    }
    next()
  } catch (err) {
    // 로그인은 서비스 가용성이 최우선이므로 fail-open
    next()
  }
}

// ── 로컬 인증 ───────────────────────────────────────────────────────────────
router.post('/accept-invite', validateBody(acceptInviteSchema), authController.acceptInvite)
router.post(
  '/login',
  progressiveLoginLimiter,
  validateBody(loginSchema),
  authController.login,
)
router.post('/refresh', authController.refresh)
router.post('/logout', authController.logout)
router.post('/logout-all', authenticate, authController.logoutAll)
router.get('/me', authenticate, authController.me)
router.patch(
  '/me/password',
  authenticate,
  validateBody(changePasswordSchema),
  authController.changePassword,
)
router.patch('/me/out-of-office', authenticate, authController.setOutOfOffice)

// ── 비밀번호 리셋 ────────────────────────────────────────────────────────────
router.post('/password-reset', validateBody(requestPasswordResetSchema), authController.requestPasswordReset)
router.post('/password-reset/verify', validateBody(verifyResetCodeSchema), authController.verifyResetCode)

// ── Google OAuth ────────────────────────────────────────────────────────────
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/auth/google/failed' }),
  authController.oauthCallback,
)
router.get('/google/failed', (_req, res) => {
  res.status(401).json({ message: 'Google 인증에 실패했습니다.' })
})

// ── Kakao OAuth ─────────────────────────────────────────────────────────────
router.get('/kakao', passport.authenticate('kakao', { session: false }))
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { session: false, failureRedirect: '/auth/kakao/failed' }),
  authController.oauthCallback,
)
router.get('/kakao/failed', (_req, res) => {
  res.status(401).json({ message: 'Kakao 인증에 실패했습니다.' })
})

export { router as authRouter }
