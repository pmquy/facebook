const router = require('express').Router()
const controller = require('../controllers/post')
const upload = require('../middlewares/multer')
const { getImages, getVideos } = require('../middlewares/getMedia')

router.post('/create', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.create)
router.get('/:id', controller.getById)
router.put('/:id', upload.fields([{name : 'images'}, {name : 'videos'}]), getImages, getVideos, controller.updateById)
router.delete('/:id', controller.deleteById)
router.get('/', controller.get)

module.exports = router