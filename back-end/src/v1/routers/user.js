import { Router } from 'express'
const router = Router()
import controller from '../controllers/user.js'
import auth from '../middlewares/authentication.js'
import upload from '../middlewares/multer.js'
import {getImage} from '../middlewares/getMedia.js'

router.get('/', controller.get)
router.post('/create', upload.single('avatar'), getImage, controller.create)
router.post('/login', controller.login)
router.post('/changePassword', auth, controller.changePassword)
router.get('/me', auth, controller.getMe)
router.get('/:id', controller.getById)
router.put('/:id', auth, upload.single('avatar'), getImage, controller.updateById)
router.delete('/:id', auth, controller.updateById)

export default router