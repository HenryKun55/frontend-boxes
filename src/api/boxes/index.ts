import api from '..'
import {
  CreateBoxRequest,
  CreateBoxResponse,
  DeleteBoxRequest,
  FetchBoxRequest,
  FetchBoxResponse,
  ListBoxesRequest,
  ListBoxesResponse,
} from './types'

const endpoints = {
  fetchBox: (boxId: string) => `box/${boxId}`,
  listBoxes: () => `box`,
  createBox: () => `box`,
  deleteBox: (boxId: string) => `box/${boxId}`,
}

const boxesApi = api.injectEndpoints({
  endpoints: builder => ({
    fetchBox: builder.query<FetchBoxResponse, FetchBoxRequest>({
      query: ({ id }) => endpoints.fetchBox(id),
      providesTags: [{ type: 'Boxes', id: 'Id' }],
    }),
    listBoxes: builder.query<ListBoxesResponse, ListBoxesRequest>({
      query: params => ({
        url: endpoints.listBoxes(),
        params,
      }),
      providesTags: ['Boxes'],
    }),
    createBox: builder.mutation<CreateBoxResponse, CreateBoxRequest>({
      query: body => ({
        url: endpoints.createBox(),
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boxes'],
    }),
    deleteBox: builder.mutation<void, DeleteBoxRequest>({
      query: ({ id }) => ({
        url: endpoints.deleteBox(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Boxes', { type: 'Boxes', id: 'Id' }],
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchBoxQuery,
  useListBoxesQuery,
  useCreateBoxMutation,
  useDeleteBoxMutation,
} = boxesApi

export default boxesApi
