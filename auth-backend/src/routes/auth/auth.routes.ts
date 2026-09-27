import { Router, Request, Response } from 'express'
import hashUtils from '../../utils/hash/hashUtils'
import tokenUtils from '../../utils/token/tokenUtils'
import { PrismaClient } from '@prisma/client'
import userController from '../../controller/userController/user.controller'
import { authenticate } from '../../middlewares/auth'

const prisma = new PrismaClient()

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body

	if (!email || !password) {
		return res.status(400).send('Email and password are required')
	}

	try {
		const user = await prisma.user.findUnique({
			where: { email },
		})

		if (!user) {
			return res.send('Login unsuccessful your email is not corretct')
		}
		const verifyPassword = hashUtils.verify(password, user.password)

		if (verifyPassword) {
			const token = tokenUtils.signToken({ email: user.email, userId: user.id, role: user.role })
			//return res.json({ message: "Login is successful.", token }); //token görmek için
			return res.send({ msg: 'Login is successful.', token })
		} else {
			res.status(401).send('Invalid email or password...')
		}
	} catch (error) {
		console.error('Login error:', error)
		return res.status(500).send('An error occurred during login.')
	}
})

router.post('/register', async (req: Request, res: Response) => {
	const { email, password, name, surname, phoneNumber } = req.body

	if (!email && !password) {
		return res.status(400).send('Email and password are required')
	}

	const exists = await prisma.user.findUnique({
		where: {
			email,
		},
	})

	const hashedPassword = hashUtils.hash(password)

	if (exists) {
		return res.send('Registertion is unsuccessful')
	} else {
		const user = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				surname,
				phoneNumber,
			},
		})
		//console.log(users); // haslenmiş passwordu görmek için
		return res.send('Registration successful')
	}
})

router.get('/getUser', authenticate, userController.getUser)
router.put('/updateUser:id', authenticate, userController.updateUser)

export default router
