import controller from '../controllers/caroGame.js'
import {Router} from 'express'
const router = Router()

router.post('/create', controller.create)
router.get('/:id', controller.getById)
router.put('/:id', controller.updateById)
router.get('/', controller.get)

export default router