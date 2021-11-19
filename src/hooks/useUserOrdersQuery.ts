import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getUserOrders = async ( userId: string | string[] , limit: number | null = null) => {
  const user = supabase.auth.user()

  if(!user || !userId) {
    return null
  }
  
  return await supabase
    .from<OrderProps>('orders')
    .select()
    .eq('cliente', String(userId))
    .order('created_at', {
      ascending: false
    })
    .limit(limit)
}

const useUserOrdersQuery = (userId: string | string[], limit?: number) => {
  const queryKey = ['userOrders[]', userId]

  return useQuery(queryKey, async () => {
    if(limit) {
      return await getUserOrders(userId, limit)
    }

    return await getUserOrders(userId)

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useUserOrdersQuery
}