import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { User } from "../models"
import { updateUser } from "../services"

export const useUpdateUserMutation = () => useMutation(
  async (user: User) => {
    const { data, error } = await updateUser(user)

    if(error) throw Error(error.message)

    return data

  }, {
    onSuccess: async (user) => {
      await queryClient.invalidateQueries(["user", user[0].id])
      await queryClient.invalidateQueries(["user[]"])
    }
  }
)
