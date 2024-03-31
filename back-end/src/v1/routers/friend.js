import controller from '../controllers/friend.js'
import {Router} from 'express'
const router = Router()

router.get('/', controller.get)
router.post('/:id/create', controller.create)
router.post('/:id/cancel', controller.cancel)
router.post('/:id/accept', controller.accept)

export default router