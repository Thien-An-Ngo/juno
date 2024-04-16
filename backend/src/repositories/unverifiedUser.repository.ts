import type { UnverifiedUser } from '@prisma/client'
import { randomBytes } from 'crypto'
import { formatISO } from 'date-fns'
import { prisma } from '../services/db-client.service'

export const createUnverifiedUser = async (data: {
	email: string
}): Promise<UnverifiedUser> => {
	const { email } = data
	const token = randomBytes(32).toString('hex')
	return prisma.unverifiedUser.create({ data: { email, token } })
}

export const checkEmailExistsAndLastUpdate = async (
	email: string,
): Promise<Date | undefined> => {
	const unverifiedUser = await prisma.unverifiedUser.findFirst({
		where: { email },
	})
	return unverifiedUser?.lastUpdated
}

export const updateUnverifiedUser = async (
	email: string,
): Promise<UnverifiedUser> => {
	const token = randomBytes(32).toString('hex')
	return prisma.unverifiedUser.update({
		where: { email },
		data: { token, lastUpdated: formatISO(Date.now()) },
	})
}

export const doesEmailExist = async (email: string): Promise<boolean> =>
	prisma.user
		.findFirst({ where: { email } })
		.then((user) => user !== null)
		.catch(() => false)

export const findEmailToken = async (
	email: string,
): Promise<string | undefined> => {
	const unverifiedUser = await prisma.unverifiedUser.findFirst({
		where: { email },
	})
	return unverifiedUser?.token
}
