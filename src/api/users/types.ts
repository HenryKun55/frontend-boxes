export type FetchUserRequest = {
  id: string
}

export type CreateUserRequest = {
  username: string
  password: string
}

export type CreateUserResponse = {
  userId: string
}
