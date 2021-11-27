import { useQuery } from "react-query"
import { supabase } from "../database/supabase"

type OrderQueryProps = {
  id: string;
  user_id: string;
  numero_pedido: number;
  created_at: Date;
  total: number;
  users: {
    id: string;
    nome: string;
  }
}

const getOrders = async (pattern?: string): Promise<OrderQueryProps[]> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('Not authenticated')
  
    if(!pattern) {
      const { data, error } = await supabase
        .from<OrderQueryProps>('orders')
        .select(`
          id, 
          numero_pedido,
          created_at, 
          total,
          users ( nome )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    
      if(error) throw new Error(error.message)
    
      if(!data) throw new Error('No orders found')
    
      return data
    }

    const { data, error } = await supabase
      .from<OrderQueryProps>('orders')
      .select(`
        id, 
        numero_pedido,
        created_at, 
        total,
        users ( nome )
      `)
      .eq('user_id', user.id)
      .match({ numero_pedido: pattern })
      .order('created_at', {
        ascending: false
      })
      
    if(error) throw new Error(error.message)

    if(!data) throw new Error('No orders found')

    return data
    
  } catch (error) {
    return error
    
  }
}

const useOrdersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['orders[]', pattern] : ['orders[]']

  return useQuery(queryKey, () => {
    if(pattern) getOrders(pattern)

    return getOrders()

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useOrdersQuery
}
