import { HTMLAttributes } from 'react'

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalContent = ({ children, ...props }: ModalContentProps) => {
  return (
    <div
      className="relative bg-white rounded-lg shadow dark:bg-gray-700"
      {...props}>
      {children}
    </div>
  )
}
