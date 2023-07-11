import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import api from '@/api'

import apiErrorMiddleware from './middleware/apiErrorMiddleware'
import { rootReducer } from './reducers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware).concat(apiErrorMiddleware),
})

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()

export default store
