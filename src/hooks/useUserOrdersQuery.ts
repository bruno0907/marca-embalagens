import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getUserOrders = async (userId: string, limit?: number): Promise<OrderProps[]> => {
  const user = supabase.auth.user()

  if(!user) throw new Error('Not authenticated')

  if(!userId) return null

  if(limit) {
    const { data, error } = await supabase
      .from<OrderProps>('orders')
      .select()
      .eq('cliente', userId)
      .order('created_at', {
        ascending: false
      })
      .limit(limit)
  
    if(error) throw new Error(error.message)
  
    if(!data) throw new Error('No orders for the user found')
  
    return data
  }  

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

const useUserOrdersQuery = (userId: string, limit?: number) => {
  const queryKey = ['userOrders[]', userId]

  return useQuery(queryKey, () => {
    if(limit) {
      return getUserOrders(userId, limit)

    }
    return getUserOrders(userId)

  }, {
    useErrorBoundary: true,
    refetchOnWindowFocus: true
  })
}

export {
  useUserOrdersQuery
}