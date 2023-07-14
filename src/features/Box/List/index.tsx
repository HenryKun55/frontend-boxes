import { useListBoxesQuery } from '@/api/boxes'
import { Box } from '@/api/models'
import { Table } from '@/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Routes } from '@/routes/routes'
import { BsBox } from 'react-icons/bs'

export const ListBox = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useListBoxesQuery({ take: 10, skip: 0 })

  const handleNavigate = useCallback((boxId: string) => {
    navigate(Routes.Box.replace(':boxId', boxId))
  }, [])

  const cols = useMemo<ColumnDef<Box>[]>(
    () => [
      {
        header: 'Name',
        cell: row => (
          <div
            className="flex gap-1 items-center cursor-pointer"
            onClick={() => handleNavigate(row.row.original.id)}>
            <BsBox size={20} />
            {row.renderValue() as string}
          </div>
        ),
        accessorKey: 'name',
      },
      {
        header: 'Files',
        cell: row => row.renderValue() ?? 0,
        accessorKey: 'files',
      },
    ],
    [],
  )

  if (isLoading) return <>Loading</>
  if (!data?.boxes) return <>No Data </>

  return <Table data={data.boxes} columns={cols} />
}
