import { Modal, ModalRef } from '@/components/Modal'
import { ModalBody } from '@/components/Modal/Body'
import { ModalContent } from '@/components/Modal/Content'
import { ModalHeader } from '@/components/Modal/Header'
import { Button } from 'flowbite-react'
import { useRef } from 'react'
import { CreateBox } from '../../Create'

export const ModalCreateBox = () => {
  const modalRef = useRef<ModalRef>(null)

  return (
    <div>
      <Button onClick={() => modalRef.current?.open()}>Create Box</Button>
      <Modal ref={modalRef}>
        <ModalContent>
          <ModalHeader
            title="Vai?"
            onCancel={() => modalRef.current?.close()}
          />
          <ModalBody>
            <CreateBox onSubmit={() => modalRef.current?.close()} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}
