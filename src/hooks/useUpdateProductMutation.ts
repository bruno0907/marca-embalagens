import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { Product } from "../models"
import { updateProduct } from "../services"

export const useUpdateProductMutation = () => useMutation(
  async (productToUpdate: Product) => {
    const { data, error } = await updateProduct(productToUpdate)

    if(error) throw new Error(error.message)

    return data

  }, {
    onSuccess: async product => {
      await queryClient.invalidateQueries(['product[]'])
      await queryClient.invalidateQueries(['product', product[0].id])
    }
  }
)
