import { Response, Request } from 'express'
import envVariables from '../envVariables'

//Hata varsa, hem console.log ile hem de response olarak detaylı hata döndürmek.
//Kullanıcıya JSON olarak detaylı hata mesajı döner
const serviceLogger = (
	params: {
		details?: string | object
		status: number
		service: string
		errorCode: string
		errMessage: string
	},
	res: Response,
	req: Request,
	tag: string,
) => {
	const { details, status, service, errorCode, errMessage } = params

	if (details) {
		let message = {
			details: details,
			status: status || 500,
			service: service,
			errorCode: errorCode,
			message: errMessage,
		}

		infoLogger(res, req, tag, 'ERROR', message)

		return res.status(message.status).json(message)
	} else {
		let message = {
			message: 'Something went wrong',
			status: 500,
		}

		infoLogger(res, req, tag, 'ERROR', message)

		return res.status(message.status).json(message)
	}
}

//İstek hakkında log yazar/detaylı 
const infoLogger = (
	res: Response,
	req: Request,
	tag: string,
	level?: 'INFO' | 'ERROR',
	message?: {
		details?: string | object
		status: number
		service?: string
		errorCode?: string
		errMessage?: string
		message?: string
	},
) => {
	if (!envVariables().port) return null
	const reqLogData = {
		timestamp: new Date().toISOString(),
		level: level || 'INFO',
		status: message ? message.status : res.statusCode,
		message: message?.message,
		details: message?.details,
		url: req.url,
		method: req.method,
		body: req.body,
		query: req.query,
		params: req.params,
		ip: req.ip,
		tag,
	}
	const logMessage = JSON.stringify(reqLogData)
	console.log(logMessage)
}

export { serviceLogger, infoLogger }
