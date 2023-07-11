export type Order = 'desc' | 'asc'

export type PagedRequest<T = object> = {
  page?: number
  perPage?: number
  sortBy?: keyof T
  orderBy?: Order
}

export type Paged<T> = {
  page: number
  total: number
  totalPages: number
  perPage: number
  data: T[]
}

export type ApiError = {
  app?: {
    type: 'danger' | 'warning'
    message: string
  }[]
  fields?: {
    name: string
    message: string
  }[]
}
