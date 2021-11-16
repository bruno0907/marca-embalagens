import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderProps } from "../types"

const getOrder = async (id: string | string[]) => {
  if(!id) {
    return null
  }

  return await supabase
    .from<OrderProps>('orders')
    .select()
    .eq('id', String(id))
    .single()
}

const useOrderQuery = (id: string | string[]) => {
  return useQuery(['order', id], async () => await getOrder(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })
}

export {
  getOrder,
  useOrderQuery
}