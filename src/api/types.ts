export type Order = 'desc' | 'asc'

export type PagedRequest = {
  take?: number
  skip?: number
}

export type Paged<T, K extends string> = {
  [key in K]: T[]
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
