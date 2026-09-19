import { authorize } from '../authorize'
import type { Request, Response, NextFunction } from 'express'
import type { Role } from '../../generated/prisma/enums'

function makeReq(role: Role): Request {
  return { user: { id: 'u-1', role } } as unknown as Request
}

const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as unknown as Response
const next = jest.fn() as NextFunction

beforeEach(() => jest.clearAllMocks())

describe('authorize() — 역할 설계 계약', () => {
  describe('ADMIN 전용 (사원 변경 작업)', () => {
    const gate = authorize('ADMIN')
    it('ADMIN → 통과', () => { gate(makeReq('ADMIN'), res, next); expect(next).toHaveBeenCalled() })
    it('TEAM_LEAD → 403', () => { gate(makeReq('TEAM_LEAD'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
    it('REPAIR_OWNER → 403', () => { gate(makeReq('REPAIR_OWNER'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
  })

  describe('ADMIN + TEAM_LEAD (사원 조회)', () => {
    const gate = authorize('ADMIN', 'TEAM_LEAD')
    it('ADMIN → 통과', () => { gate(makeReq('ADMIN'), res, next); expect(next).toHaveBeenCalled() })
    it('TEAM_LEAD → 통과', () => { gate(makeReq('TEAM_LEAD'), res, next); expect(next).toHaveBeenCalled() })
    it('USER → 403', () => { gate(makeReq('USER'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
  })

  describe('ADMIN + ASSET_MANAGER (마스터 데이터 변경)', () => {
    const gate = authorize('ADMIN', 'ASSET_MANAGER')
    it('ASSET_MANAGER → 통과', () => { gate(makeReq('ASSET_MANAGER'), res, next); expect(next).toHaveBeenCalled() })
    it('TEAM_LEAD → 403', () => { gate(makeReq('TEAM_LEAD'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
  })

  describe('ADMIN + TEAM_LEAD + REPAIR_OWNER (정비 승인)', () => {
    const gate = authorize('ADMIN', 'TEAM_LEAD', 'REPAIR_OWNER')
    it('REPAIR_OWNER → 통과', () => { gate(makeReq('REPAIR_OWNER'), res, next); expect(next).toHaveBeenCalled() })
    it('REPAIR_TECH → 403', () => { gate(makeReq('REPAIR_TECH'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
    it('AP_USER → 403', () => { gate(makeReq('AP_USER'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
  })

  describe('ADMIN + APPROVER (자산 폐기)', () => {
    const gate = authorize('ADMIN', 'APPROVER')
    it('APPROVER → 통과', () => { gate(makeReq('APPROVER'), res, next); expect(next).toHaveBeenCalled() })
    it('ASSET_MANAGER → 403', () => { gate(makeReq('ASSET_MANAGER'), res, next); expect(res.status).toHaveBeenCalledWith(403) })
  })

  it('미인증 → 401', () => {
    authorize('ADMIN')({} as Request, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(next).not.toHaveBeenCalled()
  })
})
