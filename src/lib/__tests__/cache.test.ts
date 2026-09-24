// Redis mock
const store = new Map<string, string>()

const mockRedis = {
  get: jest.fn(async (key: string) => store.get(key) ?? null),
  set: jest.fn(async (key: string, value: string, _mode: string, _ttl: number) => {
    store.set(key, value)
    return 'OK'
  }),
}

jest.mock('../redis', () => ({
  getRedis: jest.fn(() => mockRedis),
}))

import { withCache } from '../cache'

beforeEach(() => {
  store.clear()
  mockRedis.get.mockClear()
  mockRedis.set.mockClear()
})

describe('withCache', () => {
  it('cache miss 시 원본 함수 실행 + 결과 저장', async () => {
    const fn = jest.fn(async () => ({ v: 1 }))
    const result = await withCache('test:key1', 30, fn)
    expect(result).toEqual({ v: 1 })
    expect(fn).toHaveBeenCalledTimes(1)
    expect(mockRedis.set).toHaveBeenCalledWith(
      'test:key1',
      JSON.stringify({ v: 1 }),
      'EX',
      30,
    )
  })

  it('cache hit 시 원본 함수 미실행', async () => {
    store.set('test:key2', JSON.stringify({ v: 2 }))
    const fn = jest.fn(async () => ({ v: 999 }))
    const result = await withCache('test:key2', 30, fn)
    expect(result).toEqual({ v: 2 })
    expect(fn).not.toHaveBeenCalled()
  })

  it('Redis 실패 시 원본 함수 fallback', async () => {
    mockRedis.get.mockRejectedValueOnce(new Error('redis down'))
    const fn = jest.fn(async () => ({ v: 3 }))
    const result = await withCache('test:key3', 30, fn)
    expect(result).toEqual({ v: 3 })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})

describe('withCache — Redis null', () => {
  beforeEach(() => {
    // getRedis returns null
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('../redis').getRedis.mockReturnValueOnce(null)
  })

  it('Redis 미설정 시 원본 함수 실행', async () => {
    const fn = jest.fn(async () => ({ v: 4 }))
    const result = await withCache('test:key4', 30, fn)
    expect(result).toEqual({ v: 4 })
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
