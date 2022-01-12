import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { Order } from "./useOrderQuery"

const getUserOrders = async (userId: string, limit?: number): Promise<Order[]> => {
  try {
    const user = supabase.auth.user()
    
    if(!user) throw new Error('User not authenticated')
    
    if(!limit) {
      const { data, error } = await supabase
        .from<Order>('orders')
        .select()
        .eq('cliente', userId)
        .order('created_at', {
          ascending: false
        })    
    
      if(error) throw new Error(error.message)
      
      return data
    }
    
    const { data, error } = await supabase
      .from<Order>('orders')
      .select()
      .eq('cliente', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
  
    if(error) throw new Error(error.message)
  
    return data

  } catch (error) {
    throw error

  }
}

const useUserOrdersQuery = (userId: string, limit?: number) => {
  const queryKey = ['userOrder[]', userId]

  return useQuery(queryKey, 
    () => !limit ? getUserOrders(userId) : getUserOrders(userId, limit), {
      useErrorBoundary: true,
      refetchOnWindowFocus: true
    }
  )
}

export {
  useUserOrdersQuery
}