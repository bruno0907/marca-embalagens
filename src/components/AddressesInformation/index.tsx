import dynamic from 'next/dynamic'

import { CreateAddressFormProps } from './components/CreateAddressForm'
import { LoadingSkeleton } from './components/LoadingSkeleton'
import { ErrorComponent } from './components/ErrorComponent'
import { AddressList } from './components/AddressList'
import { ModalProps } from '../Modal'

import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import {  
  Spinner,  
  useDisclosure,
  Center,  
} from "@chakra-ui/react"

const Modal = dynamic<ModalProps>(
  async () => {
    const { Modal } = await import('../Modal')

    return Modal
  }
)

const CreateAddressForm = dynamic<CreateAddressFormProps>(
  async () => {
    const { CreateAddressForm } = await import('./components/CreateAddressForm') 
       
    return CreateAddressForm
  }, {
    loading: () => (
      <Center mb="8">
        <Spinner color="blue.500" />
      </Center>
    )   
  }
)

export type AddressesInformationProps = {
  userId: string;
}
  
const AddressesInformation = ({ userId }: AddressesInformationProps) => {   
  const { isOpen, onOpen, onClose } = useDisclosure()
  const addresses = useAddressesQuery(userId)
  
  const handleNewAddress = () => onOpen()  

  if(addresses.isLoading) return <LoadingSkeleton />    

  if(addresses.isError) return <ErrorComponent />

  return (
    <>
      <AddressList addresses={addresses.data} handleNewAddress={handleNewAddress}/>
      <Modal isOpen={isOpen} onClose={onClose} title="Novo endereço">
        <CreateAddressForm userId={String(userId)} onClose={onClose}/>
      </Modal>
    </>
  )
}

export { AddressesInformation }
