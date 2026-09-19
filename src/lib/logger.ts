import pino from 'pino'

const nodeEnv = process.env['NODE_ENV'] ?? 'development'

export const logger = pino({
  level: nodeEnv === 'production' ? 'info' : 'debug',
  transport:
    nodeEnv !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
})
