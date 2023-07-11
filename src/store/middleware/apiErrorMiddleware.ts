import { Middleware } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { ApiError } from '@/api/types'

import { AppState } from '../types'

const apiErrorMiddleware: Middleware<any, AppState> = () => {
  return next => action => {
    if (/api.*rejected/i.test(action.type)) {
      const apiError: ApiError = action.payload?.data
      if (apiError?.app) {
        apiError.app.forEach(data => {
          if (data.type === 'danger') toast.error(data.message)
          if (data.type === 'warning') toast.warn(data.message)
        })
        return next(action)
      }
    }
    return next(action)
  }
}

export default apiErrorMiddleware
