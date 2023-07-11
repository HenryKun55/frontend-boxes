import { createSlice } from '@reduxjs/toolkit'

import { User } from '@/api/models'

import { TOKEN_KEY } from '../../api'
import authApi from '@/api/auth'

const USER_KEY = '@box/user'

export type AuthState = {
  token: string | null
  user: User | null
}

function getUserFromLocalStorage() {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

export const initialState: AuthState = {
  token: localStorage.getItem(TOKEN_KEY),
  user: getUserFromLocalStorage(),
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null
      state.user = null
      localStorage.clear()
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, action) => {
        localStorage.setItem(TOKEN_KEY, action.payload.token)
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload.user))
        state.token = action.payload.token
        state.user = action.payload.user
      },
    )
    builder.addMatcher(
      authApi.endpoints.fetchProfile.matchFulfilled,
      (state, action) => {
        state.user = action.payload
        localStorage.setItem(USER_KEY, JSON.stringify(action.payload))
      },
    )
  },
})

export const { logout } = slice.actions
export default slice.reducer
