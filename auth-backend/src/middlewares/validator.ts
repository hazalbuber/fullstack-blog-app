import express from 'express'
import schemas, { SchemaTypes } from '../utils/validationSchemas'
import ErrorCauses from '../utils/serviceLogger/ErrorCauses.json'

export const validator = <T extends keyof SchemaTypes, U extends keyof SchemaTypes[T]>(validatorName: T, schemaName: U) => {
	const schema = schemas[validatorName][schemaName]
	if (!schemas[validatorName].hasOwnProperty(schemaName)) throw new Error(`'${schemaName as string}' validator does not exist in '${validatorName}' schema`)
	return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		try {
			req.body = await (schema as any).validateAsync(req.body, { abortEarly: false })
			next()
		} catch (err: any) {
			return res.status(406).json({
				error: ErrorCauses.middlewareReasons.Validator['001'],
				message: err.details.reduce((a: any, b: any) => `${a} ${b.message},`.replace(/"/g, "'"), ''),
			})
		}
	}
}
