import { UnverifiedUser, User } from '@prisma/client'
import { prisma } from '../services/db-client.service'
import { UUID } from '../types/utils.types'

export const createUnverifiedUser = async (data: {email: string}): Promise<UnverifiedUser> => {
	return prisma.unverifiedUser.create({data: data})
}

export const createUser = async (data: {
	username: string
	email: string
	password: string
}): Promise<User> => {
	return prisma.user.create({data: data})
}

export const getUserById = async (id: UUID): Promise<User | null> => {
	return prisma.user.findUnique({where: {id}})
}