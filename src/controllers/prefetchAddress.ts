import { queryClient } from "../contexts/queryContext"
import { supabase } from "../services/supabase"

const getAddress = async (id: string) => {
    return await supabase
      .from('addresses')
      .select()
      .eq('id', id)
      .single()
}

const prefetchAddress = async (id: string) => {
  return await queryClient.prefetchQuery(['address', id], async () => {
    await getAddress(id)
  }, {
    staleTime: 1000 * 10 * 10
  })
}

export {
  prefetchAddress
}