import Head from "next/head"
import { AuthWrapper } from "../../../components/AuthWrapper"
import { Divider } from "../../../components/Divider"
import { Header } from "../../../components/Header"
import { EstimatesCard } from "./components/EstimatesCards"
import { OrdersCard } from "./components/OrdersCard"
import { ProductsCard } from "./components/ProductsCard"
import { UsersCard } from "./components/UsersCard"

import { SimpleGrid } from "@chakra-ui/react"

export const DashboardView = () => {
  return (
    <> 
      <Head>
        <title>Dashboard | MARCA</title>
      </Head>
      <AuthWrapper>
        <Header title="Dashboard" />
        <Divider />
        <SimpleGrid columns={[1, 2, 4]} gap={6}>
          <EstimatesCard/>
          <OrdersCard/>
          <UsersCard/>
          <ProductsCard/>
        </SimpleGrid>        
      </AuthWrapper>
    </>
  )
}