import { Request, Response } from 'express'
import likeService from '../../service/likeService/likeService'

const create = async (req: Request, res: Response) => {
	const postId = Number(req.params.id)
	const userId = res.locals.payload.userId

	try {
		const createLike = await likeService.create(userId, postId)
		return res.status(201).json(createLike)
	} catch (e) {
		res.send(e)
	}
}

const deleteLike = async (req: Request, res: Response) => {
	const postId = Number(req.params.id)
	const userId = res.locals.payload.userId

	try {
		const remove = await likeService.deleteLike(userId, postId)
		return res.status(201).json(remove)
	} catch (e) {
		res.send(e)
	}
}

const list = async (req: Request, res: Response) => {
	try {
		const postId = Number(req.params.id)
		const posts = await likeService.list(postId)
		res.status(200).json(posts)
	} catch (e) {
		res.send(e)
	}
}

const likePost = async (req: Request, res: Response) => {
	try {
		const postId = Number(req.params.id)
		const userId = res.locals.payload.userId

		const userLike = await likeService.likedPost(userId, postId)
		res.status(200).json(userLike)
	} catch (e) {
		res.send(e)
	}
}

const likeController = { likePost, create, deleteLike, list }
export default likeController
