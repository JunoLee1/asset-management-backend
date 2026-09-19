import { Router } from 'express'
import { catalogController } from './catalog.controller'
import { authenticate } from '../../middlewares/authenticate'

const router = Router()

router.use(authenticate)

router.get('/', catalogController.list)
router.get('/:id', catalogController.getById)
router.post('/', catalogController.create)
router.patch('/:id', catalogController.update)
router.delete('/:id', catalogController.remove)

export { router as catalogRouter }
