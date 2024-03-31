import controller from '../controllers/call.js'
import {Router} from 'express'
const router = Router()

router.get('/', controller.get)
router.post('/create', controller.create)
router.delete('/:id', controller.deleteById)

export default router