const router = require('express').Router()
const auth = require('../middlewares/authentication')

router.use('/users', require('./user'))
router.use('/friends', auth, require('./friend'))
router.use('/posts', auth, require('./post'))
router.use('/images', require('./image'))
router.use('/likeposts', require('./likePost'))
router.use('/commentposts', require('./commentPost'))
router.use('/shareposts', require('./sharePost'))
module.exports = router