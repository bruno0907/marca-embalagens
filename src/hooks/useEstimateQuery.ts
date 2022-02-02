import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { Estimate } from "./useEstimatesQuery"

export const getEstimate = async (id: string): Promise<Estimate>=> {
  try {
    const { data, error } = await supabase
      .from<Estimate>('estimates')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
  }
}

export const useEstimateQuery = (id: string) => useQuery(
  ['estimate', id], 
  () => getEstimate(id), {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)
