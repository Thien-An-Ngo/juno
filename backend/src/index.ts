import { Elysia } from 'elysia'
import { userRoutes } from './routes/user.routes'

const index = new Elysia()
	.use(userRoutes)
	.get('/', () => 'Hello Elysia')
	.listen(3000)

console.log(
	`🦊 Elysia is running at ${index.server?.hostname}:${index.server?.port}`
)
