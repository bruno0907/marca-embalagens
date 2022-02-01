import { ChangeEvent, useEffect, useState } from "react"
import dynamic from "next/dynamic"

import { Select } from "../../../../../components/Select"
import { InformationField } from "../../../../../components/InformationField"
import { Content } from "../../../../../components/Content"
import { Section } from "../../../../../components/Section"
import { SectionHeader } from "../../../../../components/SectionHeader"
import { SectionTitle } from "../../../../../components/SectionTitle"
import { useCreateOrder } from '../../../../../contexts/useCreateOrder'

import { Button, HStack, Icon, SimpleGrid, Stack, useDisclosure } from "@chakra-ui/react"
import { FiCreditCard, FiEdit, FiPhone, FiSmartphone, FiUser, FiMail, FiList } from "react-icons/fi"

import { User } from "../../../../../hooks/useUserQuery"

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
  const [user, setUser] = useState<User>(null)

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
    <>
      <Section flex="1">
        <SectionHeader>
          <SectionTitle title="Dados do cliente"/>
          {selectedUser && (
            <Button 
              colorScheme="blue" 
              variant="link" 
              onClick={() => setSelectedUser(null)}
            >Selecionar outro cliente</Button>
          )}
        </SectionHeader>
        <Content>
          <Stack spacing={3}>
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
                  {user.outras_informacoes && (
                    <InformationField
                      label="Contato:"
                      value={user.outras_informacoes}
                      icon={FiList}
                    />
                  )}
                  
                </SimpleGrid>          
                <Button 
                  ml="auto"
                  p="2" 
                  alignSelf="flex-start"
                  variant="link"
                  onClick={() => onOpen()} 
                  _hover={{ svg: { color: "blue.600" } }}
                >
                  <Icon as={FiEdit} fontSize="24" color="blue.500"/>
                </Button>          
              </HStack>
            }
          </Stack>
        </Content>
      </Section>
      <Modal isOpen={isOpen} onClose={onClose} title="Editar Cadastro">
        <UpdateUserForm user={user} onClose={onClose}/>
      </Modal>
    </>
  )    
}
