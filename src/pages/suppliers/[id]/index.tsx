import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import { useSupplierQuery } from '../../../hooks/useSupplierQuery'

import { WithAuth } from '../../../components/WithAuth'
import { Divider } from '../../../components/Divider'
import { Header } from '../../../components/Header'
import { SupplierDetails } from '../../../components/pages/Suppliers/SupplierDetails'
import { AddressesInformation } from '../../../components/AddressesInformation'

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
      <WithAuth>

        <Header withGoBack title={supplier.data?.nome}>
          <Button
            colorScheme="blue"
            leftIcon={<FiPrinter />}            
            onClick={handlePrintUser}
          >Imprimir</Button>

        </Header>

        <Divider />
        
        <HStack spacing={3} align="flex-start" >
          <SupplierDetails supplierId={id}/>
          <AddressesInformation userId={id}/>          
        </HStack>

      </WithAuth>
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
