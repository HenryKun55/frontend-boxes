import { Box } from '../models'
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

export type FetchBoxResponse = Box

export type ListBoxesRequest = PagedRequest
export type ListBoxesResponse = Paged<Box, 'boxes'>

export type DeleteBoxRequest = {
  id: string
}
