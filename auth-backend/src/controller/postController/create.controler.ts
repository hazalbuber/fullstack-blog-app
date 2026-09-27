import { Request, Response } from 'express'
import createService from '../../service/postService/createPost/create.service'

const create = async (req: Request, res: Response) => {
	const { title, content } = req.body
	const userId = res.locals.payload.userId
	if (!title || !content) {
		return res.status(400).send('You cannot empty required fields blank.')
	}

	try {
		const createdPost = await createService.create(userId, title, content)
		return res.status(201).json(createdPost)
	} catch (e) {
		res.send(e)
	}
}

const createControler = { create }

export default createControler
