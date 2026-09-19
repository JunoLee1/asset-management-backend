import type { LoanReturnCondition } from '../../../generated/prisma/enums'
import { CONDITION_MAP } from '../loan.types'

const assetStatusForCondition = (c: LoanReturnCondition) =>
  c === 'LOST' ? 'RETIRED' : 'IDLE'

describe('CONDITION_MAP — LOST 처리', () => {
  it('LOST → AssetCondition.LOST 로 매핑된다', () => {
    expect(CONDITION_MAP['LOST']).toBe('LOST')
  })

  it('MAJOR_DAMAGE → POOR 매핑 유지', () => {
    expect(CONDITION_MAP['MAJOR_DAMAGE']).toBe('POOR')
  })
})

describe('finalizeReturn LOST → RETIRED 로직', () => {
  it('LOST 조건이면 asset.status=RETIRED', () => {
    expect(assetStatusForCondition('LOST')).toBe('RETIRED')
  })

  it('GOOD 조건이면 asset.status=AVAILABLE', () => {
    expect(assetStatusForCondition('GOOD')).toBe('IDLE')
  })

  it('MAJOR_DAMAGE 조건이면 asset.status=AVAILABLE', () => {
    expect(assetStatusForCondition('MAJOR_DAMAGE')).toBe('IDLE')
  })
})
