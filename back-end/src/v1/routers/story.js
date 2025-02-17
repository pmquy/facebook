import controller from '../controllers/story.js'
import {Router} from 'express'

const router = Router()
import upload from '../middlewares/multer.js'
import getFiles from '../middlewares/getMedia.js'

router.post('/create', upload.array('files'), getFiles, controller.create)
router.get('/', controller.get)
router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)

export default router