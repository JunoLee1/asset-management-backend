import { generateAssetCode } from '../assetCodeGenerator'

const txMock = {
  assetCodeCounter: {
    upsert: jest.fn(),
  },
}

beforeEach(() => jest.clearAllMocks())

// upsert 결과의 nextNumber는 "다음 번호" → 발급 = nextNumber - 1
describe('generateAssetCode', () => {
  it('IT_ASSET → IT-0001 (첫 발급)', async () => {
    txMock.assetCodeCounter.upsert.mockResolvedValue({ class: 'IT_ASSET', nextNumber: 2 })
    const code = await generateAssetCode(txMock as never, 'IT_ASSET')
    expect(code).toBe('IT-0001')
  })

  it('OFFICE_ASSET → OFF-0001', async () => {
    txMock.assetCodeCounter.upsert.mockResolvedValue({ class: 'OFFICE_ASSET', nextNumber: 2 })
    const code = await generateAssetCode(txMock as never, 'OFFICE_ASSET')
    expect(code).toBe('OFF-0001')
  })

  it('FACILITY_ASSET → FAC-0001', async () => {
    txMock.assetCodeCounter.upsert.mockResolvedValue({ class: 'FACILITY_ASSET', nextNumber: 2 })
    const code = await generateAssetCode(txMock as never, 'FACILITY_ASSET')
    expect(code).toBe('FAC-0001')
  })

  it('4자리 0패딩 (12 → IT-0012)', async () => {
    txMock.assetCodeCounter.upsert.mockResolvedValue({ class: 'IT_ASSET', nextNumber: 13 })
    const code = await generateAssetCode(txMock as never, 'IT_ASSET')
    expect(code).toBe('IT-0012')
  })

  it('5자리 이상도 표시 (10000 → IT-10000)', async () => {
    txMock.assetCodeCounter.upsert.mockResolvedValue({ class: 'IT_ASSET', nextNumber: 10001 })
    const code = await generateAssetCode(txMock as never, 'IT_ASSET')
    expect(code).toBe('IT-10000')
  })

  it('upsert는 atomic 증가 (create:2 / update: nextNumber+1)', async () => {
    txMock.assetCodeCounter.upsert.mockResolvedValue({ class: 'IT_ASSET', nextNumber: 2 })
    await generateAssetCode(txMock as never, 'IT_ASSET')
    expect(txMock.assetCodeCounter.upsert).toHaveBeenCalledWith({
      where: { class: 'IT_ASSET' },
      create: { class: 'IT_ASSET', nextNumber: 2 },
      update: { nextNumber: { increment: 1 } },
    })
  })
})
