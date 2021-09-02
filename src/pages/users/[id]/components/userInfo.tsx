import { useRouter } from 'next/router'

import { Content } from "../../../../components/Content"

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
} from "@chakra-ui/react"

import { FiEdit, FiMail, FiPhone, FiSmartphone, FiUser } from 'react-icons/fi'

type UserInfoProps = {
  user: UserProps;
}

interface UserProps {
  id: string;
  name: string;
  phone_number: string;
  mobile_number: string;
  email: string;  
}

const UserInfo = ({ user }: UserInfoProps) => {
  const router = useRouter()

  function handleEditUser() {
    router.push(`/user/${user.id}`)    
  }

  return (
    <Content>
      <Flex justify="space-between" align="center">
        <Heading fontSize="2xl">Dados Principais</Heading>
        { user && <Button colorScheme="blue" rightIcon={<FiEdit />}>Editar</Button> }
      </Flex>
      { !user ? (
        <Center my="8">
          <Spinner size="lg" color="blue.500" />
        </Center>
      ) : (
        <>
          <Stack spacing={3} my="8">
            <Box p="4" bgColor="gray.100" borderRadius="16" border="1" borderColor="gray.600">
              <Flex align="center">
                <Icon as={FiUser} fontSize="24" color="gray.500"/>
                <Box ml="4">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">Nome</Text>
                  <Text fontSize="sm" color="gray.700" fontWeight="medium">{user.name}</Text>
                </Box>
              </Flex>
            </Box>
            <Box p="4" bgColor="gray.100" borderRadius="16" border="1" borderColor="gray.600">
              <Flex align="center">
                <Icon as={FiPhone} fontSize="24" color="gray.500"/>
                <Box ml="4">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">Telefone</Text>
                  <Text fontSize="sm" color="gray.700" fontWeight="medium">{user.phone_number || 'Não possui'}</Text>                        
                </Box>
              </Flex>
            </Box>
            <Box p="4" bgColor="gray.100" borderRadius="16" border="1" borderColor="gray.600">
              <Flex align="center">
                <Icon as={FiSmartphone} fontSize="24" color="gray.500"/>
                <Box ml="4">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">Celular</Text>
                  <Text fontSize="sm" color="gray.700" fontWeight="medium">{user.mobile_number || 'Não possui'}</Text>                        
                </Box>
              </Flex>
            </Box>
            <Box p="4" bgColor="gray.100" borderRadius="16" border="1" borderColor="gray.600">
              <Flex align="center">
                <Icon as={FiMail} fontSize="24" color="gray.500"/>
                <Box ml="4">
                  <Text fontSize="sm" color="gray.500" fontWeight="medium">E-mail</Text>
                  <Text fontSize="sm" color="gray.700" fontWeight="medium">{user.email || 'Não possui'}</Text>                        
                </Box>
              </Flex>
            </Box>
          </Stack>                  
        </>
      )}      
    </Content>
  )  
}

export { UserInfo }
