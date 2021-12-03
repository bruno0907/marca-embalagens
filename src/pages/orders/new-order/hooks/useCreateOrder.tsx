import { createContext, ReactNode, useContext, useState } from 'react'
import { AddressProps, OrderItemProps, ProductProps, UserProps } from '../../../../types'

type ContextProps = {  
  selectedUser: UserProps;
  setSelectedUser: (user: UserProps) => void;
  selectedAddress: AddressProps;
  setSelectedAddress: (address: AddressProps) => void;
  selectedProduct: ProductProps;
  setSelectedProduct: (product: ProductProps) => void;
  productAmount: number;
  setProductAmount: (prevState: any) => void;
  orderProducts: OrderItemProps[];
  setOrderProducts: (orderItem: OrderItemProps[]) => void
  orderTotal: number;
  setOrderTotal: (total: number) => void  
}

type ProviderProps = {
  children: ReactNode;
}

const CreateOrderContext = createContext({} as ContextProps)

const CreateOrderProvider = ({ children }: ProviderProps) => {
  const [selectedUser, setSelectedUser] = useState<UserProps>(null)  
  const [selectedAddress, setSelectedAddress] = useState<AddressProps>(null)  
  
  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(null)  
  const [productAmount, setProductAmount] = useState(0)

  const [orderProducts, setOrderProducts] = useState<OrderItemProps[]>([])

  const [orderTotal, setOrderTotal] = useState(0)  
 
  return (
    <CreateOrderContext.Provider value={{      
      selectedUser,
      setSelectedUser,
      selectedAddress,
      setSelectedAddress,
      selectedProduct,
      setSelectedProduct,
      productAmount,
      setProductAmount,
      orderProducts,
      setOrderProducts,
      orderTotal,
      setOrderTotal,      
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