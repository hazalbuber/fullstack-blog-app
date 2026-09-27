import { Request, Response, NextFunction } from 'express'
import tokenUtils from '../utils/token/tokenUtils'
import { Role } from '@prisma/client'

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization

	//console.log("Authorization header:", authHeader);

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return res.status(401).send('Unauthorized')
	}

	const token = authHeader.split(' ')[1]

	try {
		const decoded = tokenUtils.verifyToken(token)
		res.locals.payload = decoded
		//(req as any).user = decoded;
		next()
	} catch (err) {
		return res.status(401).send('Invalid token')
	}
}

export const authorize =
	(...allowed: Role[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		const payload = res.locals.payload as { role?: Role }
		if (!payload?.role || !allowed.includes(payload.role)) {
			return res.status(403).send('Forbidden')
		}
		next()
	}
