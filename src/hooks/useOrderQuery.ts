import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getOrder = async (id: string): Promise<OrderProps>=> {
  try {
    const { data, error } = await supabase
      .from<OrderProps>('orders')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
  }
}

const useOrderQuery = (id: string) => useQuery(
  ['order', id], 
  () => getOrder(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  }
)

export {
  getOrder,
  useOrderQuery
}