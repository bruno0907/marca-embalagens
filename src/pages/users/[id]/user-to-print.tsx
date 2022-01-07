import Head from "next/head"

import { useRef } from "react"
import { useRouter } from "next/router"
import { GetServerSideProps } from "next"

import { useReactToPrint } from "react-to-print"

import { Divider } from "../../../components/Divider"
import { Content } from "../../../components/Content"
import { Header } from "../../../components/Header"
import { UserInformationToPrint } from "../../../components/pages/Users/UserOrders/UserInformationToPrint"
import { AddressesToPrint } from "../../../components/AddressesToPrint"
import { OrdersToPrint } from "../../../components/pages/Users/UserOrders/OrdersToPrint"

import { useUserQuery } from "../../../hooks/useUserQuery"
import { useAddressesQuery } from "../../../hooks/useAddressesQuery"
import { useUserOrdersQuery } from "../../../hooks/useUserOrdersQuery"

import { 
  Box,
  Heading,
  Text,
  Button,  
  Center,
  Spinner,
  Spacer
} from "@chakra-ui/react"

import { FiPrinter } from "react-icons/fi"

type Props = {
  params: {
    id: string;
  }
}

export default function UserToPrint({ params }: Props) {
  const router = useRouter()
  const { id } = params

  const userToPrintRef = useRef<HTMLDivElement>(null)

  const user = useUserQuery(id)
  const addresses = useAddressesQuery(id)
  const orders = useUserOrdersQuery(id)

  const handlePrint = useReactToPrint({
    content: () => userToPrintRef.current,
    onAfterPrint: () => router.push('/users')
  })

  return (
    <>
      <Head>
        <title>Imprimir ficha do cliente: {user.data?.nome} | MARCA</title>
      </Head>

      <Box maxW="1090px" margin="auto" px="8">
        <Header withGoBack py="16" title={user.data?.nome}>
          { !user.isFetching &&
            <Button
              leftIcon={<FiPrinter />}
              onClick={handlePrint}
              colorScheme="blue"
            >
              Imprimir
            </Button>
          }        
        </Header>
        
        <Content p="0">
          <Box ref={userToPrintRef} p="8">
            <Heading fontSize="lg" mb="4">Dados Cadastrais</Heading>

            { user.isLoading || user.isFetching 
              ? <Center>
                  <Spinner color="blue.500"/>
                </Center>
              : user.isError 
              ? <Text>Erro ao carregar os dados do cliente...</Text>
              : <UserInformationToPrint user={user.data}/>
            }

            <Divider/>

            <Heading fontSize="lg" mb="4">Endereços</Heading>

            { addresses.isLoading || addresses.isFetching 
              ? <Center>
                  <Spinner color="blue.500"/>
                </Center>
              : addresses.isError 
              ? <Text>Erro ao carregar os endereços do cliente..</Text>
              : <AddressesToPrint addresses={addresses.data}/>
            }

            <Divider/>

            <Heading fontSize="lg" mb="4">Pedidos</Heading>

            { !orders.data?.length 
              ?  <Text>O cliente não possui nenhum pedido...</Text>
              : orders.isLoading || orders.isFetching 
              ? <Center>
                  <Spinner color="blue.500"/>
                </Center>
              : orders.isError 
              ? <Text>Erro ao carregar os pedidos do usuário</Text>
              : <OrdersToPrint orders={orders.data}/>
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
