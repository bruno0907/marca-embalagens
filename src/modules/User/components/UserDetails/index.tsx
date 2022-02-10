import { useState } from 'react'
import dynamic from 'next/dynamic'

import { 
  Text,
  Stack,
  Skeleton,
  useDisclosure,
  SimpleGrid,
  Spinner,  
  HStack,
  Icon
} from "@chakra-ui/react"

import { 
  FiEdit, 
  FiList, 
  FiMail, 
  FiPhone, 
  FiSmartphone, 
  FiUser,
  FiCreditCard,
  FiAlertCircle,  
} from 'react-icons/fi'

import { 
  Section,
  SectionHeader,
  SectionTitle,
  Content,
  GridItem,
  ButtonLink 
} from '../../../../components'

import { useUserQuery } from '../../../../hooks'

import { User } from '../../../../models'

type Props = { userId: string; }

import { ModalProps } from '../../../../components/Modal'

const Modal = dynamic<ModalProps>(
  () => import('../../../../components/Modal').then(({ Modal }) => Modal)
)

import { UpdateUserModuleProps } from '../../../UpdateUser'

const UpdateUserForm = dynamic<UpdateUserModuleProps>(
  () => import('../../../UpdateUser').then(({ UpdateUserModule }) => UpdateUserModule)
)
  
export const UserDetails = ({ userId }: Props) => {  
  const { isOpen, onClose, onOpen } = useDisclosure()  
  const [userToEdit, setUserToEdit] = useState<User>(null)

  const { data: user, isLoading, isError, isFetching } = useUserQuery(userId)
  
  const handleEditUser = (user: User) => {
    setUserToEdit(user)
    onOpen()
    return
  }

  if(isLoading) {
    return (
      <Section w="100%">
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
        </SectionHeader>
        <Content>
          <SimpleGrid columns={[1, 1, 3]} gap={3}>
            {Array.from({length: 9}).map((_, i) => (            
                <Skeleton key={i} h={10} borderRadius="md"/>
              )
            )}        
          </SimpleGrid>
        </Content>
      </Section>
    )
  }

  if(isError) {
    return (
      <Section w="100%">
        <SectionHeader>
          <SectionTitle title="Dados cadastrais" />
        </SectionHeader>
        <Content>
          <HStack spacing={3} aling="center">
            <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
            <Text fontWeight="medium">Erro ao carregar os dados do cliente...</Text>
          </HStack>
        </Content>
      </Section>
    )
  }

  return (
    <>
      <Section>
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
          {isFetching && ( <Spinner size="sm" color="blue.500"/> )}
        </SectionHeader>
        <Content>
          <Stack spacing={3}>
            <SimpleGrid columns={[1, 1, 2]} gap={3}>
              {user?.nome && (
                <GridItem 
                  icon={FiUser}
                  label={`Nome ${user?.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
                  value={user?.nome}
                />
              )}
              {user?.razao_social && (
                <GridItem
                  icon={FiUser}
                  label="Razão Social"
                  value={user?.razao_social}
                />
              )}
              {user?.cpf_cnpj && (
                <GridItem
                  icon={FiCreditCard}
                  label={user?.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
                  value={user?.cpf_cnpj}
                />                
              )}      
              {user?.rg_ie && (
                <GridItem
                  icon={FiCreditCard}
                  label={user?.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
                  value={user?.rg_ie}
                />                
              )} 
              {user?.contato && (
                <GridItem
                  icon={FiUser}
                  label="Contato"
                  value={user?.contato}
                />                
              )}
              {user?.telefone && (
                <GridItem
                  icon={FiPhone}
                  label="Telefone"
                  value={user?.telefone}
                />                
              )} 
              {user?.celular && (
                <GridItem
                  icon={FiSmartphone}
                  label="Celular"
                  value={user?.celular}
                />
              )}
              {user?.email && (
                <GridItem 
                  icon={FiMail}
                  label="E-mail"
                  value={user?.email}
                />
                
              )}
              {user?.outras_informacoes && (
                <GridItem
                  icon={FiList}
                  label="Outras informacões"
                  value={user?.outras_informacoes}
                />                
              )}
            </SimpleGrid>
            
            <ButtonLink 
              leftIcon={<FiEdit/>}
              alignSelf="flex-end"
              ml="auto"
              p="2"
              onClick={() => handleEditUser(user)}
            >
              Editar cliente
            </ButtonLink>
          </Stack>
        </Content>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateUserForm user={userToEdit} onClose={onClose}/>
      </Modal>
    </>
  )  
}
