import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"

import { UserProps } from "../types"

const updateUser = async (user: UserProps) => {
  return await supabase
    .from<UserProps>('users')    
    .update(user)
    .eq('id', user.id)
}

const useUpdateUserMutation = () => useMutation(
  async (user: UserProps) => {
    const { data, error } = await updateUser(user)

    if(error) throw Error('Erro ao atualizar o cadastro. Tente novamente.')

    return data

  }, {
    onSuccess: async (user) => {
      await queryClient.invalidateQueries(['user', user[0].id])
      await queryClient.invalidateQueries(['users[]'])
    }
  }
)

export {
  useUpdateUserMutation
}
