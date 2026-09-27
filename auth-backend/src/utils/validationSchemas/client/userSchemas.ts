import Joi, { ObjectSchema } from 'joi'

const CreateUserSchema: ObjectSchema = Joi.object({
	name: Joi.string().required(),
	age: Joi.number().required(),
})

const userSchemas = { CreateUserSchema }
export default userSchemas


// gelenen verinin stirng ve number olamsını zorunlu yapıyor