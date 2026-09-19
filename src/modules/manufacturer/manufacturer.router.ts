import { Router } from 'express'
import { manufacturerController } from './manufacturer.controller'
import { authenticate } from '../../middlewares/authenticate'

const router:Router = Router()

router.use(authenticate)

router.get('/', manufacturerController.list)
router.get('/:id', manufacturerController.getById)
router.post('/', manufacturerController.create)
router.patch('/:id', manufacturerController.update)
router.delete('/:id', manufacturerController.remove)

export { router as manufacturerRouter }
