import { Draft } from "../../models"
import { supabase } from "../../infra/database/supabase"

export const getDrafts = async (pattern?: number) => {
  const user = supabase.auth.user()
  
  if(!user) throw new Error('User not authenticated!')
  
  if(!pattern) {      
    const { data, error } = await supabase
    .from<Draft>('drafts')
    .select()
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    
    if(error) throw new Error(error.message)
    
    return data      
  }
  
  const { data, error } = await supabase
    .from<Draft>('drafts')
    .select()
    .eq('user_id', user.id)
    .match({ numero_orcamento: pattern })
    .order('created_at', {
      ascending: false
    })
    
  if(error) throw new Error(error.message)

  return data  
}