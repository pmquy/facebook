const router = require('express').Router()
const controller = require('../controllers/friend')

router.get('/', controller.get)
router.post('/:id/create', controller.create)
router.post('/:id/delete', controller.delete)
router.post('/:id/accept', controller.accept)
router.post('/:id/decline', controller.decline)

module.exports = router