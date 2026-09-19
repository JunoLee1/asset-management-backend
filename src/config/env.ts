function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) throw new Error(`Missing required environment variable: ${key}`)
  return value
}

export const env = {
  port: parseInt(process.env['PORT'] ?? '3001', 10),
  nodeEnv: (process.env['NODE_ENV'] ?? 'development') as 'development' | 'production' | 'test',
  databaseUrl: requireEnv('DATABASE_URL'),
  jwt: {
    secret: requireEnv('JWT_SECRET'),
    refreshSecret: requireEnv('JWT_REFRESH_SECRET'),
    expiresIn: process.env['JWT_EXPIRES_IN'] ?? '15m',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] ?? '7d',
  },
  google: {
    clientId: process.env['GOOGLE_CLIENT_ID'] ?? '',
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] ?? '',
    callbackUrl: process.env['GOOGLE_CALLBACK_URL'] ?? 'http://localhost:3001/auth/google/callback',
  },
  kakao: {
    clientId: process.env['KAKAO_CLIENT_ID'] ?? '',
    callbackUrl: process.env['KAKAO_CALLBACK_URL'] ?? 'http://localhost:3001/auth/kakao/callback',
  },
  smtp: {
    gmailUser: process.env['GMAIL_USER'] ?? '',
    gmailAppPassword: process.env['GMAIL_APP_PASSWORD'] ?? '',
    from: process.env['SMTP_FROM'] ?? '자산관리 ERP <noreply@company.com>',
  },
  sms: {
    serviceId: process.env['NAVER_SMS_SERVICE_ID'] ?? '',
    accessKey: process.env['NAVER_SMS_ACCESS_KEY'] ?? '',
    secretKey: process.env['NAVER_SMS_SECRET_KEY'] ?? '',
    fromNumber: process.env['NAVER_SMS_FROM_NUMBER'] ?? '',
  },
  frontendUrl: process.env['FRONTEND_URL'] ?? 'http://localhost:5173',
} as const
