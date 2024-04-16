import { Elysia } from 'elysia'
import { userRoutes } from './routes/user.routes'
import { i18next } from 'elysia-i18next'
import { deDE, enGB } from './services/i18n/locales'
import { logger } from '@bogeychan/elysia-logger'

const apiRoutes = new Elysia({ prefix: '/api' })
	.use(userRoutes)

const index = new Elysia()
	.onError(({ code, error }) => {
		console.log(`Error ${code}: ${error}`)
		return new Response(error.toString())
	})
	.use(logger({ level: 'info'}))
	.use(
		i18next({
			initOptions: {
				lng: 'en',
				resources: {
					en: enGB,
					de: deDE
				},
			},
		}),
	)
	.use(apiRoutes)
	.get('/', () => 'Hello Elysia')
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${index.server?.hostname}:${index.server?.port}`
)
