const router = require('express').Router()
const controller = require('../controllers/commentPost')
const auth = require('../middlewares/authentication')
const uploads = require('../middlewares/multer')
const getImage = require('../middlewares/getImage')

router.post('/create', auth, uploads.array('images'), getImage, controller.create)
router.get('/:id', auth, controller.getById)
router.delete('/:id', auth, controller.deleteById)
router.put('/:id', auth, uploads.array('images'), getImage, controller.updateById)
router.get('/', auth, controller.get)

module.exports = router