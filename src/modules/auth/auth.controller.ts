import type { Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { authService } from './auth.service'
import { AppError } from '../../lib/AppError'
import type { LoginDto, AcceptInviteDto, RequestPasswordResetDto } from './auth.types'
import type { ChangePasswordInput, VerifyResetCodeInput } from '../../schemas/auth.schema'

// 요청 헤더에서 RT 메타데이터 (UA / IP) 추출
const extractMeta = (req: Request) => ({
  userAgent: req.get('User-Agent') ?? null,
  ipAddress: req.ip ?? null,
})

const acceptInvite = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.acceptInvite(req.body as AcceptInviteDto, extractMeta(req))
  res.status(201).json(result)
}

const login = async (req: Request, res: Response): Promise<void> => {
  const result = await authService.login(req.body as LoginDto, extractMeta(req))
  res.json(result)
}

const refresh = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body as { refreshToken: string }
  if (!refreshToken) throw new AppError(400, '리프레시 토큰이 필요합니다.')
  const tokens = await authService.refresh(refreshToken)
  res.json(tokens)
}

const logout = async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = (req.body ?? {}) as { refreshToken?: string }
  if (!refreshToken) throw new AppError(400, '리프레시 토큰이 필요합니다.')
  await authService.logout(refreshToken, extractMeta(req))
  res.status(204).send()
}

const logoutAll = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new AppError(401, '인증이 필요합니다.')
  const result = await authService.logoutAll(req.user.id, extractMeta(req))
  res.json(result)
}

const me = (req: Request, res: Response): void => {
  res.json(req.user)
}

const setOutOfOffice = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new AppError(401, '인증이 필요합니다.')
  const { isOutOfOffice } = req.body as { isOutOfOffice: boolean }
  if (typeof isOutOfOffice !== 'boolean') throw new AppError(400, 'isOutOfOffice는 boolean이어야 합니다.')
  await prisma.user.update({ where: { id: req.user.id }, data: { isOutOfOffice } })
  res.json({ isOutOfOffice })
}

const changePassword = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new AppError(401, '인증이 필요합니다.')
  await authService.changePassword(req.user.id, req.body as ChangePasswordInput, extractMeta(req))
  res.status(204).send()
}

// OAuth 콜백: passport가 req.user에 UserDto를 주입 → 토큰 발급 후 프론트엔드로 redirect
const oauthCallback = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:5173'
    res.redirect(`${frontendUrl}/auth/callback?error=auth_failed&error_description=인증에 실패했습니다.`)
    return
  }
  const { id, email, role } = req.user
  const tokens = await authService.issueTokenPair({ sub: id, email, role }, extractMeta(req))
  const frontendUrl = process.env['FRONTEND_URL'] ?? 'http://localhost:5173'
  const params = new URLSearchParams({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
  })
  res.redirect(`${frontendUrl}/auth/callback?${params.toString()}`)
}

const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  await authService.requestPasswordReset(req.body as RequestPasswordResetDto)
  res.json({ message: '인증코드가 발송되었습니다.' })
}

const verifyResetCode = async (req: Request, res: Response): Promise<void> => {
  await authService.verifyResetCode(req.body as VerifyResetCodeInput)
  res.json({ message: '비밀번호가 변경되었습니다.' })
}

export const authController = {
  acceptInvite,
  login,
  refresh,
  logout,
  logoutAll,
  me,
  changePassword,
  oauthCallback,
  setOutOfOffice,
  requestPasswordReset,
  verifyResetCode,
}
