import { useListBoxesQuery } from '@/api/boxes'
import { Box } from '@/api/models'
import { Table } from '@/components/Table'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

export const ListBox = () => {
  const { data, isLoading } = useListBoxesQuery({ take: 10, skip: 0 })

  const cols = useMemo<ColumnDef<Box>[]>(
    () => [
      {
        header: 'Id',
        cell: row => row.renderValue(),
        accessorKey: 'id',
      },
      {
        header: 'Name',
        cell: row => row.renderValue(),
        accessorKey: 'name',
      },
    ],
    [],
  )

  console.log(data)

  if (isLoading) return <>Loading</>
  if (!data?.boxes) return <>No Data </>

  return (
    <div className="flex">
      <Table data={data.boxes} columns={cols} />
    </div>
  )
}
