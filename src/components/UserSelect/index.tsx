import { ChangeEvent } from "react"
import { useCreateOrder } from "../../contexts/useCreateOrder"
import { Select } from "../Select"

export const UserSelect = () => {
  const {
    users,
    selectedUser,
    setSelectedUser,
    setSelectedAddress
  } = useCreateOrder()

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(null)    
    const { value } = event.target
    const user = users?.data?.find(user => user.id === value)
    setSelectedAddress(null)
    setSelectedUser(user)    
  }

  return (
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
  )
}