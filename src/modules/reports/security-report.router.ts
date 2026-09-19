import { Router, type Request, type Response, type NextFunction } from 'express'
import { authenticate } from '../../middlewares/authenticate'
import { authorize } from '../../middlewares/authorize'
import { getRequester, requireId } from '../../lib/requestHelpers'
import { securityReportService, buildSecurityStats } from './security-report.service'

const router:Router = Router()
router.use(authenticate)

// 통계 미리보기
router.get('/stats', authorize('SECURITY_OFFICER', 'ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = Number(req.query.year)
    const month = Number(req.query.month)
    if (!year || !month) { res.status(400).json({ message: 'year, month 필수' }); return }
    res.json(await buildSecurityStats(year, month))
  } catch (e) { next(e) }
})

router.get('/', authorize('SECURITY_OFFICER', 'ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, role } = getRequester(req)
    res.json(await securityReportService.list(id, role))
  } catch (e) { next(e) }
})

router.get('/:id', authorize('SECURITY_OFFICER', 'ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await securityReportService.getById(requireId(req)))
  } catch (e) { next(e) }
})

router.post('/', authorize('SECURITY_OFFICER'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = getRequester(req)
    const { year, month, title, comment } = req.body as { year: number; month: number; title: string; comment?: string }
    res.status(201).json(await securityReportService.create({ year, month, title, comment }, id))
  } catch (e) { next(e) }
})

router.patch('/:id', authorize('SECURITY_OFFICER'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: requesterId } = getRequester(req)
    const { title, comment } = req.body as { title?: string; comment?: string | null }
    res.json(await securityReportService.update(requireId(req), { title, comment }, requesterId))
  } catch (e) { next(e) }
})

router.delete('/:id', authorize('SECURITY_OFFICER'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: requesterId } = getRequester(req)
    await securityReportService.remove(requireId(req), requesterId)
    res.status(204).send()
  } catch (e) { next(e) }
})

router.post('/:id/submit', authorize('SECURITY_OFFICER'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: requesterId } = getRequester(req)
    res.json(await securityReportService.submit(requireId(req), requesterId))
  } catch (e) { next(e) }
})

router.post('/:id/ack', authorize('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id: adminId } = getRequester(req)
    res.json(await securityReportService.ack(requireId(req), adminId))
  } catch (e) { next(e) }
})

export { router as securityReportRouter }
