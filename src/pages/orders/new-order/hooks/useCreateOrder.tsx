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
  setOrderTotal: (result: number) => void  
  // handleAddItemToOrder: () => void;
  handleRemoveItemFromOrder: (index: number) => void;
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
  
  // const handleAddItemToOrder = () => {    
  //   const currentOrderProducts = [...orderProducts]
    
  //   const newOrderProducts = {
  //     produto: selectedProduct.nome,
  //     quantidade: productAmount,
  //     valor_unitario: selectedProduct.preco_unitario,
  //     valor_total: selectedProduct.preco_unitario * productAmount
  //   }    

  //   const updatedOrderProducts = [
  //     ...currentOrderProducts,
  //     newOrderProducts
  //   ]

  //   setOrderProducts(updatedOrderProducts)

  //   const sumTotal = getSumTotal(updatedOrderProducts)
  
  //   setOrderTotal(sumTotal)
    
  //   setSelectedProduct(null)
  //   setProductAmount(0)
  // }

  const handleRemoveItemFromOrder = (itemIndex: number) => {
    const currentOrderProducts = [...orderProducts]

    const updatedOrderProducts = currentOrderProducts.filter((_, index) => index !== itemIndex)

    setOrderProducts(updatedOrderProducts)
    
    const result = getSumTotal(updatedOrderProducts)
  
    setOrderTotal(result)
  }

  const getSumTotal = (order: OrderItemProps[]) => {
    return order.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
  }

  const CreateOrderProviderValues = {
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
    // handleAddItemToOrder,
    handleRemoveItemFromOrder,
  }
 
  return (
    <CreateOrderContext.Provider value={CreateOrderProviderValues}>
      {children}
    </CreateOrderContext.Provider>
  )
}

const useCreateOrder = () => useContext(CreateOrderContext)

export {
  useCreateOrder, 
  CreateOrderProvider 
}