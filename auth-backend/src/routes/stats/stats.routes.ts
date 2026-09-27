import express from 'express'
import { authenticate } from '../../middlewares/auth'
import statsController from '../../controller/statsController/statsController'

const router = express.Router()

router.get('/posts', authenticate, statsController.countPost)
router.get('/comments', authenticate, statsController.countComment)
router.get('/users', authenticate, statsController.countUser)
router.get('/likes', authenticate, statsController.countLikes)
router.get('/dailyPost', statsController.dailyPostCount)

export default router

// http://localhost:3000/v1/count/dailyPost?month=2025-08
