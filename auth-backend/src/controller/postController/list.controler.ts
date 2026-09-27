import { Request, Response } from 'express'
import listService from '../../service/postService/listPost/list.service'

const list = async (req: Request, res: Response) => {
	try {
		const userId = res.locals.payload.userId
		const posts = await listService.list(userId)
		res.status(201).json(posts)
	} catch (e) {
		res.send(e)
	}
}

export const listAll = async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1
		const limit = parseInt(req.query.limit as string) || 15

		const result = await listService.listAll(page, limit)

		res.status(200).json(result)
	} catch (e) {
		console.error(e)
		res.status(500).json({ error: 'Internal server error' })
	}
}

export const listPostsLatest = async (req: Request, res: Response) => {
	try {
		const sort = (req.query.sort as 'latest' | 'oldest' | 'likes' | 'comments') || 'latest'

		const posts = await listService.listPosts(sort)
		res.status(200).json(posts)
	} catch (e) {
		console.error(e)
		res.status(500).send({ error: 'Something went wrong' })
	}
}

const listControler = { list, listAll, listPostsLatest }

export default listControler
