import { useRef } from 'react'
import { useRouter } from "next/router"
import Head from 'next/head'

import { useReactToPrint } from 'react-to-print'

import { useOrderQuery } from "../../hooks/useOrderQuery"

import { Logo } from '../../components/Logo'

import {   
  Flex,
  Box,
  Text,
  Icon,
  Button,
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  Center,
  Spinner
} from "@chakra-ui/react"

import { FiArrowLeft, FiPrinter } from 'react-icons/fi'
import { useProfileQuery } from '../../hooks/useProfileQuery'
import { useUserQuery } from '../../hooks/useUserQuery'
import { useAddressQuery } from '../../hooks/useAddressQuery'
import { handleFormatDate } from '../../utils/handleFormatDate'
import { Divider } from '../../components/Divider'
import { handleFormatPrice } from '../../utils/handleFormatPrice'

export default function Order() {
  const router = useRouter()
  const id = router.query.id

  const orderRef = useRef<HTMLDivElement>(null)

  const order = useOrderQuery(id)
  const profile = useProfileQuery()
  const user = useUserQuery(order.data?.data.cliente)
  const address = useAddressQuery(order.data?.data.endereco_entrega)
  
  const handleGoBack = () => router.push('/orders')

  const handlePrintOrder = useReactToPrint({
    content: () => orderRef.current
    })

  if(!order.data?.data) return null
  if(!profile.data?.data) return null
  if(!user.data?.user) return null
  if(!address.data?.data) return null

  return (
    <>
      <Head>
        <title>MARCA | Pedido: {order.data?.data.numero_pedido}</title>
      </Head>

      <Box maxW="1090px" m="auto" px="8">
        <Flex py="16" px="8" w="100%" align="center" justify="space-between">
          <Icon 
            mr="4"
            fontSize="32"
            as={FiArrowLeft} 
            onClick={handleGoBack} 
            cursor="pointer" 
            _hover={{ color: "blue.500" }}
          />
          <Text fontSize="xx-large" fontWeight="bold">Pedido: {order.data?.data.numero_pedido}</Text>
          <Button 
            colorScheme="blue" 
            rightIcon={<FiPrinter />}
            onClick={handlePrintOrder}
            >Imprimir</Button>
        </Flex>

        <Box p="8" bgColor="gray.50" boxShadow="md" borderRadius="md">

          {
            !order.data.data ||
            !profile.data.data ||
            !user.data.user ||
            !address.data.data ? (
              <Center py="16">
                <Spinner size="md" color="blue.500" />
              </Center>
            ) : (
              <Box ref={orderRef} p="8">                
                <Flex justify="space-between" w="100%">
                  <Flex h="20" w="40" align="center">
                    <Logo />
                  </Flex>
                  <Flex flexDir="column" mx="4">
                    {profile.data.data.razao_social &&
                      <Text fontSize="x-small">{profile.data.data.razao_social}</Text>
                    }
                    <Text fontSize="x-small">{profile.data.data.nome}</Text>
                    <Text fontSize="x-small">
                      { profile.data.data.telefone && `${profile.data.data.telefone} / `}
                      { profile.data.data.celular }
                    </Text>
                    <Box>
                      <Text fontSize="x-small">
                        {profile.data.address.endereco} - {profile.data.address.bairro}
                      </Text>
                      <Text fontSize="x-small">
                        {profile.data.address.cidade}/{profile.data.address.estado} 
                        {profile.data.address.cep && `- ${profile.data.address.cep}`}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex flexDir="column" justify="center">
                    <Flex align="center">
                      <Text mr="2">Número do pedido:</Text>
                      <Text fontSize="large" fontWeight="bold">
                        {order.data.data.numero_pedido}
                      </Text>            
                    </Flex>
                    <Flex align="center">
                      <Text mr="2">Data de entrega:</Text>
                      <Text fontSize="large" fontWeight="bold">
                        {handleFormatDate(order.data.data.data_entrega)}
                      </Text>            
                    </Flex>
                  </Flex>
                </Flex>

                <Divider/>

                <Flex flexDir="column">
                  <Flex justify="space-between">
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
                      <Text fontSize="sm">{user.data.user.nome}</Text>            
                    </Box>
                    { user.data.user.razao_social &&
                        <Box>
                          <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                          <Text fontSize="sm">{user.data.user.razao_social}</Text>
                        </Box>
                    }
                    { user.data.user.cpf_cnpj &&
                        <Box>
                          <Text fontSize="x-small" fontWeight="semibold">
                            {user.data.user.razao_social ? 'CNPJ' : 'CPF'}
                          </Text>
                          <Text fontSize="sm">
                            {user.data.user.cpf_cnpj}
                          </Text>
                        </Box>
                    }
                  </Flex>
                  <Flex justify="space-between">
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
                      <Text fontSize="sm">
                        {user.data.user.telefone}
                      </Text>            
                    </Box>
                    { user.data.user.celular && 
                      <Box>
                        <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                        <Text fontSize="sm">
                          {user.data.user.celular}
                        </Text>            
                      </Box>
                    }
                    { user.data.user.contato && 
                      <Box>
                        <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                        <Text fontSize="sm">
                          {user.data.user.contato}
                        </Text>            
                      </Box>
                    }
                  </Flex>
                </Flex>

                <Flex justify="space-between">
                  <Box>
                    <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
                    <Text fontSize="sm">
                      {address.data.data.endereco}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
                    <Text fontSize="sm">
                      {address.data.data.bairro}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
                    <Text fontSize="sm">
                      {address.data.data.cep}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="x-small" fontWeight="bold">Cidade/UF:</Text>
                    <Text fontSize="sm">
                      {address.data.data.cidade}/{address.data.data.estado}
                    </Text>
                  </Box>
                </Flex>

                <Flex mt="4" align="center">
                  <Text fontSize="sm" fontWeight="bold" mr="2">Condição de pagamento:</Text>
                  <Text>
                    {order.data.data.condicao_pagamento}
                  </Text>
                </Flex>

                <Divider/>

                <Table variant="striped" size="sm">
                  <Thead>
                    <Tr>
                      <Th w="10">Qtd</Th>
                      <Th>Produto</Th>
                      <Th w="36">Valor unitário</Th>
                      <Th w="30">Valor Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    { order.data.data.pedido.map(orderItem => {
                      return (
                        <Tr key={orderItem.produto}>
                          <Td>{orderItem.quantidade}</Td>
                          <Td>{orderItem.produto}</Td>
                          <Td>{handleFormatPrice(orderItem.valor_unitario)}</Td>
                          <Td>{handleFormatPrice(orderItem.valor_total)}</Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>

                <Divider/>

                <Text fontWeight="bold" fontSize="large" textAlign="end">
                  Total do pedido: {handleFormatPrice(order.data.data.total)}
                </Text>
              </Box>
            )
          }

        </Box>
      </Box>
    </>
  )
}