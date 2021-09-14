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
 title: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}          
      onEsc={onClose}
      useInert={isOpen}
      size="5xl"
      closeOnOverlayClick={false}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent bgColor="gray.100" p="4">
        <ModalHeader fontSize="3xl">{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export { Modal }
