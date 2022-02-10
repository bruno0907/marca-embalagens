import { ChangeEvent } from "react"
import dynamic from "next/dynamic"

import { 
  Text,  
  HStack,   
  SimpleGrid, 
  Stack, 
  useDisclosure,   
  Icon,  
  Spinner
} from "@chakra-ui/react"

import { FiAlertCircle, FiEdit, FiRefreshCw } from "react-icons/fi"

import { Select, ButtonLink } from "../../../../components"

import { useUsersQuery } from "../../../../hooks"

import { useCreateOrder } from '../../../../contexts/useCreateOrder'

import { ModalProps } from "../../../../components/Modal"
const Modal = dynamic<ModalProps>(
  () => import('../../../../components/Modal').then(({ Modal }) => Modal)
)

import { UpdateUserModuleProps } from "../../../UpdateUser"
import { GridItem } from "../../../../components/GridItem"
const UpdateUserModule = dynamic<UpdateUserModuleProps>(
  () => import('../../../UpdateUser').then(({ UpdateUserModule }) => UpdateUserModule)
)

type Props = {
  isSubmitting?: boolean;
}

export const UserDetails = ({ isSubmitting = false}: Props) => {  
  const { isOpen, onOpen, onClose } = useDisclosure()  
  const { data: users, isLoading, isError, isFetching} = useUsersQuery()

  const {      
    selectedUser,
    setSelectedAddress,
    setSelectedUser, 
  } = useCreateOrder()  

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(null)
    const { value } = event.target
    const user = users?.find(user => user.id === value)
    setSelectedAddress(null)
    setSelectedUser(user)
    return
  }

  if(isLoading) {
    return (
      <HStack spacing={2} align="center">
        <Text fontWeight="medium" fontSize="md">Cliente:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>
    )
  }

  if(isError) {
    return (
      <HStack spacing={3} aling="center">
        <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
        <Text fontWeight="medium">Erro ao carregar a lista de usuários...</Text>
      </HStack>
    )
  }

  return (
    <>  
      {!selectedUser && (
        <Select 
          name="cliente" 
          label="Cliente:"             
          isLoading={isFetching}
          value={!selectedUser ? 'defaultValue' : selectedUser.nome}
          onChange={handleSelectUser}
        >
          <option value="defaultValue" disabled>Selecione o cliente...</option>
          { users?.map(user => {
            return (
              <option key={user.id} value={user.id}>{user.nome}</option>
            )
          })}
        </Select>
      )}
      {selectedUser && (        
        <>
          <Stack spacing={6}>
            <SimpleGrid columns={[1, 2, 3]} gap={3}>
              {selectedUser.nome && 
                <GridItem
                  label="Nome:"
                  value={selectedUser.nome}
                />
              }
              {selectedUser.razao_social &&
                <GridItem
                  label="Razão social:"
                  value={selectedUser.razao_social}
                />
              }
              {selectedUser.cpf_cnpj &&
                <GridItem
                  label={selectedUser.razao_social ? 'CNPJ:' : 'CPF:'}
                  value={selectedUser.cpf_cnpj}
                />                  
              }
              {selectedUser.telefone && (
                <GridItem
                  label="Telefone:"
                  value={selectedUser.telefone}
                />                  
              )}
              { selectedUser.celular && 
                <GridItem
                  label="Celular:"
                  value={selectedUser.celular}
                />                  
              }
              { selectedUser.contato && 
                <GridItem
                  label="Contato:"
                  value={selectedUser.contato}
                />                  
              }        
            </SimpleGrid>
            {!isSubmitting && (
              <HStack spacing={[3, 3, 6]} alignSelf="flex-end">
                <ButtonLink                
                  rightIcon={<FiEdit/>}
                  onClick={() => onOpen()}
                >Editar cliente</ButtonLink>
                <Text>|</Text>
                <ButtonLink                 
                  rightIcon={<FiRefreshCw/>}
                  onClick={() => setSelectedUser(null)}
                >Selecionar outro</ButtonLink>
              </HStack>
            )}
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
            <UpdateUserModule user={selectedUser} onClose={onClose}/>
          </Modal>
        </>
      )}
    </>
  )    
}
