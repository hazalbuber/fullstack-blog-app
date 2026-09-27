import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const create = async (userId: number, postId: number) => {
	return await prisma.like.create({
		data: {
			userId: userId,
			postId,
		},
	})
}

const deleteLike = async (userId: number, postId: number) => {
	return await prisma.like.deleteMany({
		where: {
			userId,
			postId,
		},
	})
}

const list = async (postId: number) => {
	return await prisma.like.count({
		where: {
			postId,
		},
	})
}

const likedPost = async (userId: number, postId: number) => {
	const like = await prisma.like.findFirst({
		where: {
			userId,
			postId,
		},
	})

	return !!like
}

const likeService = { create, deleteLike, list, likedPost }
export default likeService
