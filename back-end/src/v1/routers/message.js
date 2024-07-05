import controller from '../controllers/message.js'
import {Router} from 'express'
const router = Router()
import upload from '../middlewares/multer.js'
import getFiles from '../middlewares/getMedia.js'

router.post('/create',upload.array('files'), getFiles, controller.create)
router.delete('/:id', controller.updateById)
router.get('/:id', controller.getById)
router.put('/:id',upload.array('files'), getFiles, controller.updateById)
router.get('/', controller.get)

export default router