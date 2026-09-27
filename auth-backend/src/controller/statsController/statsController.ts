import { Request, Response } from 'express'
import statsService from '../../service/statsService/statsService'
import dailyPostCounts from '../../service/statsService/dailyPostCounts.service'

const countPost = async (req: Request, res: Response) => {
	try {
		const count = await statsService.countPosts()
		return res.status(200).json({ count })
	} catch (e) {
		return res.status(500).send(e)
	}
}

const countComment = async (req: Request, res: Response) => {
	try {
		const count = await statsService.countComments()
		return res.status(200).json({ count })
	} catch (e) {
		return res.status(500).send(e)
	}
}

const countUser = async (req: Request, res: Response) => {
	try {
		const count = await statsService.countUsers()
		return res.status(200).json({ count })
	} catch (e) {
		return res.status(500).send(e)
	}
}

const countLikes = async (req: Request, res: Response) => {
	try {
		const count = await statsService.countLikes()
		return res.status(200).json({ count })
	} catch (e) {
		return res.status(500).send(e)
	}
}

const dailyPostCount = async (req: Request, res: Response) => {
	try {
		const month = String(req.query.month || '')

		if (!/^\d{4}-\d{2}$/.test(month)) {
			return res.status(400).json({ error: "month 'YYYY-MM' must be in the format" })
		}

		const data = await dailyPostCounts.getDailyPostCountsForMonth(month)

		return res.json(data)
	} catch (e) {
		console.error(e)
		return res.status(500).json({ error: 'internal_error' })
	}
}

const statsController = { countComment, countLikes, countPost, countUser, dailyPostCount }
export default statsController
