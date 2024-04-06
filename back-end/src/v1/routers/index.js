import { Router } from 'express'
const router = Router()
import auth from '../middlewares/authentication.js'

import user from './user.js'
import friend from './friend.js'
import post from './post.js'
import image from './image.js'
import video from './video.js'
import likePost from './likePost.js'
import likeComment from './likeComment.js'
import commentPost from './commentPost.js'
import sharePost from './sharePost.js'
import groupChat from './groupChat.js'
import message from './message.js'
import notification from './notification.js'
import caroGame from './caroGame.js'
import call from './call.js'

router.use('/users', user)
router.use('/friends', auth, friend)
router.use('/posts', auth, post)
router.use('/images', auth, image)
router.use('/videos', auth, video)
router.use('/likeposts', auth, likePost)
router.use('/likecomments', auth, likeComment)
router.use('/commentposts', auth, commentPost)
router.use('/shareposts', auth, sharePost)
router.use('/groupchats', auth, groupChat)
router.use('/messages', auth, message)
router.use('/notifications', auth, notification)
router.use('/carogames', auth, caroGame)
router.use('/calls', auth, call)

export default router 