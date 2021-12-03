import { ChangeEvent } from 'react'

import { Input } from "../../../../../../components/Input"
import { Select } from '../../../../../../components/Select'

import { HStack } from "@chakra-ui/react"

import { AddressProps, UserProps } from '../../../../../../types'
import { useUsersQuery } from '../../../../../../hooks/useUsersQuery'

type Props = {
  selectedUser: UserProps;
  setSelectedUser: (selectedUser: UserProps) => void;
  setSelectedAddress: (selectedAddress: AddressProps) => void;
}

const UserInfo = ({ 
  selectedUser,
  setSelectedAddress,
  setSelectedUser,

}: Props) => {  
  const users = useUsersQuery()  

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    const user = users.data?.find(user => user.id === value)

    setSelectedAddress(null)
    setSelectedUser(user)
  }
  

  return (
    <>
      <Select 
        name="cliente"
        label="Cliente:"    
        isLoading={users.isLoading}                   
        onChange={handleSelectUser}
        defaultValue="defaultValue"
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
      { !selectedUser ? null : 
        <>
          { selectedUser.natureza_cliente === 'Jurídica' &&
            <Input 
              label="Razão Social:"
              name="razao_social"
              isDisabled
              value={selectedUser.razao_social}
              onChange={() => {}}
            />
          }

          <HStack spacing={3}>
            <Input 
              name="cpf_cnpj"
              label={selectedUser?.natureza_cliente === 'Física' ? 'CPF:' : 'CNPJ:'}
              value={selectedUser.cpf_cnpj}
              onChange={() => {}}
              isDisabled
            />
            <Input 
              name="rg_ie"
              label={selectedUser.natureza_cliente === 'Física' ? 'RG:' : 'IE:'}
              isDisabled
              value={selectedUser.cpf_cnpj}
              onChange={() => {}}
            />
            <Input
              name="contato"
              label="Contato:"
              isDisabled
              value={selectedUser.contato}
              onChange={() => {}}
            />
          </HStack>

          <HStack spacing={3}>
            <Input 
              name="telefone"
              label="Telefone:"
              isDisabled
              value={selectedUser.telefone}
              onChange={() => {}}
            />
            <Input
              name="celular"
              label="Celular:"
              isDisabled
              value={selectedUser.celular}
              onChange={() => {}}
            />
            <Input
              name="email"
              label="E-mail:"
              isDisabled
              value={selectedUser.email}
              onChange={() => {}}
            />
          </HStack>
        </>
      }
    </>
  )
}

export {
  UserInfo
}