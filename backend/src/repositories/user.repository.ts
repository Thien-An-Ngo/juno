import type { User } from '@prisma/client'
import { prisma } from '../services/db-client.service.ts'
import type { UUID } from '../types/util.type.ts'

export const createUser = async (data: {
	username: string
	email: string
	password: string
}): Promise<User> => prisma.user.create({ data })

export const findUserById = async (id: UUID): Promise<User | null> =>
	prisma.user.findUnique({ where: { id } })
