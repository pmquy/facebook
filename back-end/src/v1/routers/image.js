const controller = require('../controllers/image')
const router = require('express').Router()
router.get('/:id', controller.getById)
module.exports = router