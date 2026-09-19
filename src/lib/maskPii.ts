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
