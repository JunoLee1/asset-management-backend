// 테스트용 키 환경변수 설정 (import 전에 먼저)
process.env['PHONE_ENCRYPTION_KEY'] = 'a'.repeat(64)
process.env['PHONE_HASH_SECRET'] = 'test-hash-secret'

import { encryptPhone, decryptPhone, hashPhone, maskPhone } from '../phoneEncryption'

const PHONE = '01012345678'

describe('encryptPhone / decryptPhone', () => {
  it('암호화된 값은 원본 전화번호가 아니다', () => {
    expect(encryptPhone(PHONE)).not.toBe(PHONE)
  })

  it('복호화하면 원본 전화번호가 복원된다', () => {
    const encrypted = encryptPhone(PHONE)
    expect(decryptPhone(encrypted)).toBe(PHONE)
  })

  it('동일한 번호를 암호화해도 매번 다른 값이 생성된다 (랜덤 IV)', () => {
    const a = encryptPhone(PHONE)
    const b = encryptPhone(PHONE)
    expect(a).not.toBe(b)
  })
})

describe('hashPhone', () => {
  it('동일한 번호는 항상 같은 해시를 반환한다 (결정론적)', () => {
    expect(hashPhone(PHONE)).toBe(hashPhone(PHONE))
  })

  it('다른 번호는 다른 해시를 반환한다', () => {
    expect(hashPhone(PHONE)).not.toBe(hashPhone('01099998888'))
  })

  it('해시는 원본 번호가 아니다', () => {
    expect(hashPhone(PHONE)).not.toBe(PHONE)
  })
})

describe('maskPhone', () => {
  it('가운데 4자리를 마스킹한다', () => {
    expect(maskPhone('01012345678')).toBe('010-****-5678')
  })

  it('잘못된 형식이면 전체 마스킹한다', () => {
    expect(maskPhone('invalid')).toBe('***')
  })
})
