import { supabase } from "../../infra/database/supabase"
import { Supplier } from "../../models"

export const getSuppliers = async (pattern?: string) => {
  const user = supabase.auth.user()

  if(!user) throw new Error('User not authenticated')
  
  if(!pattern) {
    const { data, error } = await supabase    
      .from<Supplier>('suppliers')
      .select()
      .eq('user_id', user.id)    
      .order('nome')
  
    if(error) throw new Error(error.message)
  
    return data

  }
  
  const { data, error } = await supabase
    .from<Supplier>('suppliers')
    .select()
    .eq('user_id', user.id)
    .ilike('nome', `%${pattern}%`)
    .order('nome')

  if(error) throw new Error(error.message)

  if(!data) throw new Error('No suppliers found')

  return data  
}
