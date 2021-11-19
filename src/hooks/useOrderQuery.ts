import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getOrder = async (id: string): Promise<OrderProps>=> {
  if(!id) return null

  const { data, error } = await supabase
    .from<OrderProps>('orders')
    .select()
    .eq('id', id)
    .single()

  if(error) throw new Error(error.message)

  if(!data) throw new Error('Order not found')

  return data
}

const useOrderQuery = (id: string) => {
  return useQuery(['order', id], () => {
    return getOrder(id)
  
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })
}

export {
  getOrder,
  useOrderQuery
}