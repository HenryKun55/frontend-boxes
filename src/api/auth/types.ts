import { User } from '../models'

export type SignInRequest = {
  username: string
  password: string
}

export type SignInResponse = {
  token: string
  user: User
}

export type SignUpRequest = {
  username: string
  password: string
}

export type SignUpResponse = {
  user: Omit<User, 'password'>
}

export type FetchProfileResponse = User
