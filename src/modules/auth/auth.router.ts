import { Router } from 'express'
import passport from 'passport'
import { authController } from './auth.controller'
import { authenticate } from '../../middlewares/authenticate'
import { validateBody } from '../../middlewares/validate'
import {
  loginSchema,
  acceptInviteSchema,
  changePasswordSchema,
  requestPasswordResetSchema,
  verifyResetCodeSchema,
} from '../../schemas/auth.schema'

const router: Router = Router()

// ── 로컬 인증 ───────────────────────────────────────────────────────────────
router.post('/accept-invite', validateBody(acceptInviteSchema), authController.acceptInvite)
router.post('/login', validateBody(loginSchema), authController.login)
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
