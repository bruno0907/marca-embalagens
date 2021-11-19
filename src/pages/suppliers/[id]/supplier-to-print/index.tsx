import Head from "next/head"

import { useRef } from "react"
import { useRouter } from "next/router"

import { useReactToPrint } from "react-to-print"

import { Divider } from "../../../../components/Layout/Divider"
import { Content } from "../../../../components/Layout/Content"
import { Header } from "../../../../components/Header"

import { useSupplierQuery } from "../../../../hooks/useSupplierQuery"
import { useAddressesQuery } from "../../../../hooks/useAddressesQuery"

import { 
  Box,  
  VStack,
  HStack,
  Heading,
  Text,
  Button,  
  Center,
  Spinner
} from "@chakra-ui/react"

import { FiPrinter } from "react-icons/fi"

export default function SupplierToPrint() {
  const router = useRouter()
  const userId = router.query.id

  const ref = useRef<HTMLDivElement>(null)

  const supplier = useSupplierQuery(String(userId))
  const addresses = useAddressesQuery(String(userId))
  

  const handlePrint = useReactToPrint({
    content: () => ref.current,
    onAfterPrint: () => router.push('/users')
  })

  return (
    <>
      <Head>
        <title>Imprimir ficha do fornecedor: {supplier.data?.nome} | MARCA</title>
      </Head>

      <Box maxW="1090px" margin="auto" px="8">
        <Header withGoBack py="16" title={supplier.data?.nome}>
          <Button
            leftIcon={<FiPrinter />}
            onClick={handlePrint}
            colorScheme="blue"
          >Imprimir</Button>
        </Header>
        
        <Content p="0">
          <Box ref={ref} p="8">
            <Heading fontSize="lg" mb="4">Dados Cadastrais</Heading>

            { !supplier.data ? null 
              : supplier.isLoading || supplier.isFetching ? (
                  <Center>
                    <Spinner color="blue.500"/>
                  </Center>
                )
              : supplier.isError ? (
                  <Text>Erro ao carregar os dados do cliente...</Text>
                )
              : (
                <VStack spacing={3} align="start" borderWidth="1px" borderRadius="md" p="4">
                  <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Nome:</Text>
                      <Text fontSize="sm">{supplier.data?.nome}</Text>            
                    </Box>
                    { supplier.data?.razao_social && (
                      <Box>
                        <Text fontSize="x-small" fontWeight="semibold">Razão social:</Text>
                        <Text fontSize="sm">{supplier.data?.razao_social}</Text>
                      </Box>
                    )}
                    { supplier.data?.cpf_cnpj && (
                      <Box>
                        <Text fontSize="x-small" fontWeight="semibold">
                          {supplier.data?.razao_social ? 'CNPJ' : 'CPF'}
                        </Text>
                        <Text fontSize="sm">
                          {supplier.data?.cpf_cnpj}
                        </Text>
                      </Box>
                    )}
                  </HStack>
                  <Box>
                    <Text fontSize="x-small" fontWeight="bold">Produto/Serviço:</Text>
                    <Text fontSize="sm">{supplier.data?.produto}</Text>            
                  </Box>
                  <HStack w="100%" spacing={3} align="flex-start" justify="space-between">
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">Telefone:</Text>
                      <Text fontSize="sm">
                        {supplier.data?.telefone}
                      </Text>            
                    </Box>
                    { supplier.data?.celular && (
                        <Box>
                          <Text fontSize="x-small" fontWeight="bold">Celular:</Text>
                          <Text fontSize="sm">
                            {supplier.data?.celular}
                          </Text>            
                        </Box>
                    )}
                    <Box>
                      <Text fontSize="x-small" fontWeight="bold">E-mail:</Text>
                      <Text fontSize="sm">
                        {supplier.data?.email}
                      </Text>            
                    </Box>
                    { supplier.data?.contato && (
                        <Box>
                          <Text fontSize="x-small" fontWeight="bold">Contato:</Text>
                          <Text fontSize="sm">
                            {supplier.data?.contato}
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
          </Box>
        </Content>
      </Box>
    </>
  )
}
