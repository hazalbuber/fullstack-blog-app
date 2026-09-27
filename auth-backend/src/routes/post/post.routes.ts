import express from 'express'
import { authenticate } from '../../middlewares/auth'
import listControler from '../../controller/postController/list.controler'
import createControler from '../../controller/postController/create.controler'
import updateControler from '../../controller/postController/update.controller'
import deleteController from '../../controller/postController/delete.controler'

const router = express.Router()
router.post('/create', authenticate, createControler.create)

router.get('/list', authenticate, listControler.list)
router.get('/listAll', listControler.listAll)

router.put('/update/:id', authenticate, updateControler.update)

router.delete('/delete/:id', authenticate, deleteController.deletePost)

router.get('/listLatest', authenticate, listControler.listPostsLatest)

export default router
