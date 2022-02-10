import { useQuery } from "react-query"
import { getProduct } from "../services"

export const useProductQuery = (id: string) => useQuery(
  ['product', id], 
  () => {
    if(!id) return
    return getProduct(id)
  }, {
    staleTime: 1000 * 60 * 10, //10minutes  
  }
)
