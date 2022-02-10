import { getProduct } from ".."
import { queryClient } from "../../contexts/queryContext"

export const prefetchProduct = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['product', id], 
    () => getProduct(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}

