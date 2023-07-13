import { File as FileModel } from '../models'

export type UploadFileRequest = {
  file: File
  boxId: string
}

export type UploadFileResponse = FileModel
