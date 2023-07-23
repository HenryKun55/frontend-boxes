import { File } from '@/api/models'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { BsBox } from 'react-icons/bs'
import { useFetchBoxQuery } from '@/api/boxes'
import { Table } from '@/components/Table'
import { DropdownDots } from '@/components/DropdownDots'
import { toast } from 'react-toastify'
import { useDeleteFileMutation } from '@/api/files'
import { formatBytes } from '@/utils/format'

type ListFilesProps = {
  boxId: string
}

export const ListFiles = ({ boxId }: ListFilesProps) => {
  const { data, isLoading } = useFetchBoxQuery({ id: boxId })
  const [deleteFile] = useDeleteFileMutation()

  const [page, setPage] = useState(1)

  const files = data?.box.files

  const handleDelete = useCallback(async (file: File) => {
    await toast.promise(deleteFile({ id: file.id }), {
      pending: 'Deleting...',
      error: 'An error has occurred, please try again.',
      success: 'File deleted.',
    })
  }, [])

  const cols = useMemo<ColumnDef<File>[]>(
    () => [
      {
        header: 'Name',
        cell: row => (
          <a
            download
            href={row.row.original.path}
            target="_blank"
            className="flex gap-3 items-center cursor-pointer">
            <BsBox size={20} />
            {row.renderValue() as string}
          </a>
        ),
        accessorKey: 'name',
      },
      {
        header: 'Size',
        cell: row => <span>{formatBytes(row.row.original.size)}</span>,
        accessorKey: 'size',
      },
      {
        id: 'actions',
        header: '',
        cell: row => (
          <DropdownDots
            data={[
              {
                name: 'Delete',
                onAction: () => handleDelete(row.row.original),
              },
            ]}
          />
        ),
      },
    ],
    [],
  )

  if (isLoading) return <>Loading</>
  if (!files?.length)
    return (
      <p className="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Upload your first file here!
      </p>
    )

  return (
    <div className="flex justify-center">
      <Table
        data={files}
        columns={cols}
        count={files.length}
        page={page}
        nextPage={setPage}
        previousPage={setPage}
        totalPages={1}
      />
    </div>
  )
}
