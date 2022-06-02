import Head from 'next/head'

import { Stack } from '@chakra-ui/react'

import { 
  Divider,
  Header,  
  LoadingView,
  ErrorView,
  Section,
} from '../../components'

import { UserDetails, UserOrders } from './components'

import { AddressesModule } from '../Addresses'

import { useUserQuery } from '../../hooks'

type Props = { userId: string; }

export const UserModule = ({ userId }: Props) => {
  const { data: user, isLoading, isError, isFetching } = useUserQuery(userId)

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
      <Header withGoBack title={user?.nome} />
      <Divider />
      <Section>
        <UserDetails user={user} isFetching={isFetching} />
        <AddressesModule userId={user?.id}/>        
        <UserOrders userId={user?.id}/>
      </Section>        
    </>
  )
}
