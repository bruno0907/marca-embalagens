import { ChangeEvent, useRef } from "react"

import { 
  Stack,
  HStack, 
  FormControl, 
  FormLabel, 
  InputGroup, 
  InputLeftAddon, 
  Input as ChakraInput,
  InputRightAddon,
  Text,
  Spinner,
  Icon,
} from "@chakra-ui/react"

import { FiAlertCircle, FiMinus, FiPlus } from "react-icons/fi"

import { Select } from "../../../Select"
import { ButtonPrimary } from "../../../ButtonPrimary"

import { useProductsQuery } from "../../../../hooks/useProductsQuery"
import { useCartContext } from "../../../../contexts/useCart"

type Props = {
  isSubmiting: boolean;
}

export const ProductsSelect = ({ isSubmiting = false }: Props) => {
  const {
    selectedProduct,
    setSelectedProduct,
    productAmount,
    setProductAmount,
    handleAddProductToCart
  } = useCartContext()

  const { data: products, isLoading, isError, isFetching } = useProductsQuery()

  const selecteRef = useRef<HTMLSelectElement>(null)

  const handleSelectProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target

    const product = products?.find(product => product.id === value)

    setSelectedProduct(product)    
  }

  const incrementProductAmount = () => setProductAmount(prevState => prevState + 1)

  const decrementProductAmount = () => {
    if(productAmount <= 0) return

    setProductAmount(prevState => prevState - 1)
  }
  
  const canAddProduct = selectedProduct && productAmount > 0    

  if(isLoading) {
    return (
      <HStack spacing={2} align="center">
        <Text fontWeight="medium" fontSize="md">Produtos:</Text> 
        <Spinner ml="2" size="sm" color="blue.500"/>
      </HStack>
    )
  }

  if(isError) {
    return (
      <HStack spacing={3} aling="center">
        <Icon as={FiAlertCircle} fontSize={16} color="red.500"/>
        <Text fontWeight="medium">Erro ao carregar a lista de produtos...</Text>
      </HStack>
    )
  }

  return (
    <Stack direction={['column', 'column', 'row']} spacing={6} flex="1">      
      <Stack spacing={[4, 4, 6]} direction={['column', 'row', 'row']} flex="1">
        <Select          
          label="Produto:"
          name="produto"          
          isLoading={isFetching}
          isDisabled={isSubmiting}
          defaultValue="defaultValue"
          onChange={handleSelectProduct}
          ref={selecteRef}
        >
          <option value="defaultValue" disabled aria-readonly>
            Selecione um produto...
          </option>
          {products.map(product => {
            return (
              <option key={product.id} value={product.id}>{product.nome}</option>
            )
          })}
        </Select>      
        <FormControl w={['100%', '60', '64']}>
          <FormLabel fontSize={['sm', 'initial', 'initial']}>Quantidade:</FormLabel>
          <InputGroup>              
            <InputLeftAddon 
              as="button"
              type="button"
              fontSize={['sm', 'initial', 'initial']}
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
              fontSize={['sm', 'initial', 'initial']}            
              value={productAmount}
              disabled={!selectedProduct}
              onChange={event => setProductAmount(Number(event.target.value))}
            />
            <InputRightAddon 
              as="button"
              type="button"
              fontSize={['sm', 'initial', 'initial']}
              disabled={!selectedProduct}
              cursor={!selectedProduct ? 'not-allowed' : 'pointer'}
              onClick={incrementProductAmount}
            > 
              <FiPlus  color="#080808"/>
            </InputRightAddon>
          </InputGroup>
        </FormControl>        
      </Stack>
      <ButtonPrimary        
        alignSelf={['initial', 'initial', 'flex-end']}
        onClick={() => handleAddProductToCart(selecteRef)}
        isDisabled={!canAddProduct}
      >Adicionar</ButtonPrimary>        
    </Stack>
  )
}

