import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { updateUser } from "../services/updateUser"
import { UserProps } from "../types"

const useUpdateUserMutation = () => {
  return useMutation(async (user: UserProps) => {
    const { data, error } = await updateUser(user)

    if(error) {
      throw Error('Erro ao atualizar o cadastro. Tente novamente.')      
    }

    return data
  }, {
    onSuccess: async (user) => {
      await queryClient.invalidateQueries(['user', user[0].id])
      await queryClient.invalidateQueries(['users[]'])
    }
  })
}

export {
  useUpdateUserMutation
}