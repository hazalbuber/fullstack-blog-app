import { CreateExampleParams } from './types/exampe.service.types'
import ErrorCauses from '../utils/serviceLogger/ErrorCauses.json'

//deneme amaçlı veri gönderilmiş burda 
const list = () => {
	try {
		return [{ name: 'John Doe', age: 30 }]
	} catch (e) {
		throw new Error("Couldn't list examples!")
	}
}

//kulanıcı burda oluştuğu an mesaj döner 
const create = (params: CreateExampleParams) => {
	try {
		const { name, age } = params
		return { message: `Created ${name} with age ${age} successfully!` }
		//hata olursada hazır json dosyasınnadan hata döner 
	} catch (error:any) {
		throw Object.assign({
			details: error.details ?? error.response.data.error, //Example
			status: error.status ?? error.response.data.status,
			message: ErrorCauses.clientReasons.UserService['001'],
			service: 'IndexService',
			errorCode: '001',
		})
	}
}

const ExampleService = { list, create }

export default ExampleService
