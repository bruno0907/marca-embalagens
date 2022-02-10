import { useQuery } from "react-query"
import { getOrdersByUser } from "../services"

export const useUserOrdersQuery = (userId: string, limit?: number) => {
  const queryKey = ['userOrder[]', userId]

  return useQuery(queryKey, 
    () => !limit ? getOrdersByUser(userId) : getOrdersByUser(userId, limit), {      
      refetchOnWindowFocus: true
    }
  )
}