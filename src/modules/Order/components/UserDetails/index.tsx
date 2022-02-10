import { ChangeEvent, useEffect } from "react"
import dynamic from "next/dynamic"

import { 
  Text,  
  HStack,   
  SimpleGrid, 
  Stack, 
  useDisclosure,   
  StackProps,
  Icon,
  Skeleton
} from "@chakra-ui/react"

import { FiAlertCircle, FiEdit, FiRefreshCw } from "react-icons/fi"

import { Select, ButtonLink } from "../../../../components"

import { useCreateOrder } from '../../../../contexts/useCreateOrder'

import { useUsersQuery } from "../../../../hooks"

import { ModalProps } from "../../../../components/Modal"

const Modal = dynamic<ModalProps>(
  () => import('../../../../components/Modal').then(({ Modal }) => Modal)
)

import { UpdateUserModuleProps } from "../../../UpdateUser"
import { GridItem } from "../../../../components/GridItem"

const UpdateUserModule = dynamic<UpdateUserModuleProps>(
  () => import('../../../UpdateUser').then(({ UpdateUserModule }) => UpdateUserModule)
)

type Props = StackProps & {
  userId: string;
  isEditing?: boolean;  
}

export const UserDetails = ({ 
  userId, 
  isEditing = false,   
  ...rest 
}: Props) => {  
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data: users, isLoading, isError, isFetching } = useUsersQuery()

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

  useEffect(() => {
    const user = users?.find(u => u.id === userId)

    setSelectedUser(user)

    return () => setSelectedUser(null)
  }, [userId, users, setSelectedUser])

  if(isLoading) {
    return (
      <SimpleGrid columns={[1, 2, 3]} gap={3}>
        {Array.from({length: 6}).map((_, i) => {
          return (            
            <Skeleton key={i} h={12} borderRadius="md"/>
          )
        })}        
      </SimpleGrid>
    )
  }

  if(isError) {
    return (
      <HStack spacing={3} aling="center">
        <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
        <Text fontWeight="medium">Erro ao carregar a lista de clientes...</Text>
      </HStack>
    )
  }

  return (
    <>  
      {!selectedUser && (
        <Select
          label="Clientes:"
          name="cliente"
          defaultValue="defaultValue"
          isLoading={isFetching}
          value={selectedUser?.nome}
          onChange={handleSelectUser}
        >
          <option value="defaultValue" disabled aria-readonly>Selecione o cliente...</option>
          { users?.map(user => {
            return (
              <option key={user.id} value={user.id}>{user.nome}</option>
            )
          })}
        </Select>
      )}
      {selectedUser && (        
        <>
          <Stack spacing={6} opacity={!isEditing && .5} {...rest}>
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
                  label={selectedUser.razao_social ? 'CNPJ' : 'CPF'}
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
            {isEditing && (
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
