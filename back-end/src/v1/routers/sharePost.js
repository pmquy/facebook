const router = require('express').Router()
const controller = require('../controllers/sharePost')
const auth = require('../middlewares/authentication')
const uploads = require('../middlewares/multer')
const {getImages} = require('../middlewares/getImage')

router.post('/create', auth, uploads.array('images'), getImages, controller.create)
router.get('/:id', auth, controller.getById)
router.delete('/:id', auth, controller.deleteById)
router.put('/:id', auth, uploads.array('images'), getImages, controller.updateById)
router.get('/', auth, controller.get)

module.exports = router