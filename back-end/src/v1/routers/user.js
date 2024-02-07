const router = require('express').Router()
const controller = require('../controllers/user')
const auth = require('../middlewares/authentication')

router.get('/', controller.get)
router.post('/create', controller.create)
router.post('/login', controller.login)
router.post('/changePassword', auth, controller.changePasswordById)
router.get('/me', auth, controller.getMe)
router.get('/:id', controller.getById)
router.put('/:id', auth, controller.updateById)
router.delete('/:id', auth, controller.updateById)

module.exports = router