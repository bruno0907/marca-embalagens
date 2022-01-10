import { createContext, MutableRefObject, ReactNode, useState, useContext, useEffect } from 'react'

import { OrderItemProps, ProductProps } from '../types'

type ContextProps = {
  selectedProduct: ProductProps;
  setSelectedProduct: (product: ProductProps) => void;

  productAmount: number;
  setProductAmount: (prevState: any) => void;

  cartProducts: OrderItemProps[];
  setCartProducts: (products: OrderItemProps[]) => void;

  cartTotal: number;
  setCartTotal: (result: number) => void  

  handleAddProductToCart: (ref: MutableRefObject<HTMLSelectElement>) => void;
  handleRemoveProductFromCart: (index: number) => void;
  handleProductAmountInCart: (amount: 'increment' | 'decrement', index: number) => void

  canSubmit: boolean;
}

type ProviderProps = { children: ReactNode; }

const CartContext = createContext({} as ContextProps)

const CartProvider = ({ children }: ProviderProps) => {

  const [selectedProduct, setSelectedProduct] = useState<ProductProps>(null)
  const [productAmount, setProductAmount] = useState(0)
  const [cartProducts, setCartProducts] = useState<OrderItemProps[]>([])
  const [cartTotal, setCartTotal] = useState(0)
  
  const handleAddProductToCart = (ref: MutableRefObject<HTMLSelectElement>) => {    
    const products = [...cartProducts]

    const productExists = products.find(product => product.produto === selectedProduct.nome)

    if(!productExists) {
      const updatedProducts = [
        ...products,
        {
          produto: selectedProduct.nome,
          quantidade: productAmount,
          valor_unitario: selectedProduct.preco_unitario,
          valor_total: selectedProduct.preco_unitario * productAmount
        }
      ]
    
      setCartProducts(updatedProducts)
      
      setSelectedProduct(null)
      setProductAmount(0)
      ref.current.value = 'defaultValue'
      
      return
    } 

    const updatedProducts = products.map(product => {
      if(product.produto === productExists.produto) return {
        ...product,
        quantidade: product.quantidade + productAmount,
        valor_total: product.valor_total + (selectedProduct.preco_unitario * productAmount)
      }

      return product
    })

    setCartProducts(updatedProducts)

    ref.current.value = 'defaultValue'
  
    setSelectedProduct(null)
    setProductAmount(0)

    return    
  }

  const handleRemoveProductFromCart = (itemIndex: number) => {
    const products = [...cartProducts]
    const updatedProducts = products.filter((_, index) => index !== itemIndex)

    setCartProducts(updatedProducts)
    
    return
  }

  const handleProductAmountInCart = (amount: 'increment' | 'decrement', index: number) => {    
    const products = [...cartProducts]
    const productInEstimate = products.find((_, i) => i === index)

    if(amount === 'decrement' && productInEstimate.quantidade <= 1) {
      const updatedProducts = products.filter((_, i) => i !== index)      

      setCartProducts(updatedProducts)

      return
    }
    
    const updatedProductsAmount = products.map((product, i) => {
      if(i !== index) return product      
      
      return {
        ...productInEstimate,
        quantidade: amount === 'increment' ? product.quantidade + 1: product.quantidade - 1,
        valor_total: amount === 'increment' ? product.valor_total + product.valor_unitario : product.valor_total - product.valor_unitario
      }
    })
     
    setCartProducts(updatedProductsAmount)

    return    
  }

  const canSubmit = !cartProducts?.length

  useEffect(() => {
    if(!cartProducts) return 
    
    const total = cartProducts.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
    
    setCartTotal(total)
  }, [cartProducts])

  return (
    <CartContext.Provider value={{
      selectedProduct,
      setSelectedProduct,
      productAmount,
      setProductAmount,
      cartProducts,
      setCartProducts,
      cartTotal,
      setCartTotal,  
      handleAddProductToCart,
      handleRemoveProductFromCart,
      handleProductAmountInCart,
      canSubmit,
    }}>
      {children}
    </CartContext.Provider>
  )
}

const useCartContext = () => useContext(CartContext)

export {   
  CartProvider,
  useCartContext
}
