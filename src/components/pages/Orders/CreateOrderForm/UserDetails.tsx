import { ChangeEvent, useEffect, useState } from "react"

import { Select } from "../../../Select"

import { useCreateOrder } from '../../../../contexts/useCreateOrder'

import { Button, Flex, HStack, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { InformationField } from "../../../InformationField"
import { FiCreditCard, FiEdit, FiPhone, FiSmartphone, FiUser, FiMail } from "react-icons/fi"

import { UserProps } from "../../../../types"

const UserDetails = () => {  
  const [user, setUser] = useState<UserProps>(null)

  const { 
    users, 
    selectedUser,
    setSelectedAddress,
    setSelectedUser, 
  } = useCreateOrder()

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUser(null)
    const { value } = event.target
    const user = users?.data?.find(user => user.id === value)
    setSelectedAddress(null)
    setSelectedUser(user)    
  }

  useEffect(() => {    
    setUser(selectedUser)

    return () => setUser(null)
  }, [selectedUser])

  return (
    <Stack spacing={3}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="bold">Cliente:</Text>        
      </Flex>
      {!selectedUser && (
        <Select 
          name="cliente"              
          isLoading={users.isLoading}
          value={!selectedUser ? 'defaultValue' : selectedUser.nome}
          onChange={handleSelectUser}
        >
          <option value="defaultValue" disabled>Selecione o cliente...</option>
          { users.isError
            ? <option value="defaultValue" disabled>Houve um erro ao carregar a lista de clientes...</option>
            : users.data?.map(user => (
                <option key={user.id} value={user.id}>{user.nome}</option>
              )
            )
          }
        </Select>
      )}
      { user && 
        <HStack
          spacing={3}
          justify="space-between"
          py="2"
          px="4"
          bgColor="gray.100"
          borderRadius="md"
          w="100%"
        >
          <SimpleGrid columns={2} spacingX={8} spacingY={3}>
            {user.nome && (
              <InformationField
                label="Nome"
                value={user.nome}
                icon={FiUser}                  
              />
            )}
            {user.natureza_cliente === 'Jurídica' && (
              <InformationField
                label="Razão social:"
                value={user.razao_social}
                icon={FiCreditCard}                  
              />
            )}
          
            {user.cpf_cnpj && (
              <InformationField
                label={user.natureza_cliente === 'Física' ? 'CPF:' : 'CPNJ'}
                value={user.cpf_cnpj}
                icon={FiCreditCard}

              />
            )}
            {user.rg_ie && (
              <InformationField
                label={user.natureza_cliente === 'Física' ? 'RG:' : 'IE'}
                value={user.rg_ie}
                icon={FiCreditCard}
                maxW="60"
              />
            )}
          
            {user.telefone && (
              <InformationField
                label="Telefone"
                value={user.telefone}
                icon={FiPhone}
              />            
            )}
            {user.celular && (
              <InformationField
                label="Celular:"
                value={user.celular}
                icon={FiSmartphone}
              />            
            )}
          
            {user.email && (
              <InformationField
                label="Email:"
                value={user.email}
                icon={FiMail}
              />
            )}          
            {user.contato && (
              <InformationField
                label="Contato:"
                value={user.contato}
                icon={FiUser}
              />
            )}
            
          </SimpleGrid>          
          <Button 
            ml="auto" 
            variant="link"
            // onMouseEnter={handlePrefetchAddress}
            // onClick={handleOpenModal} 
            _hover={{ svg: { color: "blue.600" } }}
          >
            <Icon as={FiEdit} fontSize="24" color="blue.500"/>
          </Button>          
        </HStack>
      }
      {selectedUser && (
        <Text as="button" textAlign="end" fontWeight="bold" color="blue.500" onClick={() => setSelectedUser(null)}>Selecionar outro cliente</Text>
      )}
    </Stack>
  )    
}

export {
  UserDetails
}
