import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { Supplier } from "../models"
import { updateSupplier } from "../services"

export const useUpdateSupplierMutation = () => useMutation(
  async (supplier: Supplier) => {
    const { data, error } = await updateSupplier(supplier)

    if(error) throw Error(error.message)

    return data
  }, {
    onSuccess: async supplier => {
      await queryClient.invalidateQueries(['supplier', supplier[0].id])
      await queryClient.invalidateQueries(['supplier[]'])
    }
  }
)
