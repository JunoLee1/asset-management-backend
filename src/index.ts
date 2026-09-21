import { app } from './app'
import { env } from './config/env'
import { logger } from './lib/logger'
import { startScheduler } from './lib/scheduler'

const PORT = process.env.PORT || 8080
app.listen(env.port, '0.0.0.0', () => {
  logger.info(`Server listening on port ${PORT} [${env.nodeEnv}]`)
  startScheduler()
})
