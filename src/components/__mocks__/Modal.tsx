import { Modal as ChakraModal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} data-testid="mock-modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal