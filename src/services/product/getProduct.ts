import { supabase } from "../../infra/database/supabase"
import { Product } from "../../models"

export const getProduct = async (id: string) => {
  const { data, error } = await supabase
    .from<Product>('products')
    .select()
    .eq('id', id)
    .single()

  if(error) throw new Error(error.message)

  return data
}