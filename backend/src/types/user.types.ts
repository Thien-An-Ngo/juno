import { UUID } from './utils.types'

export interface ICreateUser {
	id?: UUID
	username: string
	email: string
	password: string
}