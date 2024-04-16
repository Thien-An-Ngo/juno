import dotenv from 'dotenv'

import express from 'express'
import path from 'path'

import { signUpEmail, verifyEmail } from '../controllers/account.controller.ts'

dotenv.config({ path: path.join(__dirname, '../', '.env') })

const router = express.Router()

router.get('/signup/email/:email', signUpEmail)
router.post('/signup/email/:email/verify/:token', verifyEmail)

export default router
