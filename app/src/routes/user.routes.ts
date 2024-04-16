import { Elysia } from 'elysia'
import { signUp, signUpEmail } from '../controllers/user.controller'

export const userRoutes = new Elysia({ prefix: '/user' })
	.get('/sign-up-email/:email', signUpEmail)
	.post('/sign-up', signUp)
