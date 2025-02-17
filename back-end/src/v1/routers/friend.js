import controller from '../controllers/friend.js'
import {Router} from 'express'
const router = Router()

router.get('/suggested', controller.getSuggested)
router.post('/:id/create', controller.create)
router.post('/:id/accept', controller.accept)
router.post('/:id/cancel', controller.cancel)
router.get('/', controller.get)

export default router