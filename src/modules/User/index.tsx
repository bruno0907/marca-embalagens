import { useRef } from 'react'
import Head from 'next/head'

import { useReactToPrint } from 'react-to-print'

import { Stack } from '@chakra-ui/react'

import { FiPrinter } from 'react-icons/fi'

import { 
  Divider,
  Header,  
  LoadingView,
  ErrorView,
  ButtonPrimary
} from '../../components'

import { UserDetails, UserOrders } from './components'

import { AddressesModule } from '../Addresses'
import { PrintUserModule } from './components'

import { useUserQuery } from '../../hooks'

type Props = { userId: string; }

export const UserModule = ({ userId }: Props) => {
  const { data: user, isLoading, isError } = useUserQuery(userId)

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
        <title>{!user?.nome ? 'Cliente' : user?.nome}</title>
      </Head>
      <Header withGoBack title={user?.nome}>
        <ButtonPrimary           
          leftIcon={<FiPrinter />} 
          onClick={handlePrintUser}
        >Imprimir</ButtonPrimary>
      </Header>
      <Divider />
      <Stack spacing={12} maxW="1140px" m="auto">
        <UserDetails userId={user?.id}/>
        <AddressesModule userId={user?.id}/>        
        <UserOrders userId={user?.id}/>
      </Stack>
      <PrintUserModule ref={printRef} user={user}/>           
    </>
  )
}
