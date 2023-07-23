import { useUploadMutation } from '@/api/files'
import { bytesToMegaBytes, formatBytes } from '@/utils/format'
import { Button } from 'flowbite-react'
import {
  ChangeEvent,
  HTMLAttributes,
  useCallback,
  useState,
  MouseEvent,
} from 'react'
import { CgTrash } from 'react-icons/cg'
import { toast } from 'react-toastify'
import { twMerge } from 'tailwind-merge'

const THREE_MB = bytesToMegaBytes(3145728)

interface DropzoneProps extends HTMLAttributes<HTMLDivElement> {
  boxId: string
}

export const Dropzone = ({ boxId, ...props }: DropzoneProps) => {
  const [upload, { isLoading }] = useUploadMutation()
  const [file, setFile] = useState<File | null>(null)

  const onClick = (event: MouseEvent<HTMLInputElement>) => {
    const target = event.target as HTMLButtonElement
    target.value = ''
  }

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { target } = event
      if (!target.files?.length) return
      const file = target.files[0]
      if (bytesToMegaBytes(file.size) > THREE_MB)
        return toast.error('Max size of files is 3MB')
      setFile(file)
    },
    [file],
  )

  const handleRemove = useCallback(() => setFile(null), [])
  const handleUpload = useCallback(async () => {
    if (!file) return
    await toast.promise(
      upload({ file, boxId })
        .unwrap()
        .then(() => {
          setFile(null)
        }),
      {
        error: 'An error has occurred, please try again.',
        pending: 'Uploading...',
        success: 'Uploaded!',
      },
    )
  }, [file, boxId])

  return (
    <div className="flex flex-col gap-3">
      <form
        className={twMerge(
          'flex items-center justify-center w-full',
          props.className,
        )}>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Only images for now (MAX 3MB).
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onChange}
            onClick={event => onClick(event)}
          />
        </label>
      </form>

      {file && (
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex-1 max-w-sm flex gap-3 items-center bg-gray-50 p-4 rounded-lg shadow dark:bg-gray-800 drop-shadow-md">
            <img
              className="w-14 h-14 rounded-full"
              src={URL.createObjectURL(file)}
            />
            {file.name && file.size && (
              <div>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {file.name}
                </p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {formatBytes(file.size)}
                </p>
              </div>
            )}
            <Button className="ml-auto" color="red" onClick={handleRemove}>
              <CgTrash />
            </Button>
          </div>
          <Button
            isProcessing={isLoading}
            disabled={isLoading}
            onClick={handleUpload}>
            Upload
          </Button>
        </div>
      )}
    </div>
  )
}
