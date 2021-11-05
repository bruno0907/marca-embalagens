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
  const user = supabase.auth.user()

  if(!user) return null

  if(pattern) {
    const { data } = await supabase
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
      
    return data
  }

  const { data } = await supabase
    .from<OrderQueryProps>('orders')
    .select(`
      id, 
      numero_pedido,
      created_at, 
      total,
      users ( nome )
    `)
    .eq('user_id', user.id)
    .order('created_at', {
      ascending: false
    })

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