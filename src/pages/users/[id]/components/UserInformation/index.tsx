import { useState } from 'react'
import { Content } from "../../../../../components/Layout/Content"
import { InformationField } from '../../../../../components/Layout/InformationField'

import { Modal } from '../../../../../components/Modal'
import { UpdateUserForm } from '../UpdateUserForm'

import { useUserQuery } from '../../../../../hooks/useUserQuery'

import { 
  Text,
  Button,
  Stack,  
  Spinner,  
  Flex,
  Heading,
  HStack,
  Spacer,
  Skeleton,
  useDisclosure
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

import { UserProps } from '../../../../../types'

type Props = {
  userId: string | string[];  
}

const UserInformation = ({ userId }: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()  
  const [userToEdit, setUserToEdit] = useState<UserProps>(null)  

  const user = useUserQuery(String(userId))

  function handleEditUser(user: UserProps) {
    setUserToEdit(user)
    onOpen()
  }

  if(user.isLoading || user.isFetching){ 
    return (
      <Content w="100%">
        <Flex align="center" mb="8">
          <Heading fontSize="2xl">Dados Principais</Heading>
          <Spinner size="sm" color="gray.600" ml="4"/>
        </Flex>
        <Stack spacing={3}>
          <Skeleton h="10" borderRadius="8"/>
          <Skeleton h="10" borderRadius="8"/>
          <Skeleton h="10" borderRadius="8"/>
          <Skeleton h="10" borderRadius="8"/>
        </Stack>
      </Content>    
    )
  }

  if(user.isError) {
    return (
      <Content w="100%">
        <Stack spacing={3}>
          <Heading fontSize="2xl">Dados Principais</Heading>
          <Text>Ocorreu um erro ao carregar os dados do cliente. Volte e tente novamente...</Text>
        </Stack>
      </Content>    
    )
  }

  return (
    <Content w="100%">
      <Flex align="center" mb="8">
        <Heading fontSize="2xl">Dados Principais</Heading>        
        <Spacer/>
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => handleEditUser(user.data)}>Editar</Button>
      </Flex>
      <Stack spacing={3}>
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiUser}
            label={`Nome ${user.data.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
            value={user.data.nome}
          />
          { user.data.natureza_cliente === 'Jurídica' && 
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={user.data.razao_social}
            /> }
        </HStack>

        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiCreditCard}
            label={user.data.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
            value={user.data.cpf_cnpj}
          />
          <InformationField 
            icon={FiCreditCard}
            label={user.data.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
            value={user.data.rg_ie}
          />
          <InformationField 
            icon={FiUser}
            label="Contato"
            value={user.data.contato}
          />
        </HStack>
          
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiPhone}
            label="Telefone"
            value={user.data.telefone}
          />
          <InformationField 
            icon={FiSmartphone}
            label="Celular"
            value={user.data.celular}
          />
          <InformationField 
            icon={FiMail}
            label="E-mail"
            value={user.data.email}
          />
        </HStack>

        <InformationField 
          icon={FiList}
          label="Outras informacoes"
          value={user.data.outras_informacoes}
        />

      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateUserForm user={userToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { UserInformation }
