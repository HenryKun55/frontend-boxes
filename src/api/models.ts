export type User = {
  id: string
  username: string
  password: string
  is_deleted?: boolean
  boxes?: Box[]
}

export type Box = {
  id: string
  name: string
  files?: File[]
  userId: string
}

export type File = {
  id: string
  name: string
  path: string
  boxId: string
}
