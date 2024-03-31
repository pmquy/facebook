import controller from '../controllers/sharePost.js'
import {Router} from 'express'
const router = Router()
import upload from '../middlewares/multer.js'
import { getImages, getVideos } from '../middlewares/getMedia.js'

router.post('/create', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.create)
router.get('/:id', controller.getById)
router.delete('/:id', controller.deleteById)
router.put('/:id', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.updateById)
router.get('/', controller.get)

export default router