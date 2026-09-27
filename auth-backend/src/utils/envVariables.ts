import dotenv from 'dotenv'
import path, { join } from 'path'

dotenv.config({ path: join(__dirname, '../../', '.env') }) // __dirname doğrudan çalışır

const envTypes = ['local', 'dev', 'release', 'prod']

type NodeEnv = Readonly<{
	port?: number
	envType?: 'local' | 'dev' | 'release' | 'prod'
	logger?: boolean
}>
type SanitizedNodeEnv = Required<NodeEnv>

const booleanProcessEnv = (variable?: string) => (variable ? variable.toLowerCase() === 'true' : undefined)
const numberProcessEnv = (variable?: string) => (variable ? parseInt(variable) : undefined)

const env: NodeEnv = {
	envType: process.env.SERVICE_ENV as NodeEnv['envType'],
	port: numberProcessEnv(process.env.SERVICE_PORT),
	logger: booleanProcessEnv(process.env.SERVICE_LOGGER),
}

const sanitize = (env: NodeEnv) => {
	for (const [key, val] of Object.entries(env)) {
		if (val === undefined) {
			throw new Error(`Missing key ${key} in .env`)
		}
	}
	if (!envTypes.includes(env.envType!)) throw new Error(`bad key SERVICE_ENV in .env\nPossible values: ${envTypes.join(', ')}`)
	return env as SanitizedNodeEnv
}

const sanitizedEnv: SanitizedNodeEnv = sanitize(env)

export default () => sanitizedEnv
