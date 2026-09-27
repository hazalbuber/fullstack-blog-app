import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const list = async (userId: number) => {
	return await prisma.post.findMany({
		where: {
			authorId: userId,
		},
	})
}
/*
const listAll = async (page: number = 1, limit: number = 5) => {
	const skip = (page - 1) * limit
	return await prisma.post.findMany({
		skip,
		take: limit,
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			author: {
				select: {
					name: true,
					surname: true,
				},
			},
		},
	})
}
*/

const listAll = async (page: number = 1, limit: number = 15) => {
	const skip = (page - 1) * limit
	const [posts, total] = await Promise.all([
		prisma.post.findMany({
			skip,
			take: limit,

			orderBy: { createdAt: 'desc' },
			include: {
				author: {
					select: {
						name: true,
						surname: true,
					},
				},
			},
		}),
		prisma.post.count(),
	])

	return {
		page,
		limit,
		total,
		totalPages: Math.ceil(total / limit),
		posts,
	}
}

const listPosts = async (sort: 'latest' | 'oldest' | 'likes' | 'comments' = 'latest') => {
	let orderBy: any

	if (sort === 'latest') orderBy = { createdAt: 'desc' }
	if (sort === 'oldest') orderBy = { createdAt: 'asc' }
	if (sort === 'likes') orderBy = { like: { _count: 'desc' } }
	if (sort === 'comments') orderBy = { comments: { _count: 'desc' } }

	return prisma.post.findMany({
		orderBy,
		include: {
			author: { select: { name: true, surname: true, email: true, id: true } },
			_count: { select: { comments: true, like: true } },
			tags: { select: { id: true, name: true } },
		},
	})
}
const listService = { listAll, list, listPosts }
export default listService
