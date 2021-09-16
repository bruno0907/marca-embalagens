import { useState } from 'react'
import { Content } from "../Content"
import { InformationField } from './components/informationField'

import { Modal } from '../Modal'
import { UpdateUserForm } from '../UpdateUserForm'

import { 
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

import { UserProps } from '../../types'

type UserInformationProps = {
  user: UserProps;
  isFetching: boolean;
}

const UserInformation = ({ user, isFetching }: UserInformationProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [userToEdit, setUserToEdit] = useState<UserProps>(null)  

  function handleEditUser(user: UserProps) {
    setUserToEdit(user)
    onOpen()
  }

  if(isFetching){
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

  return (
    <Content w="100%">
      <Flex align="center" mb="8">
        <Heading fontSize="2xl">Dados Principais</Heading>        
        <Spacer/>
        <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={() => handleEditUser(user)}>Editar</Button>
      </Flex>
      <Stack spacing={3}>
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiUser}
            label={`Nome ${user.natureza_cliente === 'Jurídica' ? 'Fantasia' : ''}`}
            value={user.nome}
          />
          { user.natureza_cliente === 'Jurídica' && 
            <InformationField 
              icon={FiUser}
              label="Razão Social"
              value={user.razao_social}
            /> }
        </HStack>

        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiCreditCard}
            label={user.natureza_cliente === 'Jurídica' ? 'CNPJ' : 'CPF'}
            value={user.cpf_cnpj}
          />
          <InformationField 
            icon={FiCreditCard}
            label={user.natureza_cliente === 'Jurídica' ? 'IE' : 'RG'}
            value={user.rg_ie}
          />
          <InformationField 
            icon={FiUser}
            label="Contato"
            value={user.contato}
          />
        </HStack>
          
        <HStack spacing={3} align="flex-start">
          <InformationField 
            icon={FiPhone}
            label="Telefone"
            value={user.telefone}
          />
          <InformationField 
            icon={FiSmartphone}
            label="Celular"
            value={user.celular}
          />
          <InformationField 
            icon={FiMail}
            label="E-mail"
            value={user.email}
          />
        </HStack>

        <InformationField 
          icon={FiList}
          label="Outras informacoes"
          value={user.outras_informacoes}
        />

      </Stack>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateUserForm user={userToEdit} onClose={onClose}/>
      </Modal>
    </Content>
  )  
}

export { UserInformation }
