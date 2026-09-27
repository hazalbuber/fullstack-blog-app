import express from 'express'
import { authenticate } from '../../middlewares/auth'
import tagController from '../../controller/tagController/tag.controller'

const router = express.Router()

router.post('/create', authenticate, tagController.create)

router.put('/update/:id', authenticate, tagController.updatePostTags)

router.get('/list/:id', tagController.listPostTags)

router.delete('/delete/:id', authenticate, tagController.deleteTag)


export default router
