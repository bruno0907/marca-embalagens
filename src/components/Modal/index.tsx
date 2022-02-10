import { ReactNode } from "react"

import {  
  Modal as ChakraModal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent,   
  ModalHeader, 
  ModalOverlay, 
} from "@chakra-ui/react"

export type ModalProps = {
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
      <ModalContent p={['2', '2', '4']} bgColor="gray.50">
        <ModalHeader fontSize={['2xl', '2xl', '3xl']}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export { Modal }
