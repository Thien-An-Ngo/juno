import { CourierClient } from '@trycourier/courier'
import { t } from 'i18next'
import { emailType } from '../types/util.type'

const courier = new CourierClient({ authorizationToken: process.env.COURIER_AUTH_TOKEN })

const sendEmail = async (to: { email: emailType }, templateID: string, data?: Record<string, unknown>) => {
	return courier.send({
		message: {
			to,
			template: templateID,
			data,
			routing: {
				method: 'single',
				channels: ['email']
			}
		}
	})
}

export const sendSignUpEmail = async (email: emailType, token: string) =>
	sendEmail({ email }, process.env.SIGN_UP_MAIL_TEMPLATE!, {
		subject: t('email.signup.subject'),
		title: t('email.signup.title'),
		message: t('email.signup.body'),
		// TODO: Verification Link
		verificationLink: '',
		verificationButton: t('email.signup.button'),
		copyText: t('email.signup.copy.text'),
		copyButton: t('email.signup.copy.button'),
		token
	})
