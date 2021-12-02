import { ChangeEvent } from "react"

import { Select } from "../../../../../components/Select"
import { useProductsQuery } from "../../../../../hooks/useProductsQuery"

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
import { OrderItemProps, ProductProps } from "../../../../../types"

export type ProductsListProps = {  
  selectedProduct: ProductProps;
  setSelectedProduct: (selectedProduct: ProductProps) => void;
  productAmount: number;
  setProductAmount: (productAmount: number) => void;  
  orderProducts: OrderItemProps[];
  setOrderProducts: (orderProducts: OrderItemProps[]) => void;
  
  setOrderTotal: (total: number) => void;
}

const ProductsList = ({  
  selectedProduct,
  setSelectedProduct,
  productAmount,
  setProductAmount,
  orderProducts, 
  setOrderProducts,  
  
  setOrderTotal, 
}: ProductsListProps) => {
  const products = useProductsQuery()

  const handleSelectProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    const product = products.data?.find(product => product.id === value)

    setSelectedProduct(product)    
  }

  const incrementProductAmount = () => setProductAmount(productAmount + 1)

  const decrementProductAmount = () => {
    if(productAmount <= 0) {
      return
    }

    setProductAmount(productAmount - 1)
  }  

  const getSumTotal = (order: OrderItemProps[]) => {
    return order.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
  }

  const handleAddItemToOrder = () => {    
    const currentOrderProducts = [...orderProducts]
    
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
    setProductAmount(0)

    const sumTotal = getSumTotal(updatedOrderProducts)
  
    setOrderTotal(sumTotal)
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
  ProductsList
}