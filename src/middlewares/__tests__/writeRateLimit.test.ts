import type { Request, Response, NextFunction } from 'express'

// Redis mock: 카운터 저장소
const counters = new Map<string, number>()
const expiries = new Map<string, number>()

const mockRedis = {
  incr: jest.fn(async (key: string) => {
    const v = (counters.get(key) ?? 0) + 1
    counters.set(key, v)
    return v
  }),
  expire: jest.fn(async (key: string, seconds: number) => {
    expiries.set(key, seconds)
    return 1
  }),
  del: jest.fn(async (key: string) => {
    counters.delete(key)
    expiries.delete(key)
    return 1
  }),
}

jest.mock('../../lib/redis', () => ({
  getRedis: jest.fn(() => mockRedis),
}))

jest.mock('../../lib/requestHelpers', () => ({
  getRequester: jest.fn((req: Request) => {
    const auth = (req.headers.authorization ?? '') as string
    if (auth === 'user') return { id: 'user-1', role: 'ADMIN' }
    throw new Error('no auth')
  }),
}))

import { masterWriteRateLimit } from '../writeRateLimit'

const makeReq = (): Partial<Request> => ({
  headers: { authorization: 'user' },
  ip: '127.0.0.1',
})

const makeRes = (): { status: jest.Mock; json: jest.Mock } => {
  const res: { status: jest.Mock; json: jest.Mock } = { status: jest.fn(), json: jest.fn() }
  res.status.mockReturnValue(res)
  res.json.mockReturnValue(res)
  return res
}

beforeEach(() => {
  counters.clear()
  expiries.clear()
  mockRedis.incr.mockClear()
  mockRedis.expire.mockClear()
  process.env['NODE_ENV'] = 'production'
})

describe('masterWriteRateLimit (Redis)', () => {
  it('limit 이내면 next() 호출', async () => {
    const req = makeReq() as Request
    const res = makeRes() as unknown as Response
    const next = jest.fn() as NextFunction
    await masterWriteRateLimit(req, res, next)
    expect(next).toHaveBeenCalled()
    expect(mockRedis.incr).toHaveBeenCalledWith('ratelimit:master-write:user-1')
  })

  it('limit 초과 시 429 반환', async () => {
    const req = makeReq() as Request
    const res = makeRes() as unknown as Response
    const next = jest.fn() as NextFunction
    counters.set('ratelimit:master-write:user-1', 20)
    await masterWriteRateLimit(req, res, next)
    expect(res.status).toHaveBeenCalledWith(429)
    expect(next).not.toHaveBeenCalled()
  })

  it('첫 요청 시 EXPIRE 호출', async () => {
    const req = makeReq() as Request
    const res = makeRes() as unknown as Response
    const next = jest.fn() as NextFunction
    await masterWriteRateLimit(req, res, next)
    expect(mockRedis.expire).toHaveBeenCalledWith(
      'ratelimit:master-write:user-1',
      5 * 60,
    )
  })
})
