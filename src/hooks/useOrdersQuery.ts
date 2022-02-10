import { useQuery } from "react-query"
import { getOrders } from "../services"

export const useOrdersQuery = (query?: number) => {
  const queryKey = query ? ['order[]', query] : ['order[]']

  return useQuery(
    queryKey, 
    () => !query ? getOrders() : getOrders(query), {
      staleTime: 1000 * 10 * 60
    }
  )
}
