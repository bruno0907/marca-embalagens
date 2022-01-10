import Head from 'next/head'

import { AuthWrapper } from '../../components/AuthWrapper'
import { Header } from '../../components/Header'
import { Divider } from '../../components/Divider'
import { OrdersCard } from '../../components/pages/Dashboard/OrdersCard'
import { UsersCard } from '../../components/pages/Dashboard/UsersCard'
import { ProductsCard } from '../../components/pages/Dashboard/ProductsCard'

import { SimpleGrid } from '@chakra-ui/react'

export default function Dashboard() {       
  return (
    <> 
      <Head>
        <title>Dashboard | MARCA</title>
      </Head>
      <AuthWrapper>
        <Header title="Dashboard" />
        <Divider />
        <SimpleGrid columns={3} gap={6}>
          <OrdersCard />
          <UsersCard />
          <ProductsCard />
        </SimpleGrid>        
      </AuthWrapper>
    </>
  )
}
