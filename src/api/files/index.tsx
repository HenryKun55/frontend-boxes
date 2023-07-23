import api from '..'
import {
  DeleteFileRequest,
  UploadFileRequest,
  UploadFileResponse,
} from './types'

const endpoints = {
  upload: () => 'files/upload',
  deleteFile: (fileId: string) => `files/${fileId}`,
}

const filesApi = api.injectEndpoints({
  endpoints: builder => ({
    upload: builder.mutation<UploadFileResponse, UploadFileRequest>({
      query: body => {
        const formData = new FormData()
        formData.append('Content-Type', body.file.type)
        formData.append('file', body.file)
        formData.append('boxId', body.boxId)

        return {
          url: endpoints.upload(),
          method: 'POST',
          body: formData,
        }
      },
      invalidatesTags: ['Boxes'],
    }),
    deleteFile: builder.mutation<void, DeleteFileRequest>({
      query: ({ id }) => ({
        url: endpoints.deleteFile(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Boxes', { type: 'Boxes', id: 'Id' }],
    }),
  }),
  overrideExisting: false,
})

export const { useUploadMutation, useDeleteFileMutation } = filesApi

export default filesApi
