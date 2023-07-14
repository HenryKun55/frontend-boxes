import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { twMerge } from 'tailwind-merge'

interface ReactTableProps<T extends object> {
  data: T[]
  columns: ColumnDef<T>[]
}

export const Table = <T extends object>({
  data,
  columns,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full cursor-default">
      <thead className="bg-gray-300 dark:bg-gray-700 ">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="text-start px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200 first:rounded-tl-lg last:rounded-tr-lg">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, key) => (
          <tr
            key={row.id}
            className={twMerge(
              'border-b bg-gray-50',
              key === table.getRowModel().rows.length - 1
                ? 'border-b-transparent first:[&>td]:rounded-bl-lg last:[&>td]:rounded-br-lg'
                : '',
            )}>
            {row.getVisibleCells().map(cell => (
              <td
                className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900"
                key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
