import express from 'express'
import { authenticate } from '../../middlewares/auth';
import commentController from '../../controller/commentController/cmt.controller';

const router = express.Router()
router.post('/create/:id', authenticate, commentController.create )

router.put('/update/:id', authenticate, commentController.update)

router.delete('/delete/:id',authenticate, commentController.deleteComment )

router.get('/list/:id', authenticate, commentController.list)

export default router