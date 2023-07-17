import { Box, BoxTable } from '../models'
import { Paged, PagedRequest } from '../types'

export type CreateBoxRequest = {
  name: string
}

export type CreateBoxResponse = {
  boxId: string
}

export type FetchBoxRequest = {
  id: string
}

export type FetchBoxResponse = {
  box: Box
}

export type ListBoxesRequest = PagedRequest
export type ListBoxesResponse = Paged<BoxTable>

export type DeleteBoxRequest = {
  id: string
}
