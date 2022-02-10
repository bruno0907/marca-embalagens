import { supabase } from "../../infra/database/supabase"
import { Order } from "../../models"

export const getOrdersByUser = async (userId: string, limit?: number) => {
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
}