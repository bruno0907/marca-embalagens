import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useForm, SubmitHandler } from 'react-hook-form'

import { handleFormatPrice } from '../../../../../utils/handleFormatPrice'

import { Divider } from '../../../../../components/Divider'
import { Input } from '../../../../../components/Input'
import { Select } from '../../../../../components/Select'

import { useAuth } from '../../../../../hooks/useAuth'
import { useUsersQuery } from '../../../../../hooks/useUsersQuery'
import { useProductsQuery } from '../../../../../hooks/useProductsQuery'
import { useUserQuery } from '../../../../../hooks/useUserQuery'
import { useAddressQuery } from '../../../../../hooks/useAddressQuery'
import { useProductQuery } from '../../../../../hooks/useProductQuery'

import { useOrdersQuery } from '../../../../../hooks/useOrdersQuery'

import { useCreateOrderMutation } from '../../../../../hooks/useCreateOrderMutation'

import { 
  Text,
  Button,
  Stack,
  HStack,
  Box,
  Center,
  Spinner,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Flex,
  useToast,
  FormControl,
  FormLabel,  
  Input as ChakraInput,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,  
} from '@chakra-ui/react'

import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
 
import { OrderItemProps, NewOrderProps } from '../../../../../types'

const newOrderSchema = yup.object().shape({
  condicao_pagamento: yup.string().trim(),     
  data_entrega: yup.string().required('A data da entrega é obrigatória').trim(),
})

