import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'

function getKey(envKey: string): Buffer {
  const hex = process.env[envKey] ?? ''
  if (hex.length !== 64) throw new Error(`${envKey} must be 64 hex chars (32 bytes)`)
  return Buffer.from(hex, 'hex')
}

export function encryptField(plain: string, envKey: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(envKey), iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decryptField(encrypted: string, envKey: string): string {
  const [ivHex, dataHex] = encrypted.split(':')
  if (!ivHex || !dataHex) throw new Error('Invalid encrypted field format')
  const iv = Buffer.from(ivHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(envKey), iv)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}

export function hashField(value: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

// 계좌번호 마스킹: 1234567890123 → ****-*****-0123
export function maskBankAccount(account: string): string {
  const digits = account.replace(/\D/g, '')
  if (digits.length < 4) return '****'
  return '*'.repeat(digits.length - 4) + digits.slice(-4)
}

// 사업자등록번호 마스킹: 000-00-00000 → 000-**-*****
export function maskBusinessReg(brn: string): string {
  return brn.replace(/^(\d{3})-(\d{2})-(\d{5})$/, '$1-**-*****')
}
