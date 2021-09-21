import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { updateProduct } from "../services/updateProduct"
import { ProductProps } from "../types"

const useUpdateProductMutation = () => {
  return useMutation(async (productToUpdate: ProductProps) => {
    const { data, error } = await updateProduct(productToUpdate)

    if(error) throw new Error('Erro ao atualizar o produto. Tente novamente...')

    return data

  }, {    
    onError: (error, context) => console.log({ error, context }),
    onSuccess: async product => {
      await queryClient.invalidateQueries(['products[]'])
      await queryClient.invalidateQueries(['product', product[0].id])
    }
  })
}

export {
  useUpdateProductMutation
}