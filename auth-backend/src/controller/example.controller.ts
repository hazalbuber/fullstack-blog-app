import { Request, Response } from 'express'
import exampleService from '../service/example.service'
import { infoLogger, serviceLogger } from '../utils/serviceLogger/logger'

//bu kullanıcları falan listlemek için routerdan gelen get isteğini alıyor
//duruma göre errror dönüyor
const list = async (req: Request, res: Response) => {
	try {
		res.send(exampleService.list())
	} catch (e) {
		res.send(e)
	}
}
//kullanıcı falan şey yapmak için create req.bodyden gelen şeyleri alarak işte create işlemi yapıcak
const create = (req: Request, res: Response) => {
	try {
		const { name, age } = req.body
		res.send(exampleService.create({ name, age }))
		infoLogger(res, req, 'CreateUser')
	} catch (error:any) {
		return serviceLogger(
			{
				details: error.details,
				status: error.status,
				errMessage: error.message,
				service: error.service,
				errorCode: error.errorCode,
			},
			res,
			req,
			'CreateUser',
		)
	}
}

const exampleController = { create, list }
export default exampleController


//Controller, servisten dönen hatayı yakalayıp uygun şekilde loglar ve kullanıcıya gönderiyor