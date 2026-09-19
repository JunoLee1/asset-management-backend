import type { Request } from 'express'
import { AppError } from './AppError'
import type { Role } from '../generated/prisma/enums'

// 컨트롤러 공통: 인증된 사용자 컨텍스트와 라우트 파라미터 추출
// 4개 모듈(asset / maintenance / license / admin) 에 흩어져 있던 헬퍼를 통합.

export interface RequesterContext {
  id: string
  role: Role
  departmentId?: string | null
  teamId?: string | null
}

export const getRequester = (req: Request): RequesterContext => {
  if (!req.user) throw new AppError(401, '인증이 필요합니다.')
  return {
    id: req.user.id,
    role: req.user.role,
    departmentId: req.user.departmentId ?? undefined,
    teamId: req.user.teamId ?? undefined,
  }
}

export const requireId = (req: Request, name = 'id'): string => {
  const id = req.params[name]
  if (typeof id !== 'string' || !id) throw new AppError(400, `${name} 가 필요합니다.`)
  return id
}

// 감사 로그용 컨텍스트 (IP / userAgent). req.ip 는 trust proxy 설정에 의존.
export interface AuditContext {
  ipAddress: string | null
  userAgent: string | null
}

export const getAuditContext = (req: Request): AuditContext => ({
  ipAddress: req.ip ?? null,
  userAgent: req.headers['user-agent'] ?? null,
})
