import Head from 'next/head'

import { WithAuth } from '../../components/WithAuth'
import { Header } from '../../components/Header'
import { Divider } from '../../components/Divider'
import { OrdersCard } from './components/OrdersCard'
import { UsersCard } from './components/UsersCard'
import { ProductsCard } from './components/ProductsCard'

import {
  HStack,
} from '@chakra-ui/react'

export default function Dashboard() {       
  return (
    <> 
      <Head>
        <title>Dashboard | MARCA</title>
      </Head>

      <WithAuth>

        <Header title="Dashboard" />

        <Divider />

        <HStack spacing={3}>
          <OrdersCard />
          <UsersCard />
          <ProductsCard />
        </HStack>
        
      </WithAuth>
    </>
  )
}
