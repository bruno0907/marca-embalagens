import dynamic from 'next/dynamic'

import { CreateAddressFormProps } from './CreateAddressForm'
import { AddressList } from './AddressList'
import { ModalProps } from '../Modal'

import { useAddressesQuery } from '../../hooks/useAddressesQuery'

import { Text, Skeleton, useDisclosure } from "@chakra-ui/react"

import { Section } from '../Section'
import { SectionHeader } from '../SectionHeader'
import { SectionTitle } from '../SectionTitle'
import { Content } from '../Content'

const Modal = dynamic<ModalProps>(() => import('../Modal')
  .then(({ Modal }) => Modal)  
)

const CreateAddressForm = dynamic<CreateAddressFormProps>(
  () => import('./CreateAddressForm') 
    .then(({ CreateAddressForm }) => CreateAddressForm)  
)

export type AddressesDetailsProps = {
  userId: string;
}
  
const AddressesDetails = ({ userId }: AddressesDetailsProps) => {   
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addresses = useAddressesQuery(userId)

  if(addresses.isLoading) {
    return (
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Endereço"/>
        </SectionHeader>     
        <Content>
          <Skeleton h="14" borderRadius="md"/>
        </Content>
      </Section>
    )
  }

  if(addresses.isError) {
    return (
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Endereço"/>
        </SectionHeader>
        <Content>
          <Text>Ocorreu um erro ao carregar os endereços.</Text>
        </Content>
      </Section>
    )
  }

  return (
    <>
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Endereço"/>
        </SectionHeader>
        <Content>
          <AddressList addresses={addresses.data}/>
        </Content>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} title="Novo endereço">
        <CreateAddressForm
          userId={String(userId)} 
          onClose={onClose}
        />
      </Modal>
    </>
  )
}

export { AddressesDetails }
