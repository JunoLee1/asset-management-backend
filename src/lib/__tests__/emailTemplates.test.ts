import { inviteEmailTemplate } from '../emailTemplates'

const NAME = '홍길동'
const INVITE_URL = 'http://localhost:5173/accept-invite?token=abc123'

describe('inviteEmailTemplate', () => {
  it('제목에 "초대"가 포함된다', () => {
    const { subject } = inviteEmailTemplate(NAME, INVITE_URL)
    expect(subject).toContain('초대')
  })

  it('본문에 사원 이름이 포함된다', () => {
    const { html } = inviteEmailTemplate(NAME, INVITE_URL)
    expect(html).toContain(NAME)
  })

  it('본문에 초대 URL이 포함된다', () => {
    const { html } = inviteEmailTemplate(NAME, INVITE_URL)
    expect(html).toContain(INVITE_URL)
  })

  it('본문에 만료 시간(48시간) 안내가 포함된다', () => {
    const { html } = inviteEmailTemplate(NAME, INVITE_URL)
    expect(html).toContain('48')
  })

  it('서로 다른 이름/URL로 호출해도 각각 올바르게 포함된다', () => {
    const { html } = inviteEmailTemplate('김철수', 'http://other.com?token=xyz')
    expect(html).toContain('김철수')
    expect(html).toContain('http://other.com?token=xyz')
    expect(html).not.toContain(NAME)
  })
})