const CreateOrderForm = () => {
  const { session } = useAuth()  
  const toast = useToast()  
  const router = useRouter()  

  const [selectedUser, setSelectedUser] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')  
  const [selectedProduct, setSelectedProduct] = useState('')
  
  const [productAmount, setProductAmount] = useState(0)
  
  const [orderProducts, setOrderProducts] = useState<OrderItemProps[]>([])
  const [orderTotal, setOrderTotal] = useState(0)

  const { handleSubmit, register, formState } = useForm<NewOrderProps>({
    resolver: yupResolver(newOrderSchema)
  })

  const { errors, isSubmitting } = formState
  
  const users = useUsersQuery()
  const user = useUserQuery(selectedUser)
  
  const address = useAddressQuery(selectedAddress)

  const products = useProductsQuery()
  const product = useProductQuery(selectedProduct)

  const orders = useOrdersQuery()

  const createOrderMutation = useCreateOrderMutation()

  const getSumTotal = (order: OrderItemProps[]) => {
    return order.reduce((acc, value) => {      
      return acc + value.valor_total
    }, 0)
  }

  const handleSelectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedAddress('')
    setSelectedUser(value)
  }

  const handleSelectAddress = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedAddress(value)
  }

  const handleSelectProduct = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setSelectedProduct(value)
  }

  const handleAddItemToOrder = () => {
    const currentOrderProducts = [...orderProducts]
    
    const newOrderProducts = {
      produto: product.data.data.nome,
      quantidade: productAmount,
      valor_unitario: product.data.data.preco_unitario,
      valor_total: product.data.data.preco_unitario * productAmount
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

  const handleRemoveItemFromOrder = (itemIndex: number) => {
    const currentOrderProducts = [...orderProducts]

    const updatedOrderProducts = currentOrderProducts.filter((_, index) => index !== itemIndex)

    setOrderProducts(updatedOrderProducts)
    
    const sumTotal = getSumTotal(updatedOrderProducts)
  
    setOrderTotal(sumTotal)
  }

  const handleAddProductAmount = () => {
    setProductAmount(prev => prev + 1)
  }

  const handleSubProductAmount = () => {
    if(productAmount <= 0) {
      return
    }

    setProductAmount(prev => prev - 1)
  }  

  const canAddProduct = !Boolean(product.data?.data && productAmount > 0)
  const canSubmitOrder = user.data?.user && Boolean(orderProducts.length <= 0)  

  const ordersAmount = orders.data?.length

  const handleCreateNewOrderMutation: SubmitHandler<NewOrderProps> = async values => {
    const { data_entrega, condicao_pagamento } = values

    const newOrder: NewOrderProps = {
      user_id: session.user.id,
      numero_pedido: ordersAmount + 1,
      cliente: user.data.user.id,
      endereco_entrega: address.data.data.id,
      pedido: [...orderProducts],
      total: orderTotal,
      condicao_pagamento,
      data_entrega
    }

    try {
      const response = await createOrderMutation.mutateAsync(newOrder)

      toast({
        description: 'Pedido criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
      })

      router.push(`/orders/${response[0].id}`)

    } catch (error) {
      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      })

    }
  }

  const handleCancelOrder = () => router.push('/orders')

  if(users.isLoading || products.isLoading || orders.isLoading) {
    return (
      <Center>
        <Spinner size="md" color="blue.500" />
      </Center>
    )
  }

  return (
    <Box as="form" onSubmit={handleSubmit(handleCreateNewOrderMutation)}>
      <Stack spacing={3}>
        <Select 
          name="cliente"
          label="Cliente:"    
          isLoading={user.isLoading}                   
          onChange={handleSelectUser}
          defaultValue="defaultValue"
        >
          <option value="defaultValue" disabled>Selecione o cliente...</option>   

          { users.data.map(user => {
            return (
              <option key={user.id} value={user.id}>{user.nome}</option>
              )
            })
          }         

        </Select>

        { !user.data?.user ? null : user.isError ? (
          <Text my="8">Erro ao carregar os dados do usuário...</Text>
        ) : (
          <Stack spacing={3}>      
            { user.data.user.natureza_cliente === 'Jurídica' &&
              <Input 
                label="Razão Social:"
                name="razao_social"
                isDisabled
                defaultValue={user.data.user.razao_social}
              />
            }

            <HStack spacing={3}>
              <Input 
                name="cpf_cnpj"
                label={user.data.user.natureza_cliente === 'Física' ? 'CPF' : 'CNPJ:'}
                defaultValue={user.data.user.cpf_cnpj}
                isDisabled
              />
              <Input 
                name="rg_ie"
                label={user.data.user.natureza_cliente === 'Física' ? 'RG' : 'IE:'}
                isDisabled
                defaultValue={user.data.user.cpf_cnpj}
              />
              <Input
                name="contato"
                label="Contato:"
                isDisabled
                defaultValue={user.data.user.contato}
              />
            </HStack>

            <HStack spacing={3}>
              <Input 
                name="telefone"
                label="Telefone:"
                isDisabled
                defaultValue={user.data.user.telefone}
              />
              <Input
                name="celular"
                label="Celular:"
                isDisabled
                defaultValue={user.data.user.celular}
              />
              <Input
                name="email"
                label="E-mail:"
                isDisabled
                defaultValue={user.data.user.email}
              />
            </HStack>

            <Select
              label="Endereço:"
              name="endereco"
              defaultValue="defaultValue"
              isLoading={address.isLoading}
              onChange={handleSelectAddress}
            >
              <option value="defaultValue">Selecione o endereço de entrega...</option>
              { user.data?.addresses.map(address => {
                return (
                  <option key={address.id} value={address.id}>{address.endereco}</option>
                )
              })}
            </Select>

            { !address.data?.data ? null : (
              <Stack spacing={3}>
                <HStack spacing={3}>
                  <Input 
                    name="cidade"
                    label="Cidade:"
                    isDisabled
                    defaultValue={address.data.data.cidade}
                  />
                  <Box w="100px">
                    <Input 
                      name="estado"
                      label="Estado:"
                      isDisabled
                      defaultValue={address.data.data.estado}
                    />
                  </Box>
                </HStack>
                <HStack spacing={3}>
                  <Input 
                    name="bairro"
                    label="Bairro:"
                    isDisabled
                    defaultValue={address.data.data.bairro}
                  />
                  <Input 
                    name="cep"
                    label="CEP:"
                    isDisabled
                    defaultValue={address.data.data.cep}
                  />
                </HStack>

                { address.data.data.complemento && 
                  <Input 
                    name="complemento"
                    label="Complemento"
                    isDisabled
                    defaultValue={address.data.data.complemento}
                  />
                }

                <HStack spacing={3}>
                  <Input 
                    name="condicao_pagamento"
                    label="Condição de pagamento:"
                    {...register('condicao_pagamento')}
                  />
                  <Box w="380px">
                    <Input 
                      type="date"
                      name="data_entrega"
                      label="Data de entrega:"
                      error={errors.data_entrega}
                      {...register('data_entrega')}
                    />
                  </Box>
                </HStack>
              </Stack>
            )}
          )
          </Stack>
        )}

      </Stack>

      <Divider />

      { address.data?.data && 
        <Stack spacing={6}>
          <HStack spacing={3} align="flex-end">            
            <Select
              label="Produto"
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
                  disabled={!selectedProduct}
                  cursor={!selectedProduct ? 'not-allowed' : 'pointer'}
                  onClick={handleSubProductAmount}
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
                  onClick={handleAddProductAmount}
                > 
                  <FiPlus  color="#080808"/>
                </InputRightAddon>
              </InputGroup>
            </FormControl>
            <Button 
              colorScheme="blue"
              onClick={handleAddItemToOrder}
              isDisabled={canAddProduct}
            >Adicionar</Button>
          </HStack>            

          <Table colorScheme="gray" variant="striped">
            <Thead>
              <Tr bgColor="blue.500">
                <Th color="gray.50" w="10" textAlign="center">Qtd</Th>
                <Th color="gray.50">Produto</Th>
                <Th color="gray.50" w="30" textAlign="end">Valor Unitário</Th>
                <Th color="gray.50" w="30" textAlign="end">Valor Total</Th>
                <Th color="gray.50" textAlign="center">Remover</Th>
              </Tr>
            </Thead>
            <Tbody>
              { orderProducts.map((orderProduct, index) => {
                return (
                  <Tr key={index}>
                    <Td textAlign="center">{orderProduct.quantidade}</Td>
                    <Td>{orderProduct.produto}</Td>
                    <Td textAlign="end">{handleFormatPrice(orderProduct.valor_unitario)}</Td>
                    <Td textAlign="end">{handleFormatPrice(orderProduct.valor_total)}</Td>
                    <Td textAlign="center" p="0">
                      <Button 
                        w="100%"
                        variant="unstyled"
                        display="flex"
                        alignItems="center"
                        justifyContent="center" 
                        onClick={() => handleRemoveItemFromOrder(index)}
                        _hover={{ svg: { color: 'blue.500' }}}
                      >
                        <FiTrash2 />
                      </Button>
                    </Td>
                  </Tr>                    
                )
              })}
              <Tr>
                <Td colSpan={5}>
                  <Flex justify="space-between">
                    <strong>Total do pedido: </strong> 
                    <strong>{handleFormatPrice(orderTotal)}</strong> 
                  </Flex>                    
                </Td>                  
              </Tr>
            </Tbody>
          </Table>

          <HStack spacing={3} justify="flex-end">
            <Button 
              variant="ghost" 
              onClick={handleCancelOrder} 
              isDisabled={Boolean(orderProducts.length <= 0)}
            >Cancelar</Button>
            <Button 
              type="submit"
              colorScheme="blue" 
              isDisabled={canSubmitOrder}
              isLoading={isSubmitting}
            >Gerar pedido</Button>
          </HStack>
          
          
        </Stack> 
      }
    </Box>
  )
}

export { 
  CreateOrderForm
}