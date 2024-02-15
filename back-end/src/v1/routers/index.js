const router = require('express').Router()
const auth = require('../middlewares/authentication')

router.use('/users', require('./user'))
router.use('/friends', auth, require('./friend'))
router.use('/posts', auth, require('./post'))
router.use('/images', auth, require('./image'))
router.use('/likeposts', auth, require('./likePost'))
router.use('/commentposts', auth, require('./commentPost'))
router.use('/shareposts', auth, require('./sharePost'))
router.use('/groupchats', auth, require('./groupChat'))
router.use('/messages', auth, require('./message'))
module.exports = router