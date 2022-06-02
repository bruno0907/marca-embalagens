import { useState } from 'react'
import dynamic from 'next/dynamic'

import {   
  Stack,  
  useDisclosure,
  SimpleGrid,
  Spinner,  
  
} from "@chakra-ui/react"

import { 
  FiEdit, 
  FiList, 
  FiMail, 
  FiPhone, 
  FiSmartphone, 
  FiUser,
  FiCreditCard,  
} from 'react-icons/fi'

import { 
  Section,
  SectionHeader,
  SectionTitle,
  Content,
  GridItem,
  ButtonLink 
} from '../../../../components'

import { User } from '../../../../models'

type UserDetailsProps = { 
  user: User; 
  isFetching: boolean;
}

import { ModalProps } from '../../../../components/Modal'

const Modal = dynamic<ModalProps>(
  () => import('../../../../components/Modal').then(({ Modal }) => Modal)
)

import { UpdateUserModuleProps } from '../../../UpdateUser'

const UpdateUserForm = dynamic<UpdateUserModuleProps>(
  () => import('../../../UpdateUser').then(({ UpdateUserModule }) => UpdateUserModule)
)
  
export const UserDetails = ({ user, isFetching }: UserDetailsProps) => {  
  const { isOpen, onClose, onOpen } = useDisclosure()  
  const [userToEdit, setUserToEdit] = useState<User>(null)  
  
  const handleEditUser = (user: User) => {
    setUserToEdit(user)
    onOpen()
    return
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
