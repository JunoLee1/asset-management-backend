import express, { type Express } from 'express'
import cors from 'cors'
import passport from 'passport'
import { configurePassport } from './config/passport'
import { authRouter } from './modules/auth/auth.router'
import { adminRouter } from './modules/admin/admin.router'
import { dashboardRouter } from './modules/dashboard/dashboard.router'
import { assetRouter } from './modules/assets/asset.router'
import { masterRouter } from './modules/master/master.router'
import { maintenanceRouter } from './modules/maintenance/maintenance.router'
import { licenseRouter } from './modules/licenses/license.router'
import { depreciationRouter } from './modules/depreciation/depreciation.router'
import { catalogRouter } from './modules/catalog/catalog.router'
import { manufacturerRouter } from './modules/manufacturer/manufacturer.router'
import { loanRouter } from './modules/loans/loan.router'
import { notificationRouter } from './modules/notifications/notification.router'
import { analyticsRouter } from './modules/analytics/analytics.router'
import { softwareRouter } from './modules/security/software/software.router'
import { agentRouter } from './modules/agent/agent.router'
import { detectedSoftwareRouter } from './modules/security/detected-software/detected-software.router'
import { disposalRouter } from './modules/disposal/disposal.router'
import { webhookRouter } from './modules/webhooks/webhook.router'
import { repairReportRouter } from './modules/reports/report.router'
import { securityReportRouter } from './modules/reports/security-report.router'
import { reportsHubRouter } from './modules/reports/reports-hub.router'
import { monthlyReportRouter } from './modules/reports/monthly-report.router'
import { errorHandler } from './middlewares/errorHandler'

const app: Express = express()

app.use(cors())
app.use(express.json())

configurePassport()
app.use(passport.initialize())

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
app.use('/dashboard', dashboardRouter)
app.use('/assets', assetRouter)
app.use('/master', masterRouter)
app.use('/maintenances', maintenanceRouter)
app.use('/licenses', licenseRouter)
app.use('/depreciations', depreciationRouter)
app.use('/catalogs', catalogRouter)
app.use('/manufacturers', manufacturerRouter)
app.use('/loans', loanRouter)
app.use('/notifications', notificationRouter)
app.use('/analytics', analyticsRouter)
app.use('/software', softwareRouter)
app.use('/agent', agentRouter)
app.use('/admin/detected-software', detectedSoftwareRouter)
app.use('/disposals', disposalRouter)
app.use('/webhooks', webhookRouter)
app.use('/repair-reports', repairReportRouter)
app.use('/security-reports', securityReportRouter)
app.use('/reports', reportsHubRouter)
app.use('/reports', monthlyReportRouter)

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

export { app }
