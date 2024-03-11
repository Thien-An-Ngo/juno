import { Elysia } from 'elysia'
import { signUp } from '../controllers/user.controller'

export const userRoutes = new Elysia({ prefix: '/user' })
	.post('/sign-up', signUp)
