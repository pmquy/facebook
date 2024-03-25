const router = require('express').Router()
const controller = require('../controllers/message')
const upload = require('../middlewares/multer')
const {getImages, getVideos} = require('../middlewares/getMedia')

router.post('/create', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.create)
router.delete('/:id', controller.updateById)
router.put('/:id', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.updateById)
router.get('/', controller.get)

module.exports = router