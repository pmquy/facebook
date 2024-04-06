import controller from '../controllers/message.js'
import {Router} from 'express'
const router = Router()
import upload from '../middlewares/multer.js'
import {getImages, getVideos} from '../middlewares/getMedia.js'

router.post('/create', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.create)
router.delete('/:id', controller.updateById)
router.put('/:id', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.updateById)
router.get('/', controller.get)

export default router