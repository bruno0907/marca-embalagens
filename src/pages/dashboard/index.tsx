import Head from 'next/head'

import { Authenticated } from '../../components/Layout/Authenticated'
import { Header } from '../../components/Header'
import { Divider } from '../../components/Layout/Divider'
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

      <Authenticated>

        <Header title="Dashboard" />

        <Divider />

        <HStack spacing={3}>
          <OrdersCard />
          <UsersCard />
          <ProductsCard />
        </HStack>
        
      </Authenticated>
    </>
  )
}
