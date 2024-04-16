import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express'

import i18next from 'i18next'
import i18nextMiddleware from 'i18next-http-middleware'
import Backend from 'i18next-node-fs-backend'
import { userRoutes } from './routes'

import { logger } from './services/logger.service.ts'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 3000

// i18n init
i18next
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		debug: false,
		backend: {
			loadPath: __dirname + '/services/i18n/locales/{{lng}}/{{ns}}.json',
		},
		fallbackLng: 'enGB',
		preload: ['enGB', 'deDE'],
	})
	.catch((err) => {
		logger.error(err)
	})

// Middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(i18nextMiddleware.handle(i18next))
app.disable('x-powered-by')

app.use('/api/user', userRoutes)
app.get('/', (_req: Request, res: Response) => {
	res.send('Hello there!')
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	logger.error(err.stack)
	res.status(500).send('Something went wrong')
})

app.listen(port, () => {
	logger.info(`Server running at http://localhost:${port}`)
})
