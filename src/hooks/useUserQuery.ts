import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { AddressProps, UserProps } from "../types"

const getUser = async (id: string | string[]) => {
  if(!id) {
    return null
  }

  const { data: user, error: userError } = await supabase
    .from<UserProps>('users')
    .select()
    .eq('id', String(id))
    .single()

  if(userError) {
    throw new Error('Usuário não encontrado.')
  }

  const { data: addresses, error: addressesError } = await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('user_id', user.id)

  if(addressesError) {
    throw new Error('Endereços do usuário não encontrados.')    
  }

  return {
    user,
    addresses
  }
}

const useUserQuery = (id: string | string[]) => {  
  return useQuery(['user', id], async () => await getUser(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })  
}

export { 
  useUserQuery,
  getUser 
}
