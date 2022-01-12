import { useState } from 'react'
import dynamic from 'next/dynamic'

import { Content } from "../../Content"

import { InformationField } from '../../InformationField'
import { ModalProps } from '../../Modal'
import { UpdateUserFormProps } from './UpdateUserForm'

import { User, useUserQuery } from '../../../hooks/useUserQuery'

import { 
  Text,
  Button,
  Stack,  
  Spinner,  
  Flex,
  Heading,
  Spacer,
  Skeleton,
  useDisclosure,
  Center,
  Box,
  SimpleGrid
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

type Props = { userId: string; }

const Modal = dynamic<ModalProps>(
  async () => {
    const { Modal } = await import('../../Modal')

    return Modal
  }
)

const UpdateUserForm = dynamic<UpdateUserFormProps>(
  async () => {
    const { UpdateUserForm } = await import('./UpdateUserForm')

    return UpdateUserForm
  }, {
    loading: () => (
      <Center mb="8">
        <Spinner color="blue.500"/>
      </Center>
    )
  }
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
      <Content>
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Dados Principais</Heading>
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Stack spacing={3}>
          <Skeleton h="10" borderRadius="md"/>
          <Skeleton h="10" borderRadius="md"/>
          <Skeleton h="10" borderRadius="md"/>
          <Skeleton h="10" borderRadius="md"/>
        </Stack>
      </Content>    
    )
  }

  if(user.isError) {
    return (
      <Content>
        <Stack spacing={3}>
          <Heading fontSize="2xl">Dados Principais</Heading>
          <Text>Ocorreu um erro ao carregar os dados do cliente. Volte e tente novamente...</Text>
        </Stack>
      </Content>    
    )
  }

  return (
    <Content>
      <Flex align="center" mb="8">
        <Heading fontSize="2xl">Dados Principais</Heading>        
        <Spacer/>
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => handleEditUser(user.data)}>Editar</Button>
      </Flex>      
      <SimpleGrid gap={3} columns={2}>
        {user.data.nome && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiUser}
              label={`Nome ${user.data.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
              value={user.data.nome}
            />
          </Box>
        )}
        {user.data.natureza_cliente === 'Jurídica' && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={user.data.razao_social}
            />
          </Box>
        )}
        {user.data.cpf_cnpj && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiCreditCard}
              label={user.data.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
              value={user.data.cpf_cnpj}
            />
          </Box>
        )}      
        {user.data.rg_ie && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiCreditCard}
              label={user.data.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
              value={user.data.rg_ie}
            />
          </Box>
        )} 
        {user.data.contato && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiUser}
              label="Contato"
              value={user.data.contato}
            />
          </Box>
        )}
        {user.data.telefone && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiPhone}
              label="Telefone"
              value={user.data.telefone}
            />
          </Box>
        )} 
        {user.data.celular && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiSmartphone}
              label="Celular"
              value={user.data.celular}
            />
          </Box>
        )}
        {user.data.email && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiMail}
              label="E-mail"
              value={user.data.email}
            />
          </Box>
        )}
        {user.data.outras_informacoes && (
          <Box py="2" px="4" bgColor="gray.100" borderRadius="md">
            <InformationField 
              icon={FiList}
              label="Outras informacões"
              value={user.data.outras_informacoes}
            />
          </Box>
        )}
      </SimpleGrid>
      
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateUserForm user={userToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { UserDetails }
