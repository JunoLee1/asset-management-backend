import { loginSchema, acceptInviteSchema, inviteUserSchema } from '../auth.schema'

// ── loginSchema ───────────────────────────────────────────────────────────────
describe('loginSchema', () => {
  const valid = { email: 'hong@company.com', password: 'Password@1' }

  it('유효한 이메일 + 비밀번호는 통과한다', () => {
    expect(loginSchema.safeParse(valid).success).toBe(true)
  })

  describe('email', () => {
    it('이메일 형식이 아니면 실패한다', () => {
      const result = loginSchema.safeParse({ ...valid, email: 'not-an-email' })
      expect(result.success).toBe(false)
    })

    it('@가 없으면 실패한다', () => {
      const result = loginSchema.safeParse({ ...valid, email: 'hongcompany.com' })
      expect(result.success).toBe(false)
    })

    it('빈 문자열이면 실패한다', () => {
      expect(loginSchema.safeParse({ ...valid, email: '' }).success).toBe(false)
    })
  })

  describe('password', () => {
    it('8자 미만이면 실패한다', () => {
      expect(loginSchema.safeParse({ ...valid, password: 'Ab@1' }).success).toBe(false)
    })

    it('특수문자가 없으면 실패한다', () => {
      expect(loginSchema.safeParse({ ...valid, password: 'Password1' }).success).toBe(false)
    })

    it('8자 이상 + 특수문자 포함이면 통과한다', () => {
      expect(loginSchema.safeParse({ ...valid, password: 'MyPass@12' }).success).toBe(true)
    })

    it('빈 문자열이면 실패한다', () => {
      expect(loginSchema.safeParse({ ...valid, password: '' }).success).toBe(false)
    })
  })
})

// ── acceptInviteSchema ────────────────────────────────────────────────────────
describe('acceptInviteSchema', () => {
  const valid = { token: 'abc123', password: 'NewPass@9' }

  it('유효한 값은 통과한다', () => {
    expect(acceptInviteSchema.safeParse(valid).success).toBe(true)
  })

  it('token이 비어있으면 실패한다', () => {
    expect(acceptInviteSchema.safeParse({ ...valid, token: '' }).success).toBe(false)
  })

  it('비밀번호 조건 미충족이면 실패한다', () => {
    expect(acceptInviteSchema.safeParse({ ...valid, password: 'short' }).success).toBe(false)
  })
})

// ── inviteUserSchema ──────────────────────────────────────────────────────────
describe('inviteUserSchema', () => {
  const valid = { email: 'hong@company.com', name: '홍길동', hireDate: '2026-01-15' }

  it('이메일 + 이름 + 입사일이면 통과한다', () => {
    expect(inviteUserSchema.safeParse(valid).success).toBe(true)
  })

  it('입사일이 없으면 실패한다', () => {
    const { hireDate: _hireDate, ...withoutHireDate } = valid
    expect(inviteUserSchema.safeParse(withoutHireDate).success).toBe(false)
  })

  it('이름이 빈 문자열이면 실패한다', () => {
    expect(inviteUserSchema.safeParse({ ...valid, name: '' }).success).toBe(false)
  })

  it('이름이 공백만이면 실패한다', () => {
    expect(inviteUserSchema.safeParse({ ...valid, name: '   ' }).success).toBe(false)
  })

  it('이메일 형식이 잘못되면 실패한다', () => {
    expect(inviteUserSchema.safeParse({ ...valid, email: 'invalid' }).success).toBe(false)
  })

  it('유효한 한국 전화번호는 통과한다', () => {
    expect(inviteUserSchema.safeParse({ ...valid, phoneNumber: '01012345678' }).success).toBe(true)
  })

  it('잘못된 전화번호 형식은 실패한다', () => {
    expect(inviteUserSchema.safeParse({ ...valid, phoneNumber: '0212345678' }).success).toBe(false)
  })
})
