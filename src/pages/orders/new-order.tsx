import { useState } from 'react'
import { useRouter } from 'next/router'

import Head from 'next/head'

import { Header } from '../../components/Header'
import { Layout } from '../../components/Layout'
import { Divider } from '../../components/Divider'
import { Content } from '../../components/Content'
import { Input } from '../../components/Input'
import { Select } from '../../components/Select'

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
  Heading,
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

import { OrderProps, OrderItemProps, NewOrderProps } from '../../types'

export default function NewOrder() {
  const { session } = useAuth()
  const user_id = session.user.id 
  
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

  const orderNumber = orders.data?.length

  const handleCreateNewOrderMutation = async () => {
    const newOrder: NewOrderProps = {
      user_id,
      numero_pedido: orderNumber + 1,
      cliente: user.data.data.id,
      endereco_entrega: address.data.data.id,
      pedido: [...order],
      total,
      condicao_pagamento: condicaoPagamento,
      data_entrega: dataEntrega
    }

    await createOrderMutation.mutateAsync(newOrder)

    toast({
      description: 'Pedido criado com sucesso!',
      status: 'success',
      isClosable: true,
      duration: 3000,
    })

    router.push('/orders')
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
      <Head>
        <title>MARCA | Novo pedido</title>        
      </Head>
      <Layout>
        
        <Header title="Novo pedido" withGoBack/>

        <Divider />

        <Content>
          <Stack spacing={3}>
            <Select 
              name="cliente"
              label="Cliente:"
              variant="flushed"                        
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
                    variant="flushed"
                    defaultValue={user.data.data.razao_social}
                  />
                }

                <HStack spacing={3}>
                  <Input 
                    name="cpf_cnpj"
                    label={user.data.data.natureza_cliente === 'Física' ? 'CPF' : 'CNPJ:'}
                    variant="flushed"
                    defaultValue={user.data.data.cpf_cnpj}
                  />
                  <Input 
                    name="rg_ie"
                    label={user.data.data.natureza_cliente === 'Física' ? 'RG' : 'IE:'}
                    variant="flushed"
                    defaultValue={user.data.data.cpf_cnpj}
                  />
                  <Input
                    name="contato"
                    label="Contato:" 
                    variant="flushed"
                    defaultValue={user.data.data.contato}
                  />
                </HStack>

                <HStack spacing={3}>
                  <Input 
                    name="telefone"
                    label="Telefone:"
                    variant="flushed"
                    defaultValue={user.data.data.telefone}
                  />
                  <Input
                    name="celular"
                    label="Celular:"
                    variant="flushed"
                    defaultValue={user.data.data.celular}
                  />
                  <Input
                    name="email"
                    label="E-mail:"
                    variant="flushed"
                    defaultValue={user.data.data.email}
                  />
                </HStack>

                { addresses.isLoading || !addresses.data.data ? null : (
                  <Select
                    label="Endereço:"
                    name="enderecos"
                    variant="flushed"
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
                        variant="flushed"
                        defaultValue={address.data.data.cidade}
                      />
                      <Box w="100px">
                        <Input 
                          name="estado"
                          label="Estado:"
                          variant="flushed"
                          defaultValue={address.data.data.estado}
                        />
                      </Box>
                    </HStack>
                    <HStack spacing={3}>
                      <Input 
                        name="bairro"
                        label="Bairro:"
                        variant="flushed"
                        defaultValue={address.data.data.bairro}
                      />
                      <Input 
                        name="cep"
                        label="CEP:"
                        defaultValue={address.data.data.cep}
                      />
                    </HStack>

                    { address.data.data.complemento && 
                      <Input 
                        name="complemento"
                        label="Complemento"
                        variant="flushed"
                        defaultValue={address.data.data.complemento}
                      />
                    }

                    <HStack spacing={3}>
                      <Input 
                        name="condicao_pagamento"
                        label="Condição de pagamento:"
                        variant="flushed"
                        value={condicaoPagamento}
                        onChange={event => setCondicaoPagamento(event.target.value)}
                      />
                      <Box w="380px">
                        <Input 
                          type="date"
                          name="data_entrega"
                          label="Data de entrega:"
                          variant="flushed"
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
                variant="flushed"
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
                  variant="flushed"
                  value={productAmount}
                  onChange={event => setProductAmount(Number(event.target.value))}
                />
              </Box>
              <Button 
                colorScheme="blue" 
                size="lg" 
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
                      <Td textAlign="center">
                        <Button variant="ghost" onClick={() => handleRemoveItemFromOrder(index)}>X</Button>
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
              <Button variant="ghost" onClick={handleCancelOrder}>Cancelar</Button>
              <Button colorScheme="blue" onClick={handleCreateNewOrderMutation}>Gerar pedido</Button>
            </HStack>
            
          </Stack>          

        </Content>
      </Layout> 
    </>   
  )
}