import crypto from 'crypto'

// License productKey 암호화 (AES-256-CBC) - phone 패턴 동일, 키만 별도 환경변수
const ALGORITHM = 'aes-256-cbc'
const KEY_HEX =
  process.env['LICENSE_ENCRYPTION_KEY'] ?? process.env['PHONE_ENCRYPTION_KEY'] ?? ''

function getKey(): Buffer {
  if (KEY_HEX.length !== 64) {
    throw new Error('LICENSE/PHONE_ENCRYPTION_KEY must be 64 hex characters (32 bytes)')
  }
  return Buffer.from(KEY_HEX, 'hex')
}

export function encryptLicenseKey(plain: string): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv)
  const encrypted = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decryptLicenseKey(encrypted: string): string {
  const [ivHex, dataHex] = encrypted.split(':')
  if (!ivHex || !dataHex) throw new Error('Invalid encrypted license key format')
  const iv = Buffer.from(ivHex, 'hex')
  const data = Buffer.from(dataHex, 'hex')
  const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}

// UI 표시용 마지막 4자리만 노출 (예: "XXXX-XXXX-XXXX-1234" → "****-****-****-1234")
export function maskLicenseKey(key: string): string {
  if (key.length <= 4) return '****'
  return '*'.repeat(key.length - 4) + key.slice(-4)
}
