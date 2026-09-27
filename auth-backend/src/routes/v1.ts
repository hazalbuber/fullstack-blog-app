import express from 'express'
import exampleRouter from './example/example.routes'
import authRouter from './auth/auth.routes'
import postRouter from './post/post.routes'
import commentRouter from './comment/comment.routes'
import likeRouter from './like/like.routes'
import tagRouter from './tag/tag.routes'
import statsRouter from './stats/stats.routes'
const router = express.Router()

router.use('/example', exampleRouter)
router.use('/auth', authRouter)
router.use('/post', postRouter)
router.use('/comment', commentRouter)
router.use('/like', likeRouter)
router.use('/tag', tagRouter)
router.use('/count', statsRouter)
export default router
