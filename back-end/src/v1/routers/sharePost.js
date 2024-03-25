const router = require('express').Router()
const controller = require('../controllers/sharePost')
const auth = require('../middlewares/authentication')
const upload = require('../middlewares/multer')
const {getImages,getVideos} = require('../middlewares/getMedia')

router.post('/create', auth, upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.create)
router.get('/:id', auth, controller.getById)
router.delete('/:id', auth, controller.deleteById)
router.put('/:id', auth, upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.updateById)
router.get('/', auth, controller.get)

module.exports = router