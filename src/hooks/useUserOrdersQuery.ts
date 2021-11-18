import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

type UserOrderQueryProps = {
  id: string;
  cliente: string;
  numero_pedido: number;
  created_at: Date;
  total: number;  
}

const getUserOrders = async ( userId: string | string[] , limit: number | null = null): Promise<UserOrderQueryProps[]> => {
  const user = supabase.auth.user()

  if(!user || !userId) {
    return null
  }
  
  const { data } = await supabase
    .from<OrderProps>('orders')
    .select()
    .eq('cliente', String(userId))
    .order('created_at', {
      ascending: false
    })
    .limit(limit)
    
  return data
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