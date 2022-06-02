import { useEffect } from "react"

import { 
  Thead, 
  Tr, 
  Th, 
  Td, 
  Tbody, 
  Button, 
  Flex, 
  Text, 
  Icon, 
  HStack, 
  TableProps,
  Stack, 
} from "@chakra-ui/react"

import { FiTrash2 } from "react-icons/fi"

import { Table } from "../Table"

import { 
  IncrementButton,
  DecrementButton,
  ProductsSelect,
  EmptyCartButton
} from "./components"

import { useCartContext } from "../../contexts/useCart"

import { handleFormatPrice } from "../../utils/handleFormatPrice"

type Props = TableProps & {
  isEditing?: boolean
  isSubmiting?: boolean;
}

export const Cart = ({ isEditing = true, isSubmiting = false, ...rest }: Props) => {
  const {
    cartProducts,
    setCartProducts,
    cartTotal,
    handleRemoveProductFromCart,
    handleProductAmountInCart,
    handleEmptyCart
  } = useCartContext()

  useEffect(() => {

    return () => setCartProducts([])
    
  }, [setCartProducts])

  return (
    <Stack spacing={6}>
      {isEditing && (
        <ProductsSelect isSubmiting={isSubmiting} />
      )}
      <Table variant="simple" {...rest}>
        <Thead>
          <Tr bgColor="gray.100">
            {isEditing && (
              <Th textAlign="center">Quantidade</Th>
            )}
            <Th minW="185px">Produto</Th>
            <Th minW="155px">Valor Unitário</Th>
            <Th minW="135px">Valor Total</Th>
            {isEditing && (
              <Th textAlign="center">Remover</Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          { cartProducts?.map((product, index) => {
            return (            
              <Tr key={index}>
                {isEditing && (
                  <Td p={0}>
                    <Flex flex="1" align="center" justify="center">
                      <DecrementButton
                        aria-label="decrement"
                        isDisabled={isSubmiting}
                        handleDecrement={() => handleProductAmountInCart('decrement', index)}                      
                      />
                      <Text px="2">{product.quantidade}</Text>
                      <IncrementButton 
                        aria-label="increment"
                        isDisabled={isSubmiting}
                        handleIncrement={() => handleProductAmountInCart('increment', index)}                      
                      />                      
                    </Flex>
                  </Td>
                )}
                <Td py="2">{product.produto}</Td>
                <Td py="2">{handleFormatPrice(product.valor_unitario)}</Td>
                <Td py="2">{handleFormatPrice(product.valor_total)}</Td>
                {isEditing && (
                  <Td py="2" textAlign="center" p="0">
                    <Button
                      onClick={() => handleRemoveProductFromCart(index)}
                      isDisabled={isSubmiting}
                      bgColor="transparent"
                      _hover={{ svg: { color: 'blue.500' } }}
                    >
                      <Icon as={FiTrash2} fontSize={18}/>
                    </Button>
                  </Td>
                )}
              </Tr>                    
            )
          })}
          <Tr bgColor="gray.100">
            <Td colSpan={5} py={3}>
              <HStack spacing={6} justify="space-between" px={4}>
                <strong>Total do pedido: </strong> 
                <strong>{handleFormatPrice(cartTotal)}</strong> 
              </HStack>                    
            </Td>                  
          </Tr>
        </Tbody>
      </Table>

      {(isEditing && cartProducts?.length) && (        
        <EmptyCartButton isDisabled={isSubmiting} handleEmptyCart={handleEmptyCart}/>
      )}

    </Stack>
  )
}
