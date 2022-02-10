import { supabase } from "../../infra/database/supabase"
import { Order } from "../../models"

export const updateOrder = async (order: Order) => { 
  return await supabase
    .from<Order>('orders')
    .update(order)
    .eq('id', order.id)  
}