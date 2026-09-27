import { Request, Response } from 'express'
import deleteService from '../../service/postService/deletePost/delete.service'

const deletePost = async (req: Request, res: Response) => {
	const { id } = req.params //id okuyor url'den
	const userId = res.locals.payload.userId

	try {
		const deletePost = await deleteService.deletePost(Number(id), userId)
		return res.status(200).json(deletePost)
	} catch (e) {
		res.send(e)
	}
}
const deleteController = { deletePost }

export default deleteController
