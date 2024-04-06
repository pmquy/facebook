import controller from '../controllers/likePost.js'
import {Router} from 'express'
const router = Router()

router.post('/create', controller.create)
router.get('/', controller.get)
router.delete('/', controller.delete)

export default router