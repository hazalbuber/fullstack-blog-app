import express from 'express'
import Cors from 'cors'
import bodyParser from 'body-parser'
import http from 'http'
import envVariables from './utils/envVariables'
import { rateLimit } from 'express-rate-limit'
import v1 from './routes/v1'

const startServer = () => {
	const app = express()
	const server = http.createServer(app)

	const cors = { origin: '*', credentials: true }
	app.set('trust proxy', 1)
	app.use(Cors(cors))
	app.use(bodyParser.json({ limit: '50mb' }))
	app.use(
		bodyParser.urlencoded({
			limit: '50mb',
			extended: true,
			parameterLimit: 50000,
		}),
	)

	app.get('/', (req, res) => {
		res.json({ message: 'Welcome to the Example Service API' })
	})

	app.use('/v1/', v1)

	const limiter = rateLimit({
		windowMs: 60 * 1000,
		max: 10000,
		message: 'Too many requests from this IP, please try again later.',
	})
	app.use(limiter)

	const port = envVariables().port
	server.listen(port, () => console.log(`Express server is listening on port ${port}`))

	return true
}

export default startServer
