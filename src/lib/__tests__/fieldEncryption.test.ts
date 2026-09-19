// 테스트용 키 환경변수 설정 (import 전에 먼저)
process.env['BANK_ACCOUNT_ENCRYPTION_KEY'] = 'b'.repeat(64)
process.env['BUSINESS_REG_ENCRYPTION_KEY'] = 'c'.repeat(64)

import {
  encryptField,
  decryptField,
  hashField,
  maskBankAccount,
  maskBusinessReg,
} from '../fieldEncryption'

const ENV_KEY = 'BANK_ACCOUNT_ENCRYPTION_KEY'
const ACCOUNT = '1234567890123'

describe('encryptField / decryptField', () => {
  it('암호화된 값은 원본이 아니다', () => {
    expect(encryptField(ACCOUNT, ENV_KEY)).not.toBe(ACCOUNT)
  })

  it('복호화하면 원본이 복원된다', () => {
    const encrypted = encryptField(ACCOUNT, ENV_KEY)
    expect(decryptField(encrypted, ENV_KEY)).toBe(ACCOUNT)
  })

  it('동일한 값을 암호화해도 매번 다른 값이 생성된다 (랜덤 IV)', () => {
    const a = encryptField(ACCOUNT, ENV_KEY)
    const b = encryptField(ACCOUNT, ENV_KEY)
    expect(a).not.toBe(b)
  })

  it('잘못된 포맷이면 복호화 시 에러를 던진다', () => {
    expect(() => decryptField('invalid-no-colon', ENV_KEY)).toThrow('Invalid encrypted field format')
  })
})

describe('hashField', () => {
  it('동일한 값은 항상 같은 해시를 반환한다 (결정론적)', () => {
    expect(hashField(ACCOUNT, 'secret')).toBe(hashField(ACCOUNT, 'secret'))
  })

  it('다른 값은 다른 해시를 반환한다', () => {
    expect(hashField(ACCOUNT, 'secret')).not.toBe(hashField('9999999999999', 'secret'))
  })

  it('해시는 원본 값이 아니다', () => {
    expect(hashField(ACCOUNT, 'secret')).not.toBe(ACCOUNT)
  })
})

describe('maskBankAccount', () => {
  it('13자리 계좌번호 — 뒤 4자리만 노출', () => {
    expect(maskBankAccount('1234567890123')).toBe('*********0123')
  })

  it('하이픈 포함 계좌번호 — 숫자만 추출 후 마스킹', () => {
    expect(maskBankAccount('123-456-0123')).toBe('******0123')
  })

  it('4자리 미만이면 전체 마스킹', () => {
    expect(maskBankAccount('123')).toBe('****')
  })

  it('정확히 4자리면 **** 없이 4자리 노출', () => {
    expect(maskBankAccount('1234')).toBe('1234')
  })
})

describe('maskBusinessReg', () => {
  it('표준 형식 000-00-00000 → 000-**-*****', () => {
    expect(maskBusinessReg('123-45-67890')).toBe('123-**-*****')
  })

  it('형식 불일치이면 원본 그대로 반환', () => {
    expect(maskBusinessReg('1234567890')).toBe('1234567890')
  })
})
