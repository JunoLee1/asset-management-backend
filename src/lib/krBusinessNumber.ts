const WEIGHTS = [1, 3, 7, 1, 3, 7, 1, 3, 5]

export function validateKrBusinessNumber(raw: string): boolean {
  const digits = raw.replace(/[^0-9]/g, '')
  if (digits.length !== 10) return false

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(digits[i]) * WEIGHTS[i]
  }
  sum += Math.floor((parseInt(digits[8]) * 5) / 10)
  const check = (10 - (sum % 10)) % 10
  return check === parseInt(digits[9])
}

export function formatKrBusinessNumber(raw: string): string {
  const digits = raw.replace(/[^0-9]/g, '')
  if (digits.length !== 10) return raw
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
}
