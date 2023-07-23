import { HTMLAttributes } from 'react'

interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {}

export const ModalBody = ({ children, ...props }: ModalBodyProps) => {
  return (
    <div className="p-6 space-y-6" {...props}>
      {children}
    </div>
  )
}
