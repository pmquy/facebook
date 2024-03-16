const router = require('express').Router()
const controller = require('../controllers/post')
const upload = require('../middlewares/multer')
const {getImages} = require('../middlewares/getImage')

router.post('/create', upload.array('images'), getImages, controller.create)
router.get('/:id', controller.getById)
router.put('/:id', upload.array('images'), getImages, controller.updateById)
router.delete('/:id', controller.deleteById)
router.get('/', controller.get)

module.exports = router