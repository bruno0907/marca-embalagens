import { supabase } from "../database/supabase";
import { NewOrderProps, OrderProps } from "../types"

const createOrder = async (order: NewOrderProps) => { 
  return await supabase
    .from<OrderProps>('orders')
    .insert(order);
}

export {
  createOrder
}