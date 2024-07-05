import controller from '../controllers/post.js'
import {Router} from 'express'
const router = Router()
import upload from '../middlewares/multer.js'
import getFiles from '../middlewares/getMedia.js'

router.post('/create', upload.array('files'), getFiles, controller.create)
router.get('/:id', controller.getById)
router.put('/:id', upload.array('files'), getFiles, controller.updateById)
router.delete('/:id', controller.deleteById)
router.get('/', controller.get)

export default router