import { queryClient } from "../contexts/queryContext"
import { getProduct } from "../hooks/useProductQuery"

const prefetchProduct = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['product', id], async () => await getProduct(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}

export {
  prefetchProduct  
}