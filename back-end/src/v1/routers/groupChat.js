import controller from '../controllers/groupChat.js'
import {Router} from 'express'
const router = Router()
router.post('/create', controller.create)
router.delete('/:id', controller.updateById)
router.put('/:id', controller.updateById)
router.get('/:id', controller.getById)
router.get('/', controller.get)

export default router