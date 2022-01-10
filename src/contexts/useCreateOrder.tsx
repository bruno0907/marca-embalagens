import { createContext, ReactNode, useContext, useState } from 'react'
import { UseQueryResult } from 'react-query';
import { OrderQueryProps, useOrdersQuery } from '../hooks/useOrdersQuery';
import { useUsersQuery } from '../hooks/useUsersQuery'
import { AddressProps, UserProps } from '../types'

type ContextProps = { 
  users: UseQueryResult<UserProps[]>;
  orders: UseQueryResult<OrderQueryProps[]>;
  selectedUser: UserProps;
  setSelectedUser: (user: UserProps) => void;
  selectedAddress: AddressProps;
  setSelectedAddress: (address: AddressProps) => void;  
}

type ProviderProps = {
  children: ReactNode;
}

const CreateOrderContext = createContext({} as ContextProps)

const CreateOrderProvider = ({ children }: ProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<UserProps>(null)  
  const [selectedAddress, setSelectedAddress] = useState<AddressProps>(null)

  const users = useUsersQuery()
  const orders = useOrdersQuery()

  return (
    <CreateOrderContext.Provider value={{
      users,
      orders,
      selectedUser,
      setSelectedUser,
      selectedAddress,
      setSelectedAddress,      
    }}>
      {children}
    </CreateOrderContext.Provider>
  )
}

const useCreateOrder = () => useContext(CreateOrderContext)

export {
  useCreateOrder, 
  CreateOrderProvider 
}