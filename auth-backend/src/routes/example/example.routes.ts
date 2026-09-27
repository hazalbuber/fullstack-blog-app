import express from 'express'
import exampleController from '../../controller/example.controller'
import { validator } from '../../middlewares/validator'

const router = express.Router()

router.get('/', exampleController.list)
router.post('/', validator('UserSchemas', 'CreateUserSchema'), exampleController.create)

export default router
