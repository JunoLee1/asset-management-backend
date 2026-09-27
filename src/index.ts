import { app } from './app'
import { env } from './config/env'
import { logger } from './lib/logger'
import { startScheduler } from './lib/scheduler'
import { startWorkers, stopWorkers } from './lib/workers'

const PORT: number = Number(process.env.PORT) || 8080
const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server listening on port ${PORT} [${env.nodeEnv}]`)
  startScheduler()
  startWorkers()
})

async function shutdown(signal: string): Promise<void> {
  logger.info({ signal }, '[shutdown] received, stopping workers and closing server...')
  await stopWorkers()
  server.close(() => {
    logger.info('[shutdown] server closed')
    process.exit(0)
  })
  // 강제 종료 타이머 (10초 후)
  setTimeout(() => {
    logger.warn('[shutdown] forced exit after 10s')
    process.exit(1)
  }, 10_000).unref()
}

process.on('SIGTERM', () => void shutdown('SIGTERM'))
process.on('SIGINT', () => void shutdown('SIGINT'))
