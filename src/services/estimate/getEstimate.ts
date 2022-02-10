import { supabase } from "../../infra/database/supabase"
import { Estimate } from "../../models"

export const getEstimate = async (id: string) => {  
  const { data, error } = await supabase
    .from<Estimate>('estimates')
    .select()
    .eq('id', id)
    .single()  

  if(error) throw new Error(error.message)

  return data  
}