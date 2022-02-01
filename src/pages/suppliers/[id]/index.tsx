import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import { useSupplierQuery } from '../../../hooks/useSupplierQuery'

import { AuthWrapper } from '../../../components/AuthWrapper'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'
import { SupplierDetails } from '../../../components/pages/Suppliers/SupplierDetails'
import { AddressesDetails } from '../../../components/AddressesDetails'

import { HStack, Button } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

type Props = {
  params: {
    id: string
  }
}

export default function Supplier({ params }: Props) {  
  const router = useRouter()
  
  const { id } = params
  
  const supplier = useSupplierQuery(id)

  const handlePrintUser = () => router.push(`/suppliers/${id}/supplier-to-print`)  

  return (
    <>
      <Head>
        <title>
          {!supplier.data?.nome ? `MARCA` : `${supplier.data?.nome} | MARCA`}
        </title>
      </Head>
      <AuthWrapper>
        <Header withGoBack title={supplier.data?.nome}>
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}            
            onClick={handlePrintUser}
          >Imprimir</Button>
        </Header>
        <Divider />        
        <HStack spacing={6} align="flex-start" >
          <SupplierDetails supplierId={id}/>
          <AddressesDetails userId={id}/>          
        </HStack>
      </AuthWrapper>
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
