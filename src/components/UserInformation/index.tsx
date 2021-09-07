import { useRouter } from 'next/router'

import { Content } from "../Content"

import { 
  Button,
  Stack,
  Text,
  Box,
  Spinner,
  Icon,
  Flex,
  Heading,
  Center,
  HStack,  
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
import { InformationField } from './components/informationField'

type UserInformationProps = {
  user: UserProps;
}

const UserInformation = ({ user }: UserInformationProps) => {
  const router = useRouter()  

  function handleEditUser() {
    console.log('Edit User')
  }

  return (
    <Content w="100%">
      <Flex justify="space-between" align="center">
        <Heading fontSize="2xl">Dados Principais</Heading>
        { user && <Button colorScheme="blue" leftIcon={<FiEdit />} onClick={handleEditUser}>Editar</Button> }
      </Flex>
      { !user ? (
        <Center my="8">
          <Spinner size="md" color="blue.500" />
        </Center>
      ) : (
        <>
          <Stack spacing={3} my="8">
            <HStack spacing={3} align="flex-start">
              <InformationField 
                icon={FiUser}
                label={`Nome ${user.natureza_cliente === 'Jurídica' ? 'fantasia' : ''}`}
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
              label="Outras informações"
              value={user.outras_informações}
            />

          </Stack>
        </>
      )}
    </Content>
  )  
}

export { UserInformation }
