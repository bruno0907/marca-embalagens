import dynamic from 'next/dynamic'

import { 
  Text, 
  Skeleton, 
  useDisclosure, 
  Spinner, 
  Spacer, 
  HStack, 
  Icon, 
  List
} from "@chakra-ui/react"

import { FiAlertCircle, FiPlus } from 'react-icons/fi'

import { AddressItem } from './components'

import { 
  Section,  
  SectionTitle,
  Content,
  ButtonLink,  
 } from '../../components'

import { useAddressesQuery } from '../../hooks'

import { ModalProps } from '../../components/Modal'

const Modal = dynamic<ModalProps>(
  () => import('../../components/Modal').then(({ Modal }) => Modal)  
)

import { CreateAddressModuleProps } from '../CreateAddress'
import { Address } from '../../models'

const CreateAddressModule = dynamic<CreateAddressModuleProps>(
  () => import('../CreateAddress')
  .then(({ CreateAddressModule }) => CreateAddressModule)  
)

export type AddressesDetailsProps = {
  userId: string;
}
  
export const AddressesModule = ({ userId }: AddressesDetailsProps) => {   
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { data: addresses, isLoading, isError, isFetching } = useAddressesQuery(userId)

  if(isLoading) {
    return (
      <Section>        
        <SectionTitle title="Endereço"/>        
        <Content>
          <Skeleton h="14" borderRadius="md"/>
        </Content>
      </Section>
    )
  }

  if(isError) {
    return (
      <Section>        
        <SectionTitle title="Endereço"/>        
        <Content>
          <HStack spacing={3} aling="center">
            <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
            <Text fontWeight="medium">Erro ao carregar a lista de endereços...</Text>
          </HStack>
        </Content>
      </Section>
    )
  }

  return (
    <>
      <SectionTitle title="Endereços">
        {isFetching && <Spinner size="sm" color="blue.500" />}
        <Spacer />
        <ButtonLink leftIcon={<FiPlus />} onClick={onOpen}>
          Cadastrar novo endereço
        </ButtonLink>
      </SectionTitle>
      <Content>
        <List spacing={3}>
          {addresses?.map((address: Address) => {
            return (
              <AddressItem key={address.id} address={address} />
            )
          })}
        </List>
      </Content>
      <Modal isOpen={isOpen} onClose={onClose} title="Novo endereço">
        <CreateAddressModule userId={String(userId)} onClose={onClose} />
      </Modal>
    </>    
  )
}
