import { app } from './app'
import { env } from './config/env'
import { logger } from './lib/logger'
import { startScheduler } from './lib/scheduler'

app.listen(env.port, '0.0.0.0', () => {
  logger.info(`Server listening on port ${env.port} [${env.nodeEnv}]`)
  startScheduler()
})
