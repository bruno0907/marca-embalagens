import Head from "next/head"

import { useRef } from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import { useReactToPrint } from "react-to-print"

import { Divider } from "../../../components/Divider"
import { Content } from "../../../components/Content"
import { Header } from "../../../components/Header"

import { SupplierInformationToPrint } from "../../../components/pages/Suppliers/SupplierInformationToPrint"
import { AddressesToPrint } from "../../../components/AddressesToPrint"

import { useSupplierQuery } from "../../../hooks/useSupplierQuery"
import { useAddressesQuery } from "../../../hooks/useAddressesQuery"

import { 
  Box,
  Heading,
  Text,
  Button,  
  Center,
  Spinner
} from "@chakra-ui/react"

import { FiPrinter } from "react-icons/fi"

type Props = {
  params: {
    id: string;
  }
}

export default function SupplierToPrint({ params }: Props) {
  const router = useRouter()
  const { id } = params

  const ref = useRef<HTMLDivElement>(null)

  const supplier = useSupplierQuery(id)
  const addresses = useAddressesQuery(id)  

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

            { supplier.isLoading || supplier.isFetching 
              ? <Center>
                  <Spinner color="blue.500"/>
                </Center>
              : supplier.isError 
              ? <Text>Erro ao carregar os dados do cliente...</Text>                
              : <SupplierInformationToPrint supplier={supplier.data}/>              
            }

            <Divider/>

            <Heading fontSize="lg" mb="4">Endereços</Heading>

            { addresses.isLoading || addresses.isFetching 
              ? <Center>
                    <Spinner color="blue.500"/>
                  </Center>
              : addresses.isError 
              ? <Text>Erro ao carregar os endereços do cliente...</Text>
              : <AddressesToPrint addresses={addresses.data}/>              
            }
          </Box>
        </Content>
      </Box>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {  
  return {
    props: {
      params
    }
  }
}
