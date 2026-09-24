import { Router } from 'express'
import { catalogController } from './catalog.controller'
import { authenticate } from '../../middlewares/authenticate'
import { masterWriteRateLimit } from '../../middlewares/writeRateLimit'

const router:Router = Router()

router.use(authenticate)

router.get('/', catalogController.list)
router.get('/:id', catalogController.getById)
router.post('/', masterWriteRateLimit, catalogController.create)
router.patch('/:id', masterWriteRateLimit, catalogController.update)
router.delete('/:id', catalogController.remove)

export { router as catalogRouter }
