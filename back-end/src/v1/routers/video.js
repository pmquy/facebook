const controller = require('../controllers/video')
const router = require('express').Router()
router.get('/:id', controller.getById)
module.exports = router