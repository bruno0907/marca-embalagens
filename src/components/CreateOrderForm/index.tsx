import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

import { Divider } from '../Divider'
import { Input } from '../Input'
import { Select } from '../Select'

import { useAuth } from '../../hooks/useAuth'
import { useUsersQuery } from '../../hooks/useUsersQuery'
import { useProductsQuery } from '../../hooks/useProductsQuery'
import { useAddressesQuery } from '../../hooks/useAddressesQuery'
import { useUserQuery } from '../../hooks/useUserQuery'
import { useAddressQuery } from '../../hooks/useAddressQuery'
import { useProductQuery } from '../../hooks/useProductQuery'

import { useOrdersQuery } from '../../hooks/useOrdersQuery'

import { useCreateOrderMutation } from '../../hooks/useCreateOrderMutation'

import { 
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
  useToast
} from '@chakra-ui/react'

import { FiTrash2 } from 'react-icons/fi'
 
import { OrderItemProps, NewOrderProps } from '../../types'

const CreateOrderForm = () => {
  const { session } = useAuth()
  
  const toast = useToast()
  
  const router = useRouter()

  const [selectedUser, setSelectedUser] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')  
  const [selectedProduct, setSelectedProduct] = useState('')
  const [condicaoPagamento, setCondicaoPagamento] = useState('')
  const [dataEntrega, setDataEntrega] = useState('')

  const [productAmount, setProductAmount] = useState(0)
  
  const [order, setOrder] = useState<OrderItemProps[]>([])  
  const [total, setTotal] = useState(0)
  
  const users = useUsersQuery()
  const user = useUserQuery(selectedUser)

  const addresses = useAddressesQuery(selectedUser)
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

  const handleAddItemToOrder = () => {
    const currentOrder = [...order]
    
    const newOrder = {
      produto: product.data.data.nome,
      quantidade: productAmount,
      valor_unitario: product.data.data.preco_unitario,
      valor_total: product.data.data.preco_unitario * productAmount
    }    

    const updatedOrder = [
      ...currentOrder,
      newOrder
    ]

    setOrder(updatedOrder)

    const sumTotal = getSumTotal(updatedOrder)
  
    setTotal(sumTotal)
  }  

  const handleRemoveItemFromOrder = (itemIndex: number) => {
    const currentOrder = [...order]

    const updatedOrder = currentOrder.filter((_, index) => index !== itemIndex)

    setOrder(updatedOrder)
    
    const sumTotal = getSumTotal(updatedOrder)
  
    setTotal(sumTotal)
  }

  const canAddProduct = !Boolean(product.data?.data && productAmount > 0)
  const canSubmitOrder = user.data?.data && Boolean(order.length <= 0)  

  const ordersAmount = orders.data?.length

  const handleCreateNewOrderMutation = async (event: FormEvent) => {
    event.preventDefault()

    const newOrder: NewOrderProps = {
      user_id: session.user.id,
      numero_pedido: ordersAmount + 1,
      cliente: user.data.data.id,
      endereco_entrega: address.data.data.id,
      pedido: [...order],
      total,
      condicao_pagamento: condicaoPagamento,
      data_entrega: dataEntrega
    }

    try {
      const response = await createOrderMutation.mutateAsync(newOrder)

      toast({
        description: 'Pedido criado com sucesso!',
        status: 'success',
        isClosable: true,
        duration: 3000,
      })

      // To Do: Add print order here
  
      router.push('/orders')

      console.log(response)

    } catch (error) {

      toast({        
        title: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

    }
  }

  const handleCancelOrder = () => console.log('Cancelar pedido')

  if(users.isLoading || products.isLoading || orders.isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="md" color="blue.500" />
      </Center>
    )
  }
  return (
    <>
      <Stack spacing={3} as="form" onSubmit={handleCreateNewOrderMutation}>
        <Select 
          name="cliente"
          label="Cliente:"                       
          onChange={event => setSelectedUser(event.target.value)}
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

        { user.isLoading || !user.data.data ? null : (
          <Stack spacing={3}>      
            { user.data.data.natureza_cliente === 'Jurídica' &&
              <Input 
                label="Razão Social:"
                name="razao_social"
                isDisabled
                defaultValue={user.data.data.razao_social}
              />
            }

            <HStack spacing={3}>
              <Input 
                name="cpf_cnpj"
                label={user.data.data.natureza_cliente === 'Física' ? 'CPF' : 'CNPJ:'}
                defaultValue={user.data.data.cpf_cnpj}
                isDisabled
              />
              <Input 
                name="rg_ie"
                label={user.data.data.natureza_cliente === 'Física' ? 'RG' : 'IE:'}
                isDisabled
                defaultValue={user.data.data.cpf_cnpj}
              />
              <Input
                name="contato"
                label="Contato:"
                isDisabled
                defaultValue={user.data.data.contato}
              />
            </HStack>

            <HStack spacing={3}>
              <Input 
                name="telefone"
                label="Telefone:"
                isDisabled
                defaultValue={user.data.data.telefone}
              />
              <Input
                name="celular"
                label="Celular:"
                isDisabled
                defaultValue={user.data.data.celular}
              />
              <Input
                name="email"
                label="E-mail:"
                isDisabled
                defaultValue={user.data.data.email}
              />
            </HStack>

            { addresses.isLoading || !addresses.data.data ? null : (
              <Select
                label="Endereço:"
                name="enderecos"
                defaultValue="defaultValue"
                onChange={event => setSelectedAddress(event.target.value)}
              >
                <option value="defaultValue">Selecione o endereço de entrega...</option>
                { addresses.data?.data.map(address => {
                  return (
                    <option key={address.id} value={address.id}>{address.endereco}</option>
                  )
                })}
              </Select>
            )}
            { address.isLoading || !address.data.data ? null : (
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
                    value={condicaoPagamento}
                    onChange={event => setCondicaoPagamento(event.target.value)}
                  />
                  <Box w="380px">
                    <Input 
                      type="date"
                      name="data_entrega"
                      label="Data de entrega:"
                      value={dataEntrega}
                      onChange={event => setDataEntrega(event.target.value)}
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

      <Stack spacing={6}>
        <HStack spacing={3} align="flex-end">            
          <Select
            label="Produto"
            name="produto"
            defaultValue="defaultValue"
            onChange={event => setSelectedProduct(event.target.value)}
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
          <Box w="80px">
            <Input 
              label="Qtd"
              name="quantidade"
              type="number"
              value={productAmount}
              onChange={event => setProductAmount(Number(event.target.value))}
            />
          </Box>
          <Button 
            colorScheme="blue" 
            // size="lg" 
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
            { order.map((o, index) => {
              return (
                <Tr key={index}>
                  <Td textAlign="center">{o.quantidade}</Td>
                  <Td>{o.produto}</Td>
                  <Td textAlign="end">{o.valor_unitario.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</Td>
                  <Td textAlign="end">{o.valor_total.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</Td>
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
                  <strong>{total.toLocaleString('pt-BR', { currency: 'BRL', style: 'currency' })}</strong> 
                </Flex>                    
              </Td>                  
            </Tr>
          </Tbody>
        </Table>

        <HStack spacing={3} justify="flex-end">
          <Button 
            variant="ghost" 
            onClick={handleCancelOrder} 
            isDisabled={Boolean(order.length <= 0)}
          >Cancelar</Button>
          <Button 
            colorScheme="blue" 
            onClick={handleCreateNewOrderMutation} 
            isDisabled={canSubmitOrder}
          >Gerar pedido</Button>
        </HStack>
        
      </Stack> 
    </>
  )
}

export { 
  CreateOrderForm
}