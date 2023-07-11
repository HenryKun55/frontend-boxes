import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../types'
import { initialState } from './slice'

const selectAuthStateDomain = (state: RootState) => state.auth || initialState

export const selectAuthUser = createSelector(
  selectAuthStateDomain,
  state => state.user,
)

export const selectAuthToken = createSelector(
  selectAuthStateDomain,
  state => state.token,
)

export const selectAuthIsAuthenticated = createSelector(
  selectAuthStateDomain,
  state => !!state.user && !!state.token,
)
