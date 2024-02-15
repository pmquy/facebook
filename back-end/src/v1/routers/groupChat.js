const router = require('express').Router()

const controller = require('../controllers/groupChat')
router.post('/create', controller.create)
router.delete('/:id', controller.updateById)
router.put('/:id', controller.updateById)
router.get('/', controller.get)

module.exports = router