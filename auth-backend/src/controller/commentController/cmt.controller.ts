import { Request, Response } from 'express'
import commentCrearte from '../../service/commentService/cmtCreate.service'
import commentDelete from '../../service/commentService/cmtDelete.service'
import commentUpdate from '../../service/commentService/cmtUpdate.service'
import cmtList from '../../service/commentService/cmtList.service'

const create = async (req: Request, res: Response) => {
	const postId = Number(req.params.id)
	const { text } = req.body
	const userId = res.locals.payload.userId

	if (!text) {
		return res.status(400).send('You cannot empty required fields blank.')
	}

	try {
		const createCmt = await commentCrearte.create(userId, text, postId)
		return res.status(201).json(createCmt)
	} catch (e) {
		res.send(e)
	}
}

const deleteComment = async (req: Request, res: Response) => {
	const commentId = Number(req.params.id)

	try {
		const deleteCmt = await commentDelete.deleteComment(commentId)
		return res.status(200).json(deleteCmt)
	} catch (e) {
		res.send(e)
	}
}

const update = async (req: Request, res: Response) => {
	const commentId = Number(req.params.id)
	const { text } = req.body
	const userId = res.locals.payload.userId

	try {
		const updatedCmt = await commentUpdate.update(text, commentId, userId)
		return res.status(200).json(updatedCmt)
	} catch (e) {
		res.send(e)
	}
}

const list = async (req: Request, res: Response) => {
	try {
		const postId = Number(req.params.id)
		const posts = await cmtList.list(postId)
		res.status(200).json(posts)
	} catch (e) {
		res.send(e)
	}
}

const commentController = { create, deleteComment, update, list }

export default commentController
