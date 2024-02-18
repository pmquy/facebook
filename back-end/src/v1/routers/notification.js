const router = require('express').Router()
const controller = require('../controllers/notification')

router.get('/', controller.get)
router.delete('/:id', controller.deleteById)

module.exports = router