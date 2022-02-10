import { createContext, ReactNode, useContext, useState } from 'react'
import { UseQueryResult } from 'react-query';

import { useOrdersQuery } from '../hooks/useOrdersQuery';

import { useUsersQuery } from '../hooks/useUsersQuery'
import { Address, User, OrderQuery } from '../models';

type ContextProps = { 
  users: UseQueryResult<User[]>;
  orders: UseQueryResult<OrderQuery[]>;
  selectedUser: User;
  setSelectedUser: (user: User) => void;
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;  
}

type ProviderProps = {
  children: ReactNode;
}

const CreateOrderContext = createContext({} as ContextProps)

const CreateOrderProvider = ({ children }: ProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<User>(null)  
  const [selectedAddress, setSelectedAddress] = useState<Address>(null)

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