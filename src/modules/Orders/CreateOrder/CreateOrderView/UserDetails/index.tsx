import { ChangeEvent } from "react"
import dynamic from "next/dynamic"

import { Select } from "../../../../../components/Select"
import { useCreateOrder } from '../../../../../contexts/useCreateOrder'

import { 
  Text,
  Button, 
  HStack,   
  SimpleGrid, 
  Stack, 
  useDisclosure, 
  GridItem 
} from "@chakra-ui/react"

import { FiEdit, FiRefreshCw } from "react-icons/fi"

import { ModalProps } from "../../../../../components/Modal"
import { UpdateUserFormProps } from "../../../../../components/pages/Users/UpdateUserForm"

const Modal = dynamic<ModalProps>(
  () => import('../../../../../components/Modal').then(({ Modal }) => Modal)
)
const UpdateUserForm = dynamic<UpdateUserFormProps>(
  () => import('../../../../../components/pages/Users/UpdateUserForm').then(({ UpdateUserForm }) => UpdateUserForm)
)

export const UserDetails = () => {  
  const { isOpen, onOpen, onClose } = useDisclosure()  

  const { 
    users, 
    selectedUser,
    setSelectedAddress,
    setSelectedUser, 
  } = useCreateOrder()

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(null)
    const { value } = event.target
    const user = users?.data?.find(user => user.id === value)
    setSelectedAddress(null)
    setSelectedUser(user)
    return
  }

  if(users.isError) {
    return (
      <Text>Erro ao carregar a lista de usuários...</Text>
    )
  }

  return (
    <>  
      {!selectedUser && (
        <Select 
          name="cliente"              
          isLoading={users.isLoading}
          value={!selectedUser ? 'defaultValue' : selectedUser.nome}
          onChange={handleSelectUser}
        >
          <option value="defaultValue" disabled>Selecione o cliente...</option>
          { users.data?.map(user => {
            return (
              <option key={user.id} value={user.id}>{user.nome}</option>
            )
          })}
        </Select>
      )}
      {selectedUser && (        
        <>
          <Stack spacing={6}>
            <SimpleGrid columns={3} gap={3}>
              {selectedUser.nome && 
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
                  <Text fontSize="sm">{selectedUser.nome}</Text>            
                </GridItem>
              }
              {selectedUser.razao_social &&
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                  <Text fontSize="sm">{selectedUser.razao_social}</Text>
                </GridItem>
              }
              {selectedUser.cpf_cnpj &&
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="semibold">{selectedUser.razao_social ? 'CNPJ' : 'CPF'}</Text>
                  <Text fontSize="sm">{selectedUser.cpf_cnpj}</Text>
                </GridItem>
              }
              {selectedUser.telefone && (
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
                  <Text fontSize="sm">{selectedUser.telefone}</Text>            
                </GridItem>
              )}
              { selectedUser.celular && 
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                  <Text fontSize="sm">{selectedUser.celular}</Text>            
                </GridItem>
              }
              { selectedUser.contato && 
                <GridItem px={2} py={1} borderWidth="1px" borderColor="gray.200" borderRadius="md">
                  <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                  <Text fontSize="sm">{selectedUser.contato}</Text>            
                </GridItem>
              }        
            </SimpleGrid>
            <HStack spacing={6} alignSelf="flex-end">
              <Button
                variant="link"
                colorScheme="blue"
                rightIcon={<FiEdit/>}
                onClick={() => onOpen()}
              >Editar cliente</Button>
              <Text>|</Text>
              <Button 
                colorScheme="blue" 
                variant="link"
                rightIcon={<FiRefreshCw/>}
                onClick={() => setSelectedUser(null)}
              >Selecionar outro</Button>
            </HStack>
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
            <UpdateUserForm user={selectedUser} onClose={onClose}/>
          </Modal>
        </>
      )}
    </>
  )    
}
