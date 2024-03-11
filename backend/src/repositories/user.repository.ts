import { ICreateUser } from '../types/user.types'
import { User } from '@prisma/client'
import { prisma } from '../services/db-client.service'
import { randomUUID } from 'crypto'
import { UUID } from '../types/utils.types'

export const createUser = async (data: ICreateUser): Promise<User> => {
	return prisma.user.create({data: {...data, id: randomUUID()}})
}

export const getUserById = async (id: UUID): Promise<User | null> => {
	return prisma.user.findUnique({where: {id}})
}