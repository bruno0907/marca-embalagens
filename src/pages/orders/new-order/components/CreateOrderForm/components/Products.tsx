import { ChangeEvent, useEffect, useRef } from "react"

import { Select } from "../../../../../../components/Select"
import { useProductsQuery } from "../../../../../../hooks/useProductsQuery"
import { useCreateOrder } from "../../../hooks/useCreateOrder"

import { 
  HStack, 
  FormControl, 
  FormLabel, 
  InputGroup, 
  InputLeftAddon, 
  Input as ChakraInput,
  InputRightAddon,
  Button,
  Text,
  Spinner
} from "@chakra-ui/react"

import { FiMinus, FiPlus } from "react-icons/fi"
import { OrderItemProps } from "../../../../../../types"

const Products = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    productAmount,
    setProductAmount,
    // handleAddItemToOrder
    orderProducts,
    setOrderProducts,
    setOrderTotal,
  } = useCreateOrder()

  const products = useProductsQuery()

  const ref = useRef<HTMLSelectElement>(null)

  const handleSelectProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    const product = products.data?.find(product => product.id === value)

    setSelectedProduct(product)    
  }

  const incrementProductAmount = () => setProductAmount(prevState => prevState + 1)

  const decrementProductAmount = () => {
    if(productAmount <= 0) return

    setProductAmount(prevState => prevState - 1)
  }  

  const handleAddItemToOrder = () => {    
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
  
      const total = getSumTotal(updatedOrderProducts)
    
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

    const total = getSumTotal(updatedProducts)

    setOrderTotal(total)
  
    setSelectedProduct(null)
    setProductAmount(0)

    return

  }

  const getSumTotal = (order: OrderItemProps[]) => {
    return order.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
  }
  
  const canAddProduct = selectedProduct && productAmount > 0    

  if(products.isLoading) {
    return (      
      <HStack spacing={2} align="center">
        <Text fontWeight="medium">Produto:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>        
    )
  }

  if(products.isError) {    
    return (
      <Text pt="4" fontWeight="medium">
        Ocorreu um erro ao carregar os produtos...
      </Text>
    )
  }

  return (
    <HStack spacing={3} align="flex-end">            
      <Select
        label="Produto:"
        name="produto"
        defaultValue="defaultValue"
        onChange={handleSelectProduct}
        ref={ref}
      >
        <option value="defaultValue" disabled>Selecione um produto...</option>
        { products.data.map(product => {
          return (
            <option 
              key={product.id}
              value={product.id}
            >
              {product.nome}
            </option>
          )
        }) }
      </Select>
      <FormControl w="250px">
        <FormLabel>Quantidade</FormLabel>
        <InputGroup>              
          <InputLeftAddon 
            as="button"
            type="button"
            disabled={!canAddProduct}
            cursor={!canAddProduct ? 'not-allowed' : 'pointer'}
            onClick={decrementProductAmount}
          >
            <FiMinus color="#080808"/>
          </InputLeftAddon>
          <ChakraInput
            textAlign="center"
            name="quantidade"
            type="number"                  
            value={productAmount}
            disabled={!selectedProduct}
            onChange={event => setProductAmount(Number(event.target.value))}
          />
          <InputRightAddon 
            as="button"
            type="button"
            disabled={!selectedProduct}
            cursor={!selectedProduct ? 'not-allowed' : 'pointer'}
            onClick={incrementProductAmount}
          > 
            <FiPlus  color="#080808"/>
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <Button 
        colorScheme="blue"
        onClick={handleAddItemToOrder}
        isDisabled={!canAddProduct}
      >Adicionar</Button>
    </HStack>
  )
}

export {
  Products
}
