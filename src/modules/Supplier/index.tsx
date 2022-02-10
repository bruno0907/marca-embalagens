import { useRef } from 'react'
import Head from 'next/head'

import { useReactToPrint } from 'react-to-print'

import { Stack } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

import { AddressesModule, PrintSupplierModule } from '..'

import { 
  Header,
  Divider,
  ErrorView,
  LoadingView,
  ButtonPrimary 
} from '../../components'

import { SupplierDetails } from './components'

import { useSupplierQuery } from '../../hooks'

type Props = {
  supplierId: string;
}

export const SupplierModule = ({ supplierId }: Props) => {
  const { data: supplier, isLoading, isError, isFetching } = useSupplierQuery(supplierId)

  const printRef = useRef<HTMLDivElement>(null)

  const handlePrintUser = useReactToPrint({
    content: () => printRef.current
  })

  if(isLoading) {
    return (
      <>
        <Header withGoBack title="Cliente"/>
        <Divider />
        <LoadingView />
      </>
    )
  }

  if(isError) {
    return (
      <>
        <Header withGoBack title="Cliente"/>
        <Divider/>
        <ErrorView/>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>
          {!supplier?.nome ? 'Fornecedor' : supplier?.nome}
        </title>
      </Head>
      <Header withGoBack title={supplier?.nome}>      
      <ButtonPrimary leftIcon={<FiPrinter />} onClick={handlePrintUser}>
        Imprimir
      </ButtonPrimary>
      </Header>
      <Divider />        
      <Stack spacing={12} maxW="1140px" m="auto">
        <SupplierDetails supplierId={supplier.id}/>
        <AddressesModule userId={supplier.id}/>          
      </Stack>
      <PrintSupplierModule ref={printRef} supplier={supplier}/>
    </>
  )
}