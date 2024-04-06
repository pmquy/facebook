import controller from '../controllers/post.js'
import {Router} from 'express'
const router = Router()
import upload from '../middlewares/multer.js'
import { getImages, getVideos } from '../middlewares/getMedia.js'

router.post('/create', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.create)
router.get('/:id', controller.getById)
router.put('/:id', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.updateById)
router.delete('/:id', controller.deleteById)
router.get('/', controller.get)

export default router