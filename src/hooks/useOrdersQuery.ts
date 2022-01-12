import { useQuery } from "react-query"
import { supabase } from "../database/supabase"

export type OrderQuery = {
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

const getOrders = async (query?: number): Promise<OrderQuery[]> => {
  try {
    const user = supabase.auth.user()
    
    if(!user) throw new Error('User not authenticated')
    
    if(!query) {      
      const { data, error } = await supabase
      .from<OrderQuery>('orders')
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
      
      return data      
    }
    
    const { data, error } = await supabase
      .from<OrderQuery>('orders')
      .select(`
        id, 
        numero_pedido,
        created_at, 
        total,
        users ( nome )
      `)
      .eq('user_id', user.id)
      .match({ numero_pedido: query })
      .order('created_at', {
        ascending: false
      })
      
    if(error) throw new Error(error.message)

    return data
    
  } catch (error) {
    throw error
    
  }
}

const useOrdersQuery = (query?: number) => {
  const queryKey = query ? ['order[]', query] : ['order[]']

  return useQuery(
    queryKey, 
    () => !query ? getOrders() : getOrders(query), {
      staleTime: 1000 * 10 * 60,
      useErrorBoundary: true,
    }
  )
}

export {
  useOrdersQuery
}
