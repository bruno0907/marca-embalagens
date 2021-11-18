import Head from "next/head"

import { useRef } from "react"
import { useRouter } from "next/router"

import { useReactToPrint } from "react-to-print"

import { Divider } from "../../../../components/Layout/Divider"
import { Content } from "../../../../components/Layout/Content"
import { Header } from "../../../../components/Header"

import { useSupplierQuery } from "../../../../hooks/useSupplierQuery"
import { useAddressesQuery } from "../../../../hooks/useAddressesQuery"
import { useUserOrdersQuery } from "../../../../hooks/useUserOrdersQuery"

import { handleFormatDate } from "../../../../utils/handleFormatDate"
import { handleFormatPrice } from "../../../../utils/handleFormatPrice"

import { 
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Button,  
} from "@chakra-ui/react"

import { FiPrinter } from "react-icons/fi"

export default function SupplierToPrint() {
  const router = useRouter()
  const userId = router.query.id

  const ref = useRef<HTMLDivElement>(null)

  const supplier = useSupplierQuery(userId)
  const addresses = useAddressesQuery(userId)
  const orders = useUserOrdersQuery(userId)

  const handlePrint = useReactToPrint({
    content: () => ref.current
  })
  
  if(!supplier.data?.data || !addresses.data?.data || !orders?.data) return null

  return (
    <>
      <Head>
        <title>Imprimir ficha do fornecedor: {supplier.data?.data.nome} | MARCA</title>
      </Head>
      <Box maxW="1090px" margin="auto" px="8">
        <Header withGoBack py="16">
          <Heading fontSize="xx-large">{supplier.data.data.nome}</Heading>        
          <Button
            leftIcon={<FiPrinter />}
            onClick={handlePrint}
            colorScheme="blue"
          >Imprimir</Button>
        </Header>

        <Content p="0">
          <Box ref={ref} p="8">
            <Heading fontSize="lg" mb="4">Dados Cadastrais</Heading>

            <VStack spacing={3} align="start">
              <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                <Box>
                  <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
                  <Text fontSize="sm">{supplier.data.data.nome}</Text>            
                </Box>
                { supplier.data.data.razao_social && (
                  <Box>
                    <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                    <Text fontSize="sm">{supplier.data.data.razao_social}</Text>
                  </Box>
                )}              
                { supplier.data.data.cpf_cnpj && (
                  <Box>
                    <Text fontSize="x-small" fontWeight="semibold">
                      {supplier.data.data.razao_social ? 'CNPJ' : 'CPF'}
                    </Text>
                    <Text fontSize="sm">
                      {supplier.data.data.cpf_cnpj}
                    </Text>
                  </Box>
                )}
              </HStack>
              <Box>
                <Text fontSize="x-small" fontWeight="bold">Produto/Serviço:</Text>
                <Text fontSize="sm">{supplier.data.data.produto}</Text>            
              </Box>
              <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                <Box>
                  <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
                  <Text fontSize="sm">
                    {supplier.data.data.telefone}
                  </Text>            
                </Box>
                { supplier.data.data.celular && (
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                      <Text fontSize="sm">
                        {supplier.data.data.celular}
                      </Text>            
                    </Box>
                )}
                { supplier.data.data.contato && (
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                      <Text fontSize="sm">
                        {supplier.data.data.contato}
                      </Text>            
                    </Box>
                )}
              </HStack>
            </VStack>

            <Divider/>

            <Heading fontSize="lg" mb="4">Endereços</Heading>

            <VStack spacing={3} align="start">
              {addresses.data?.data.map(address => {
                return (
                  <HStack w="100%" spacing={3} key={address.id} align="flex-start" justify="space-between">
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
                )
              })}
            </VStack>

          </Box>
        </Content>
      </Box>
    </>
  )
}
