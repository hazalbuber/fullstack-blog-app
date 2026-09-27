import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Helper function to get the date 'days' ago from today
const sinceDays = (days: number) => {
	const d = new Date()
	d.setDate(d.getDate() - days)
	return d
}
const countPosts = async (days = 30) => {
	return await prisma.post.count({
		where: { createdAt: { gte: sinceDays(days) } },
	})
}

const countComments = async (days = 30) => {
	return await prisma.comment.count({
		where: { createdAt: { gte: sinceDays(days) } },
	})
}

const countUsers = async (days = 30) => {
	return await prisma.user.count({
		where: { createdAt: { gte: sinceDays(days) } },
	})
}

const countLikes = async (days = 30) => {
	return await prisma.like.count({
		where: { createdAt: { gte: sinceDays(days) } },
	})
}


const statsService = {
	countPosts,
	countComments,
	countUsers,
	countLikes,
}

export default statsService
