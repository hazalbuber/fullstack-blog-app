import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const list = async (postId: number) => {
	return await prisma.comment.findMany({
		where: { postId },
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

const cmtList = { list }
export default cmtList
