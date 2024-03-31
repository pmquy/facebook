import controller from '../controllers/video.js'
import {Router} from 'express'
const router = Router()
router.get('/:id', controller.getById)
export default router