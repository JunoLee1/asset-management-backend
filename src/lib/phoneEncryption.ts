import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const KEY_HEX = process.env['PHONE_ENCRYPTION_KEY'] ?? ''
const HASH_SECRET = process.env['PHONE_HASH_SECRET'] ?? ''

function getKey(): Buffer {
  if (KEY_HEX.length !== 64) throw new Error('PHONE_ENCRYPTION_KEY must be 64 hex characters (32 bytes)')
  return Buffer.from(KEY_HEX, 'hex')
}

export function encryptPhone(phone: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(phone, 'utf8'), cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decryptPhone(encrypted: string): string {
  const [ivHex, dataHex] = encrypted.split(':')
  if (!ivHex || !dataHex) throw new Error('Invalid encrypted phone format')
  const iv = Buffer.from(ivHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}

// 중복 조회용 결정론적 HMAC
export function hashPhone(phone: string): string {
  if (!HASH_SECRET) throw new Error('PHONE_HASH_SECRET is not set')
  return crypto.createHmac('sha256', HASH_SECRET).update(phone).digest('hex')
}

// 로그 출력용 마스킹: 01012345678 → 010-****-5678
export function maskPhone(phone: string): string {
  const match = phone.match(/^(\d{3})(\d{4})(\d{4})$/)
  if (!match) return '***'
  return `${match[1]}-****-${match[3]}`
}
