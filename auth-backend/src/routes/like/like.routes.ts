import express, { Router } from 'express'
import { authenticate } from '../../middlewares/auth'
import likeController from '../../controller/likeController/like.controller'

const router = express.Router()

router.post('/create/:id', authenticate, likeController.create)
router.delete('/delete/:id', authenticate, likeController.deleteLike)
router.get('/list/:id', likeController.list)
router.get('/like-post/:id', authenticate, likeController.likePost)

export default router
