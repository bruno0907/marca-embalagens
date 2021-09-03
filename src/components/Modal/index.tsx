import { ReactNode } from "react"

import {  
  Modal as ChakraModal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent,   
  ModalHeader, 
  ModalOverlay, 
} from "@chakra-ui/react"

type ModalProps = {
 isOpen: boolean;
 onClose: () => void;
 children: ReactNode; 
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}          
      onEsc={onClose}
      useInert={isOpen}
      size="4xl"
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent bgColor="gray.100" p="4">
        <ModalHeader>Novo Cadastro</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export { Modal }
