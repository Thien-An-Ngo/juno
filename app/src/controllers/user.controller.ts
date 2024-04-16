import { differenceInMinutes } from 'date-fns'
import { type Context } from 'elysia'
import { t } from 'i18next'
import {
	checkEmailExistsAndLastUpdate,
	createUnverifiedUser,
	doesEmailExist,
	updateUnverifiedUser,
} from '../repositories/user.repository'
import { sendSignUpEmail } from '../services/mail.service'
import { EmailRegEx, emailType } from '../types/util.type'
import { setDefaultHeaders } from './controller.util'

export const signUpEmail = async (
	context: Context<{ params: { email: emailType } }>,
) => {
	const { set, params, error } = context
	const { email } = params

	setDefaultHeaders(set.headers)

	if (!EmailRegEx.test(email)) {
		console.log('Invalid email')
		return error(400, t('user.signup.email.error.invalid'))
	}

	if (await doesEmailExist(email)) {
		console.log('Email already in use')
		return error(400, t('user.signup.email.error.unavailable'))
	}

	// Check if and when email last tried to sign up
	const lastUpdatedIfExists = await checkEmailExistsAndLastUpdate(email)
	if (!lastUpdatedIfExists)
		return createUnverifiedUser({ email })
			.then((unverifiedUser) => {
				const { token } = unverifiedUser
				set.status = 201
				const mailRes = sendSignUpEmail(email, token)
				console.log(mailRes)
				return { message: t('user.signup.email.success.create') }
			})
			.catch((err) => {
				console.error(err)
				return error(500, t('user.signup.email.error.internal'))
			})

	// Check if email tried to sign up in the last 5 minutes
	if (differenceInMinutes(Date.now(), lastUpdatedIfExists) < 5) {
		console.log('Email tried to sign up too recently')
		return error(429, t('user.signup.email.error.tooRecent'))
	}

	// Update lastUpdated
	return updateUnverifiedUser(email)
		.then(() => {
			set.status = 201
			return { message: t('user.signup.email.success.update') }
		})
		.catch((err) => {
			console.error(err)
			return error(500, t('user.signup.email.error.internal'))
		})
}

export const signUp = (context: Context) => {
	console.log(context)
}
