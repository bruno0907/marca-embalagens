import { supabase } from "../../infra/database/supabase"
import { Draft } from "../../models"

export const getDraft = async (id: string) => {  
  const { data, error } = await supabase
    .from<Draft>('drafts')
    .select()
    .eq('id', id)
    .single()  

  if(error) throw new Error(error.message)

  return data  
}