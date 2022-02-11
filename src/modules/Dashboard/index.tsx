import { SimpleGrid } from "@chakra-ui/react"

import { Divider, Header } from "../../components"

import { 
  EstimatesCard,
  OrdersCard,
  ProductsCard,
  UsersCard 
} from "./components"

export const DashboardModule = () => {
  return (
    <>     
      <Header title="Dashboard" />
      <Divider />
      <SimpleGrid columns={[1, 2, 2, 2, 4]} gap={6} maxW="1140px" m="auto">
        <EstimatesCard/>
        <OrdersCard/>
        <UsersCard/>
        <ProductsCard/>
      </SimpleGrid>
    </>
  )
}