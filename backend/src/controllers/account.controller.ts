import { differenceInMinutes } from 'date-fns'
import type { Request, Response } from 'express'
import { t } from 'i18next'
import {
	checkEmailExistsAndLastUpdate,
	createUnverifiedUser,
	doesEmailExist,
	findEmailToken,
	updateUnverifiedUser,
} from '../repositories/unverifiedUser.repository.ts'
import { sendSignUpEmail } from '../services/courier.service.ts'
import { logger } from '../services/logger.service.ts'
import { EmailRegEx, type emailType } from '../types/util.type.ts'
import { verifyParams } from './controller.util.ts'

export const signUpEmail = async (req: Request, res: Response) => {
	logger.debug('signUpEmail function called')
	const [doParamsExist, missingParams] = verifyParams(req.params, ['email'])
	if (!doParamsExist)
		return res.status(400).json({
			message: t('generic.error.paramsMissing', {
				missingParams: missingParams.join(', '),
			}),
		})

	const { email } = req.params
	logger.debug(`req params email: ${email}`)

	if (!EmailRegEx.test(email)) {
		logger.info(`User tried to sign up with invalid email - email: ${email}`)
		return res
			.status(400)
			.json({ message: t('user.signup.email.error.invalid') })
	}

	if (await doesEmailExist(email)) {
		logger.info(
			`User tried to sign up with email that already belongs to an account - email: ${email}`,
		)
		return res
			.status(400)
			.json({ message: t('user.signup.email.error.unavailable') })
	}

	const lastUpdatedIfExists = await checkEmailExistsAndLastUpdate(email)
	if (!lastUpdatedIfExists)
		return createUnverifiedUser({ email })
			.then((unverifiedUser) => {
				const { token } = unverifiedUser
				const mailRes = sendSignUpEmail(<emailType>email, token)
				logger.info(mailRes)
				return res
					.status(201)
					.json({ message: t('user.signup.email.success.create') })
			})
			.catch((err) => {
				logger.error(err)
				return res
					.status(500)
					.json({ message: t('user.signup.email.error.internal') })
			})

	if (differenceInMinutes(Date.now(), lastUpdatedIfExists) < 5) {
		logger.info('Email was used to sign up too recently')
		return res
			.status(429)
			.json({ message: t('user.signup.email.error.tooRecent') })
	}

	return updateUnverifiedUser(email)
		.then(() => {
			return res
				.status(201)
				.json({ message: t('user.signup.email.success.update') })
		})
		.catch((err) => {
			logger.error(err)
			return res
				.status(500)
				.json({ message: t('user.signup.email.error.internal') })
		})
}

export const verifyEmail = async (req: Request, res: Response) => {
	logger.debug('verifyEmail function called')
	const [doParamsExist, missingParams] = verifyParams(req.params, [
		'email',
		'token',
	])
	if (!doParamsExist)
		return res.status(400).json({
			message: t('generic.error.paramsMissing', {
				missingParams: missingParams.join(', '),
			}),
		})

	const { email, token } = req.params
	logger.debug(`req params email: ${email}, token: ${token}`)

	const emailToken = await findEmailToken(email)
	if (!emailToken) {
		logger.info('User tried to verify token of unknown email')
		return res.status(404).json({ message: t('email.verify.error.notFound') })
	}
	if (emailToken !== token) {
		logger.info('User tried to verify invalid token')
		return res
			.status(400)
			.json({ message: t('email.verify.error.invalidToken') })
	}
}
