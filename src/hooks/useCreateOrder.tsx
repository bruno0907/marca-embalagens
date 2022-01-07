import { createContext, MutableRefObject, ReactNode, useContext, useState } from 'react'
import { UseQueryResult } from 'react-query';
import { OrderQueryProps, useOrdersQuery } from './useOrdersQuery';
import { useUsersQuery } from './useUsersQuery'
import { AddressProps, OrderItemProps, ProductProps, UserProps } from '../types'

type ContextProps = { 
  users: UseQueryResult<UserProps[]>;
  orders: UseQueryResult<OrderQueryProps[]>;
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
  handleAddItemToOrder: (ref: MutableRefObject<HTMLSelectElement>) => void;
  handleRemoveItemFromOrder: (index: number) => void;
  handleProductInOrderAmount: (amount: 'increment' | 'decrement', index: number) => void
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

  const users = useUsersQuery()
  const orders = useOrdersQuery()
  
  const handleAddItemToOrder = (ref: MutableRefObject<HTMLSelectElement>) => {    
    const currentOrderProducts = [...orderProducts]

    const productExists = currentOrderProducts.find(product => product.produto === selectedProduct.nome)

    if(!productExists) {      
      const newOrderProducts = {
        produto: selectedProduct.nome,
        quantidade: productAmount,
        valor_unitario: selectedProduct.preco_unitario,
        valor_total: selectedProduct.preco_unitario * productAmount
      }
    
      const updatedOrderProducts = [
        ...currentOrderProducts,
        newOrderProducts
      ]
    
      setOrderProducts(updatedOrderProducts)

      const total = updatedOrderProducts.reduce((acc, value) => {      
        return acc + value.valor_total
      }, 0)
    
      setOrderTotal(total)
      
      setSelectedProduct(null)
      setProductAmount(0)
      ref.current.value = 'defaultValue'
      
      return
    } 

    const updatedProducts = currentOrderProducts.map(product => {
      if(product.produto === productExists.produto) return {
        ...product,
        quantidade: product.quantidade + productAmount,
        valor_total: product.valor_total + (selectedProduct.preco_unitario * productAmount)
      }

      return product
    })

    setOrderProducts(updatedProducts)

    ref.current.value = 'defaultValue'

    const total = updatedProducts.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)

    setOrderTotal(total)
  
    setSelectedProduct(null)
    setProductAmount(0)

    return    
  }

  const handleProductInOrderAmount = (amount: 'increment' | 'decrement', index: number) => {    
    const currentOrderProducts = [...orderProducts]
    const productInOrder = currentOrderProducts.find((_, i) => i === index)

    if(amount === 'decrement' && productInOrder.quantidade <= 1) {
      const updatedOrderProducts = currentOrderProducts.filter((_, i) => i !== index)      

      setOrderProducts(updatedOrderProducts)

      const total = updatedOrderProducts.reduce((acc, value) => {
        return acc + value.valor_total
      }, 0)

      setOrderTotal(total)

      return
    }
    
    const updatedOrderProductsAmount = currentOrderProducts.map((product, i) => {
      if(i !== index) return product      
      
      return {
        ...productInOrder,
        quantidade: amount === 'increment' ? product.quantidade + 1: product.quantidade - 1,
        valor_total: amount === 'increment' ? product.valor_total + product.valor_unitario : product.valor_total - product.valor_unitario
      }
    })
     
    setOrderProducts(updatedOrderProductsAmount)

    const total = updatedOrderProductsAmount.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
    
    setOrderTotal(total)

    return    
  }

  const handleRemoveItemFromOrder = (itemIndex: number) => {
    const currentOrderProducts = [...orderProducts]
    const updatedOrderProducts = currentOrderProducts.filter((_, index) => index !== itemIndex)

    setOrderProducts(updatedOrderProducts)
    
    const result = updatedOrderProducts.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)

    setOrderTotal(result)
    
    return
  }

  return (
    <CreateOrderContext.Provider value={{
      users,
      orders,
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
      handleAddItemToOrder,
      handleRemoveItemFromOrder,
      handleProductInOrderAmount
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