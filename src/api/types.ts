export type Order = 'desc' | 'asc'

export type PagedRequest = {
  take?: number
  skip?: number
}

export type Paged<T> = {
  data: T[]
  count: number
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
