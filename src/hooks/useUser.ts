import { useQuery } from "react-query"
import { supabase } from "../services/supabase"

import { UserProps } from "../types"

const getUser = async (id: string | string[]) => {
  const { data } = await supabase
    .from<UserProps>('users')
    .select()
    .eq('id', String(id))
    .single()

  return data
}

const useUser = (id: string | string[]) => {
  return useQuery('user', async () => await getUser(id))
}

export { 
  useUser 
}
