export function maskName(name: string): string {
  if (name.length <= 1) return '*'
  if (name.length === 2) return name[0] + '*'
  return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1]
}

export function maskEmail(email: string): string {
  const atIdx = email.indexOf('@')
  if (atIdx < 0) return email
  const local = email.slice(0, atIdx)
  const domain = email.slice(atIdx)
  if (local.length <= 1) return '*' + domain
  if (local.length === 2) return local[0] + '*' + domain
  return local[0] + '*'.repeat(local.length - 2) + local[local.length - 1] + domain
}

// 전화번호 마스킹 — 마지막 4자리만 노출 (예: 01012345678 → *******5678)
export function maskPhone(phone: string): string {
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.length <= 4) return '*'.repeat(digits.length)
  return '*'.repeat(digits.length - 4) + digits.slice(-4)
}
