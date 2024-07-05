import controller from '../controllers/group.js'
import {Router} from 'express'
const router = Router()
import upload from '../middlewares/multer.js'
import getFiles from '../middlewares/getMedia.js'

router.post('/create', upload.single('avatar'), getFiles, controller.create)
router.post('/:id/request', controller.request)
router.post('/:id/accept', controller.accept)
router.post('/:id/delete', controller.delete)
router.get('/posts', controller.getPosts)
router.get('/:id/members', controller.getMembers)
router.get('/:id', controller.getById)
router.put('/:id', upload.single('avatar'), getFiles, controller.updateById)
router.delete('/:id', controller.deleteById)
router.get('/', controller.get)

export default router