const router = require('express').Router()
const controller = require('../controllers/caroGame')

router.post('/create', controller.create)
router.get('/:id', controller.getById)
router.put('/:id', controller.updateById)
router.get('/', controller.get)

module.exports = router