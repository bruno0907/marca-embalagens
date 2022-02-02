import { supabase } from "../database/supabase"
import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { User } from "./useUserQuery"

const updateUser = async (user: User) => {
  return await supabase
    .from<User>('users')    
    .update(user)
    .eq('id', user.id)
}

export const useUpdateUserMutation = () => useMutation(
  async (user: User) => {
    const { data, error } = await updateUser(user)

    if(error) throw Error('Erro ao atualizar o cadastro. Tente novamente.')

    return data

  }, {
    onSuccess: async (user) => {
      await queryClient.invalidateQueries(['user', user[0].id])
      await queryClient.invalidateQueries(['user[]'])
    }
  }
)
