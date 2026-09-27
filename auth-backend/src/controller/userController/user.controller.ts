import { Request, Response } from 'express'
import userService from '../../service/userService/user.service'

const getUser = async (req: Request, res: Response) => {
	try {
		const userId = res.locals.payload.userId
		const user = await userService.userInfo(userId)
		if (!user) return res.status(404).json({ error: 'User not found' })
		res.json(user)
	} catch (e) {
		res.status(500).json({ error: 'Internal server error' })
	}
}

const updateUser = async (req: Request, res: Response) => {
	const { name, surname, password, phoneNumber } = req.body
	const { id } = req.params

	try {
		const updatedUser = await userService.userUpdate(Number(id), name, surname, password, phoneNumber)
		return res.status(200).json(updatedUser)
	} catch (e) {
		res.send(e)
	}
}

const userController = { getUser,updateUser }
export default userController
