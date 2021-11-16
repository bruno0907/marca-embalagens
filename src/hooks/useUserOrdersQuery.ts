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

const getUserOrders = async (userId: string, limit: number = 0): Promise<UserOrderQueryProps[]> => {
  const user = supabase.auth.user()

  if(!user) {
    return null
  }
  
  const { data } = await supabase
    .from<OrderProps>('orders')
    .select()
    .eq('cliente', userId)
    .order('created_at', {
      ascending: false
    })
    .limit(limit)
    
  return data
}

const useUserOrdersQuery = (userId: string, limit?: number) => {
  const queryKey = limit ? ['userOrders[]', userId] : ['orders[]']

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