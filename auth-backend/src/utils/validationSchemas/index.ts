import userSchemas from './client/userSchemas'

const schemas = {
	UserSchemas: userSchemas,
} as const

export type SchemaTypes = {
	[Key in keyof typeof schemas]: (typeof schemas)[Key]
}
//veriyi alıyor tipini buluyor/çıkaıryro böylece elle tip yazmaya gerek kalmıyormuş.... 

const schemaTypes: SchemaTypes = schemas

export default schemaTypes

//dışardan kulanıma açıldı /client/userSchemas'nın
