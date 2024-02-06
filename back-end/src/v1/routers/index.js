const router = require('express').Router()
const auth = require('../middlewares/authentication')

router.use('/users', require('./user'))
router.use('/friends', auth, require('./friend'))
module.exports = router