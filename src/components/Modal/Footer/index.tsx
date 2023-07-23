import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type ModalFooterAction = {
  name: string
  action: () => Promise<void>
}

interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  submit: ModalFooterAction
  cancel: ModalFooterAction
}

export const ModalFooter = ({
  className,
  submit,
  cancel,
  ...props
}: ModalFooterProps) => {
  return (
    <div
      className={twMerge(
        'flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600',
        className,
      )}
      {...props}>
      <button
        type="button"
        onClick={submit.action}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {submit.name}
      </button>
      <button
        type="button"
        onClick={cancel?.action}
        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
        {cancel?.name}
      </button>
    </div>
  )
}
