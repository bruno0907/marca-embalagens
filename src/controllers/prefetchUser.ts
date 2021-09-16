import { queryClient } from "../contexts/queryContext"
import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const getUser = async (id: string) => {
  return await supabase
    .from<UserProps>('users')
    .select()
    .eq('id', id)
    .single()
}

const prefetchUser = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['user', id], async () => await getUser(id)
  )
}

export {
  prefetchUser
}