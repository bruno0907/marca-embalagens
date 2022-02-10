import { useQuery } from "react-query"
import { getProducts } from "../services"

export const useProductsQuery = (pattern?: string) => {
  const queryKey = pattern ? ['product[]', pattern] : ['product[]']

  return useQuery(
    queryKey, 
    () => !pattern ? getProducts() : getProducts(pattern), {
      staleTime: 1000 * 10 * 60,
    }
  )
}

