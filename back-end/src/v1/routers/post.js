const router = require('express').Router()
const controller = require('../controllers/post')
const upload = require('../middlewares/multer')
const getImage = require('../middlewares/getImage')

router.post('/create', upload.array('images'), getImage, controller.create)
router.get('/:id', controller.getById)
router.put('/:id', upload.array('images'), getImage, controller.updateById)
router.delete('/:id', controller.deleteById)
router.get('/', controller.get)

module.exports = router