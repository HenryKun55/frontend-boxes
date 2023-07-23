import { Modal as ModalFlowbite, ModalProps } from 'flowbite-react'
import {
  HTMLAttributes,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'

export interface ModalRef extends HTMLAttributes<HTMLDivElement> {
  open: () => void
  close: () => void
}

export const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const [show, setShow] = useState(false)

  const open = useCallback(() => setShow(true), [])
  const close = useCallback(() => setShow(false), [])

  useImperativeHandle(ref, () => ({ open, close }))

  return (
    <ModalFlowbite
      theme={{ content: { base: 'relative h-auto w-full p-4' } }}
      show={show}
      onClose={close}
      position="center"
      dismissible>
      {props.children}
    </ModalFlowbite>
  )
})
