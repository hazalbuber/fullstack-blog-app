import { Request, Response } from 'express'
import updateService from '../../service/postService/updatePost/update.service'

const update = async (req: Request, res: Response) => {
	const { title, content } = req.body
	const { id } = req.params

	try {
		const updatedPost = await updateService.update(Number(id), title, content)
		return res.status(200).json(updatedPost)
	} catch (e) {
		res.send(e)
	}
}

const updateControler = { update }

export default updateControler
