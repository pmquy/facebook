const router = require('express').Router()
const controller = require('../controllers/friend')

router.get('/', controller.get)
router.post('/:id/create', controller.create)
router.post('/:id/cancel', controller.cancel)
router.post('/:id/accept', controller.accept)

module.exports = router