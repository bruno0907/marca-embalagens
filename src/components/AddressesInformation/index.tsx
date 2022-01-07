import dynamic from 'next/dynamic'

import { CreateAddressFormProps } from './CreateAddressForm'
import { LoadingSkeleton } from './LoadingSkeleton'
import { ErrorComponent } from './ErrorComponent'
import { AddressList } from './AddressList'
import { ModalProps } from '../Modal'

import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import { Box, Button, Flex, Heading, Spacer, useDisclosure } from "@chakra-ui/react"
import { FiEdit } from 'react-icons/fi'
import { Content } from '../Content'

const Modal = dynamic<ModalProps>(() => import('../Modal')
  .then(({ Modal }) => Modal)  
)

const CreateAddressForm = dynamic<CreateAddressFormProps>(
  () => import('./CreateAddressForm') 
    .then(({ CreateAddressForm }) => CreateAddressForm)  
)

export type AddressesInformationProps = {
  userId: string;
}
  
const AddressesInformation = ({ userId }: AddressesInformationProps) => {   
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addresses = useAddressesQuery(userId)

  if(addresses.isLoading) return <LoadingSkeleton />    

  if(addresses.isError) return <ErrorComponent />

  return (
    <>
      <Content w="100%">
        <Flex align='center' mb="8">
          <Heading fontSize="2xl">Endereços</Heading>
          <Spacer />
          <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => onOpen()}>
            Novo endereço
          </Button>
        </Flex>
        <Box mb="8">
          <AddressList addresses={addresses.data}/>        
        </Box>
      </Content>
      <Modal isOpen={isOpen} onClose={onClose} title="Novo endereço">
        <CreateAddressForm userId={String(userId)} onClose={onClose}/>
      </Modal>
    </>
  )
}

export { AddressesInformation }
