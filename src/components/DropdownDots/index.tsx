import { Dropdown } from 'flowbite-react'
import { Fragment, HTMLAttributes } from 'react'

type DropdownItem = {
  name: string
  onAction: () => Promise<void>
  hasDivider?: boolean
}

interface DropdownDotsProps extends HTMLAttributes<HTMLDivElement> {
  data: DropdownItem[]
}

export const DropdownDots = ({ data }: DropdownDotsProps) => {
  return (
    <Dropdown
      label="Dropdown button"
      renderTrigger={() => (
        <button
          type="button"
          className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
      )}>
      {data.map(({ name, onAction, hasDivider }) => (
        <Fragment key={name}>
          <Dropdown.Item onClick={onAction}>{name}</Dropdown.Item>
          {hasDivider && <Dropdown.Divider />}
        </Fragment>
      ))}
    </Dropdown>
  )
}
