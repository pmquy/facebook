const router = require('express').Router()
const controller = require('../controllers/message')
const upload = require('../middlewares/multer')
const {getImages} = require('../middlewares/getImage')

router.post('/create', upload.array('images'), getImages, controller.create)
router.delete('/:id', controller.updateById)
router.put('/:id', controller.updateById)
router.get('/', controller.get)

module.exports = router