import { useState } from 'react'
import dynamic from 'next/dynamic'

import { Section } from '../../Section'

import { InformationField } from '../../InformationField'
import { ModalProps } from '../../Modal'
import { UpdateUserFormProps } from './UpdateUserForm'

import { User, useUserQuery } from '../../../hooks/useUserQuery'

import { 
  Text,
  Stack,
  Skeleton,
  useDisclosure,
  SimpleGrid,
  GridItem,
  Button,
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
  FiEdit2,   
} from 'react-icons/fi'
import { SectionHeader } from '../../SectionHeader'
import { SectionTitle } from '../../SectionTitle'
import { Content } from '../../Content'

type Props = { userId: string; }

const Modal = dynamic<ModalProps>(
  () => import('../../Modal').then(({ Modal }) => Modal)
)

const UpdateUserForm = dynamic<UpdateUserFormProps>(
  () => import('./UpdateUserForm').then(({ UpdateUserForm }) => UpdateUserForm)
)

const UserDetails = ({ userId }: Props) => {  
  const { isOpen, onClose, onOpen } = useDisclosure()  
  const [userToEdit, setUserToEdit] = useState<User>(null)

  const user = useUserQuery(userId)

  const handleEditUser = (user: User) => {
    setUserToEdit(user)
    onOpen()
    return
  }

  if(user.isLoading || user.isFetching){ 
    return (
      <Section>
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
        </SectionHeader>
        <Content>
          <Stack spacing={3}>
            <Skeleton h="10" borderRadius="md"/>
            <Skeleton h="10" borderRadius="md"/>
            <Skeleton h="10" borderRadius="md"/>
            <Skeleton h="10" borderRadius="md"/>
          </Stack>
        </Content>
      </Section>    
    )
  }

  if(user.isError) {
    return (
      <Section>
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
        </SectionHeader>
        <Content>
          <Text>Ocorreu um erro ao carregar os dados do cliente.</Text>
        </Content>
      </Section>    
    )
  }

  return (
    <>
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Dados cadastrais"/>
        </SectionHeader>
        <Content>
          <HStack spacing={3} py={2} px={4} bgColor="gray.100" borderRadius="md" align="center">
            <SimpleGrid columns={2} gap={3}>
              {user.data.nome && (
                <GridItem>
                  <InformationField 
                    icon={FiUser}
                    label={`Nome ${user.data.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
                    value={user.data.nome}
                  />
                </GridItem>
              )}
              {user.data.natureza_cliente === 'Jurídica' && (
                <GridItem>
                  <InformationField 
                    icon={FiUser}
                    label="Razão Social"
                    value={user.data.razao_social}
                  />
                </GridItem>
              )}
              {user.data.cpf_cnpj && (
                <GridItem>
                  <InformationField 
                    icon={FiCreditCard}
                    label={user.data.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
                    value={user.data.cpf_cnpj}
                  />
                </GridItem>
              )}      
              {user.data.rg_ie && (
                <GridItem>
                  <InformationField 
                    icon={FiCreditCard}
                    label={user.data.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
                    value={user.data.rg_ie}
                  />
                </GridItem>
              )} 
              {user.data.contato && (
                <GridItem>
                  <InformationField 
                    icon={FiUser}
                    label="Contato"
                    value={user.data.contato}
                  />
                </GridItem>
              )}
              {user.data.telefone && (
                <GridItem>
                  <InformationField 
                    icon={FiPhone}
                    label="Telefone"
                    value={user.data.telefone}
                  />
                </GridItem>
              )} 
              {user.data.celular && (
                <GridItem>
                  <InformationField 
                    icon={FiSmartphone}
                    label="Celular"
                    value={user.data.celular}
                  />
                </GridItem>
              )}
              {user.data.email && (
                <GridItem>
                  <InformationField 
                    icon={FiMail}
                    label="E-mail"
                    value={user.data.email}
                  />
                </GridItem>
              )}
              {user.data.outras_informacoes && (
                <GridItem>
                  <InformationField 
                    icon={FiList}
                    label="Outras informacões"
                    value={user.data.outras_informacoes}
                  />
                </GridItem>
              )}
            </SimpleGrid>
            <Button 
              variant="link" 
              colorScheme="blue" 
              alignSelf="flex-start"
              ml="auto"
              p="2"
              onClick={() => handleEditUser(user.data)} 
              _hover={{ svg: { color: 'blue.600' }}}
            >
              <Icon as={FiEdit} fontSize={24} />
            </Button>
          </HStack>            
        </Content>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateUserForm user={userToEdit} onClose={onClose}/>
      </Modal>
    </>
  )  
}

export { UserDetails }
