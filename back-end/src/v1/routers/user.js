import { Router } from 'express'
const router = Router()
import controller from '../controllers/user.js'
import auth from '../middlewares/authentication.js'
import upload from '../middlewares/multer.js'
import getFiles from '../middlewares/getMedia.js'

router.get('/', controller.get)
router.put('/', auth, upload.single('avatar'), getFiles, controller.update)
router.delete('/', auth, controller.delete)
router.post('/create', upload.single('avatar'), getFiles, controller.create)
router.post('/login', controller.login)
router.post('/changePassword', auth, controller.changePassword)
router.get('/me', auth, controller.getMe)
router.get('/groups', auth, controller.getGroups)
router.get('/:id', controller.getById)

export default router