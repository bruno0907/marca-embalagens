import { Content } from "../../../../components/Layout/Content"
import { useProductsQuery } from "../../../../hooks/useProductsQuery"

import { 
  Spinner, 
  Stat,
  StatLabel,
  StatNumber, 
} from "@chakra-ui/react"

const ProductsCard = () => {  
  const { data, isError, isLoading } = useProductsQuery() 
  
  return (
    <Content>
      <Stat>
        <StatLabel fontSize="medium">Produtos cadastrados:</StatLabel>
        { 
          isError ? (
            <StatNumber>Ocorreu um erro...</StatNumber>
          ) : isLoading ? (
            <Spinner color="blue.500" size="lg"/>
          ) : (
            <StatNumber fontSize="xxx-large">{data?.length}</StatNumber> 
          )
        }
      </Stat>
    </Content>
  )
}

export {
  ProductsCard
}