import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const create = async (name: string) => {
	const lowerCaseTag = name.toLowerCase().trim()

	const existing = await prisma.tag.findUnique({
		where: { name: lowerCaseTag },
	})

	if (existing) return existing

	return await prisma.tag.create({ data: { name: lowerCaseTag } })
}

const deleteTag = async (id: string) => {
	return await prisma.tag.delete({
		where: {
			id,
		},
	})
}

//update the tag
const update = async (id: string, name: string) => {
	const lowerCaseTag = name.toLowerCase().trim()

	const existing = await prisma.tag.findUnique({
		where: { name: lowerCaseTag },
	})
	if (existing && existing.id !== id) {
		throw new Error('Tag already exists.')
	}

	return await prisma.tag.update({
		where: { id },
		data: { name: lowerCaseTag },
	})
}

//sort the tags of the posts
const getTagsOfPost = async (postId: number) => {
	return await prisma.post.findUnique({
		where: { id: postId },
		include: { tags: true },
	})
}

//update the tag in the post
const setTagsToPost = async (postId: number, tagIds: string[]) => {
	return await prisma.post.update({
		where: { id: postId },
		data: {
			tags: {
				set: tagIds.map((id) => ({ id })),
			},
		},
		include: { tags: true },
	})
}

const tagService = { create, deleteTag, update, getTagsOfPost, setTagsToPost }
export default tagService
