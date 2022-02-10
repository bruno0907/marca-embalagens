import { supabase } from "../../infra/database/supabase"
import { OrderQuery } from "../../models"

export const getOrders = async (query?: number) => {
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
}