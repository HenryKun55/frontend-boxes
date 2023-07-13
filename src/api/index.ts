import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_API_URL

export const TOKEN_KEY = '@token/box'

const api = createApi({
  tagTypes: ['Users', 'Boxes', 'Files'],
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: headers => {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default api
