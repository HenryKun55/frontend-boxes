import api from '..'
import { FetchProfileResponse, SignInRequest, SignInResponse } from './types'

const endpoints = {
  signIn: () => 'auth/sign-in',
  profile: () => 'auth/profile',
}

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({
        url: endpoints.signIn(),
        method: 'POST',
        body,
      }),
    }),
    fetchProfile: builder.query<FetchProfileResponse, void>({
      query: endpoints.profile,
    }),
  }),
  overrideExisting: false,
})

export const { useFetchProfileQuery, useSignInMutation } = authApi

export default authApi
