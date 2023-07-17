import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { twMerge } from 'tailwind-merge'
import { useCallback, useMemo } from 'react'

interface ReactTableProps<T extends object> {
  data: T[]
  count: number
  columns: ColumnDef<T>[]
  totalPages: number
  page: number
  nextPage: (_page: number) => void
  previousPage: (_page: number) => void
}

export const Table = <T extends object>({
  data,
  count,
  columns,
  totalPages,
  page: currentPage,
  nextPage,
  previousPage,
}: ReactTableProps<T>) => {
  const [parent] = useAutoAnimate({ duration: 200 })
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handlePage = useCallback(
    (_page: number) => {
      if (currentPage === _page) return
      return _page < currentPage ? previousPage(_page) : nextPage(_page)
    },
    [currentPage],
  )

  const theCountOfCurrentPage = useMemo(() => `${currentPage}0`, [currentPage])

  return (
    <div className="w-full max-w-4xlrelative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full cursor-default">
        <thead className="bg-gray-300 dark:bg-gray-700">
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
          {table.getRowModel().rows.map(row => (
            <tr
              ref={parent}
              key={row.id}
              className="border-b border-b-gray-400 bg-gray-50 dark:bg-gray-500">
              {row.getVisibleCells().map(cell => (
                <td
                  className="px-6 py-4 text-sm font-light text-gray-900 dark:text-gray-200 last:text-right"
                  key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <nav
        className="flex items-center justify-between pt-4 px-6 py-4 bg-gray-50 dark:bg-gray-700"
        aria-label="table-navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {theCountOfCurrentPage}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            {count}
          </span>
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight  text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => previousPage(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }).map((_, key) => {
            const thePage = key + 1
            return (
              <li key={thePage}>
                <button
                  className={twMerge(
                    'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white',
                    thePage === currentPage
                      ? 'bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                      : '',
                  )}
                  onClick={() => handlePage(thePage)}
                  disabled={thePage === currentPage}>
                  {thePage}
                </button>
              </li>
            )
          })}
          <li>
            <button
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => nextPage(currentPage + 1)}
              disabled={totalPages === currentPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
