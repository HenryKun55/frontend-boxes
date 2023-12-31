import { BoxTable } from '@/api/models'
import { Table } from '@/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/routes/routes'
import { BsBox } from 'react-icons/bs'
import { DropdownDots } from '@/components/DropdownDots'
import { toast } from 'react-toastify'
import { useDeleteBoxMutation, useListBoxesQuery } from '@/api/boxes'

export const ListBox = () => {
  const navigate = useNavigate()
  const [deleteBox] = useDeleteBoxMutation()

  const [page, setPage] = useState(1)
  const theSkip = useMemo(
    () => (page === 1 ? 0 : Number(`${page - 1}0`)),
    [page],
  )

  const { data: boxList, isLoading } = useListBoxesQuery({
    take: 10,
    skip: theSkip,
  })

  const totalPages = useMemo(() => {
    if (!boxList?.count) return 0
    return Math.ceil(boxList.count / 10)
  }, [boxList])

  const handleNavigate = useCallback((boxId: string) => {
    navigate(Routes.Box.replace(':boxId', boxId))
  }, [])

  const handleDelete = useCallback(async (box: BoxTable) => {
    await toast.promise(deleteBox({ id: box.id }), {
      pending: 'Deleting...',
      error: 'An error has occurred, please try again.',
      success: 'Box removed.',
    })
  }, [])

  const cols = useMemo<ColumnDef<BoxTable>[]>(
    () => [
      {
        header: 'Name',
        cell: row => (
          <div
            className="flex gap-3 items-center cursor-pointer"
            onClick={() => handleNavigate(row.row.original.id)}>
            <BsBox size={20} />
            {row.renderValue() as string}
          </div>
        ),
        accessorKey: 'name',
      },
      {
        header: 'Files',
        cell: row => row.renderValue(),
        accessorKey: '_count.files',
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
  if (!boxList?.data?.length)
    return (
      <p className="mb-6 text-lg text-center font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        Create your first box now!
      </p>
    )

  return (
    <div className="flex justify-center">
      <Table
        data={boxList.data}
        columns={cols}
        count={boxList.count}
        page={page}
        nextPage={setPage}
        previousPage={setPage}
        totalPages={totalPages}
      />
    </div>
  )
}
