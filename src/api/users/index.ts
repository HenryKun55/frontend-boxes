import api from '..'
import { CreateUserRequest, CreateUserResponse } from './types'

const endpoints = {
  fetchUser: (id: string) => `users/${id}`,
  createUser: () => `users`,
  listUsers: () => `users`,
  deleteUser: (id: string) => `users/${id}`,
  updateUser: (id: string) => `users/${id}`,
}

const usersApi = api.injectEndpoints({
  endpoints: builder => ({
    createUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: body => ({
        url: endpoints.createUser(),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
  overrideExisting: false,
})

export const { useCreateUserMutation } = usersApi

export default usersApi
