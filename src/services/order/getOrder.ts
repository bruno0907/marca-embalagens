import { supabase } from "../../infra/database/supabase"
import { Order } from "../../models"

export const getOrder = async (id: string) => {
  const { data, error } = await supabase
    .from<Order>('orders')
    .select()
    .eq('id', id)
    .single()

  if(error) throw new Error(error.message)

  return data
}