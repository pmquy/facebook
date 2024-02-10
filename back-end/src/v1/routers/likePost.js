const router = require('express').Router()
const controller = require('../controllers/likePost')
const auth = require('../middlewares/authentication')

router.post('/create', auth, controller.create)
router.get('/', auth, controller.get)
router.delete('/', auth, controller.delete)

module.exports = router