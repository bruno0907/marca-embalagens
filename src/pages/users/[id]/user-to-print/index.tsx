import Head from "next/head"

import { useRef } from "react"
import { useRouter } from "next/router"

import { useReactToPrint } from "react-to-print"

import { Divider } from "../../../../components/Layout/Divider"
import { Content } from "../../../../components/Layout/Content"
import { Header } from "../../../../components/Header"

import { useUserQuery } from "../../../../hooks/useUserQuery"
import { useAddressesQuery } from "../../../../hooks/useAddressesQuery"
import { useUserOrdersQuery } from "../../../../hooks/useUserOrdersQuery"

import { handleFormatDate } from "../../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../../utils/handleFormatPrice"

import { 
  Box,  
  VStack,
  HStack,
  Heading,
  Text,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Button,  
  Center,
  Spinner
} from "@chakra-ui/react"

import { FiPrinter } from "react-icons/fi"

export default function UserToPrint() {
  const router = useRouter()
  const userId = router.query.id

  const ref = useRef<HTMLDivElement>(null)

  const user = useUserQuery(String(userId))
  const addresses = useAddressesQuery(String(userId))
  const orders = useUserOrdersQuery(String(userId))  

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => router.push('/users')
  })

  return (
    <>
      <Head>
        <title>Imprimir ficha do cliente: {user.data?.nome} | MARCA</title>
      </Head>

      <Box maxW="1090px" margin="auto" px="8">
        <Header withGoBack py="16" title={user.data?.nome}>          
          { !orders.isFetching &&
            <Button
              leftIcon={<FiPrinter />}
              onClick={handlePrint}
              colorScheme="blue"
            >Imprimir</Button>
          }        
        </Header>
        
        <Content p="0">
          <Box ref={ref} p="8">
            <Heading fontSize="lg" mb="4">Dados Cadastrais</Heading>

            { !user.data ? null 
              : user.isLoading || user.isFetching ? (
                  <Center>
                    <Spinner color="blue.500"/>
                  </Center>
                )
              : user.isError ? (
                  <Text>Erro ao carregar os dados do cliente...</Text>
                )
              : (
                <VStack spacing={3} align="start" borderWidth="1px" borderRadius="md" p="4">
                  <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
                      <Text fontSize="sm">{user.data?.nome}</Text>            
                    </Box>
                    { user.data?.razao_social && (
                      <Box>
                        <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                        <Text fontSize="sm">{user.data?.razao_social}</Text>
                      </Box>
                    )}
                    { user.data?.cpf_cnpj && (
                      <Box>
                        <Text fontSize="x-small" fontWeight="semibold">
                          {user.data?.razao_social ? 'CNPJ' : 'CPF'}
                        </Text>
                        <Text fontSize="sm">
                          {user.data?.cpf_cnpj}
                        </Text>
                      </Box>
                    )}
                  </HStack>
                  <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
                      <Text fontSize="sm">
                        {user.data?.telefone}
                      </Text>            
                    </Box>
                    { user.data?.celular && (
                        <Box>
                          <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                          <Text fontSize="sm">
                            {user.data?.celular}
                          </Text>            
                        </Box>
                    )}
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">E-mail:</Text>
                      <Text fontSize="sm">
                        {user.data?.email}
                      </Text>            
                    </Box>
                    { user.data?.contato && (
                        <Box>
                          <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                          <Text fontSize="sm">
                            {user.data?.contato}
                          </Text>            
                        </Box>
                    )}
                  </HStack>
              </VStack>
            )}

            <Divider/>

            <Heading fontSize="lg" mb="4">Endereços</Heading>

            { !addresses.data ? null 
              : addresses.isLoading || addresses.isFetching ? (
                  <Center>
                    <Spinner color="blue.500"/>
                  </Center>
                )
              : addresses.isError ? (
                  <Text>Erro ao carregar os endereços do cliente;;;</Text>
                )
              : (
                <VStack spacing={3} align="start">
                  { addresses.data?.map(address => {
                    return (  
                      <Box 
                        key={address.id} 
                        w="100%"
                        borderWidth="1px" 
                        borderRadius="md" 
                        p="4"
                      >
                        <HStack 
                          w="100%" 
                          spacing={3}                          
                          align="flex-start" 
                          justify="space-between"
                        >
                          <Box>
                            <Text fontSize="x-small" fontWeight="bold">Endereço:</Text>
                            <Text fontSize="sm">
                              {address.endereco}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="x-small" fontWeight="bold">Bairro:</Text>
                            <Text fontSize="sm">
                              {address.bairro}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="x-small" fontWeight="bold">CEP:</Text>
                            <Text fontSize="sm">
                              {address.cep}
                            </Text>
                          </Box>
                          <Box>
                            <Text fontSize="x-small" fontWeight="bold">Cidade/UF:</Text>
                            <Text fontSize="sm">
                              {address.cidade}/{address.estado}
                            </Text>
                          </Box>
                        </HStack>
                      </Box>
                    )
                  })}
                </VStack>
              )
            }

            <Divider/>

            <Heading fontSize="lg" mb="4">Pedidos</Heading>

            { !orders.data 
              ? null 
              : orders.data?.length <= 0 ? (
                <Text>O cliente não possui nenhum pedido...</Text>
              )
              : orders.isLoading || orders.isFetching ? (
                <Center>
                  <Spinner color="blue.500"/>
                </Center>
              ) 
              : orders.isError ? (
                <Text>Erro ao carregar os pedidos do usuário</Text>
                ) 
              : (
                <Box borderWidth="1px" borderRadius="md" p="4">
                  <Table variant="striped" size="sm" w="100%">
                    <Thead>
                      <Tr>
                        <Th w="36">Pedido</Th>
                        <Th>Data</Th>
                        <Th w="36">Valor</Th>              
                      </Tr>
                    </Thead>
                    <Tbody>
                        { orders.data.map(order => {
                        return (
                          <Tr key={order.id}>
                            <Td>{order.numero_pedido}</Td>
                            <Td>{handleFormatDate(new Date(order.created_at))}</Td>
                            <Td>{handleFormatPrice(order.total)}</Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
                </Box>
              )}       
          </Box>
        </Content>
      </Box>
    </>
  )
}
