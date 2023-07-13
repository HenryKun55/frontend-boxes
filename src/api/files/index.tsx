import api from '..'
import { UploadFileRequest, UploadFileResponse } from './types'

const endpoints = {
  upload: () => 'files/upload',
}

const filesApi = api.injectEndpoints({
  endpoints: builder => ({
    upload: builder.mutation<UploadFileResponse, UploadFileRequest>({
      query: body => ({
        url: endpoints.upload(),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boxes'],
    }),
  }),
  overrideExisting: false,
})

export const { useUploadMutation } = filesApi

export default filesApi
