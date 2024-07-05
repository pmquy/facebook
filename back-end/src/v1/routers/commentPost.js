import upload from '../middlewares/multer.js'
import getFiles from '../middlewares/getMedia.js'
import controller from '../controllers/commentPost.js'
import {Router} from 'express'
const router = Router()

router.post('/create', upload.array('files'), getFiles, controller.create)
router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)
router.put('/:id', upload.array('files'), getFiles, controller.updateById)
router.get('/', controller.get)

export default router