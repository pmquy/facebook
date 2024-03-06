const controller = require('../controllers/call')
const router = require('express').Router()

router.get('/', controller.get)
router.post('/create', controller.create)
router.delete('/:id', controller.deleteById)

module.exports = router