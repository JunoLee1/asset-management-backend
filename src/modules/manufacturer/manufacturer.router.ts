import { Router } from 'express'
import { manufacturerController } from './manufacturer.controller'
import { authenticate } from '../../middlewares/authenticate'
import { masterWriteRateLimit } from '../../middlewares/writeRateLimit'

const router:Router = Router()

router.use(authenticate)

router.get('/', manufacturerController.list)
router.get('/:id', manufacturerController.getById)
router.post('/', masterWriteRateLimit, manufacturerController.create)
router.patch('/:id', masterWriteRateLimit, manufacturerController.update)
router.delete('/:id', manufacturerController.remove)

export { router as manufacturerRouter }
