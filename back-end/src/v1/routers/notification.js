import controller from '../controllers/notification.js'
import {Router} from 'express'
const router = Router()

router.get('/', controller.get)
router.delete('/:id', controller.deleteById)

export default router