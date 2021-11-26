import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getUserOrders = async (userId: string, limit?: number): Promise<OrderProps[]> => {
  try {
    const user = supabase.auth.user()
    
    if(!user) throw new Error('Not authenticated')
    
    if(!limit) {
      const { data, error } = await supabase
        .from<OrderProps>('orders')
        .select()
        .eq('cliente', userId)
        .order('created_at', {
          ascending: false
        })    
    
      if(error) throw new Error(error.message)
      
      if(!data) throw new Error('No orders for the user found')
      
      return data
    }
    
    const { data, error } = await supabase
      .from<OrderProps>('orders')
      .select()
      .eq('cliente', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
  
    if(error) throw new Error(error.message)
  
    if(!data) throw new Error('No orders for the user found')
  
    return data

  } catch (error) {
    return error

  }
  

}

const useUserOrdersQuery = (userId: string, limit?: number) => {
  const queryKey = ['userOrders[]', userId]

  return useQuery(queryKey, async () => {
    if(!limit) return await getUserOrders(userId)
      
    return await getUserOrders(userId, limit)

  }, {
    useErrorBoundary: true,
    refetchOnWindowFocus: true
  })
}

export {
  useUserOrdersQuery
}