import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getOrders = async (pattern?: string): Promise<OrderProps[]> => {
  const user = supabase.auth.user()

  if(pattern) {
    const { data } = await supabase
      .from<OrderProps>('orders')
      .select()
      .eq('user_id', user.id)
      .ilike('cliente', `${pattern}%`)
      .order('created_at')
      
    return data
  }

  const { data } = await supabase
    .from<OrderProps>('orders')
    .select()
    .eq('user_id', user.id)
    .order('created_at')

  return data
}

const useOrdersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['orders[]', pattern] : ['orders[]']

  return useQuery(queryKey, async () => {
    if(pattern) {
      return await getOrders(pattern)
    }

    return await getOrders()

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useOrdersQuery
}