import { Request, Response } from 'express'
import tagService from '../../service/tagService/tag.service'

const create = async (req: Request, res: Response) => {
	const { name } = req.body

	if (!name) {
		return res.status(400).send('You cannot empty required fields blank.')
	}

	try {
		const createdTag = await tagService.create(name)
		return res.status(201).json(createdTag)
	} catch (e) {
		res.status(500).send(e)
	}
}

const deleteTag = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const deletedTag = await tagService.deleteTag(String(id))
		return res.status(200).json(deletedTag)
	} catch (e: any) {
		res.status(500).json({ error: e.message })
	}
}

const update = async (req: Request, res: Response) => {
	const { name } = req.body
	const { id } = req.params

	try {
		const updatedTag = await tagService.update(String(id), name)
		return res.status(200).json(updatedTag)
	} catch (e: any) {
		res.status(500).json({ error: e.message })
	}
}

const updatePostTags = async (req: Request, res: Response) => {
	const { tagIds } = req.body
	const { id } = req.params

	try {
		const updatedPost = await tagService.setTagsToPost(Number(id), tagIds)
		return res.status(200).json(updatedPost)
	} catch (e: any) {
		res.status(500).json({ error: e.message })
	}
}

const listPostTags = async (req: Request, res: Response) => {
	try {
		const postId = Number(req.params.id)
		const listTag = await tagService.getTagsOfPost(postId)
		res.status(200).json(listTag)
	} catch (e: any) {
		res.status(500).json({ error: e.message })
	}
}

const tagController = { create, update, deleteTag, updatePostTags, listPostTags }
export default tagController
