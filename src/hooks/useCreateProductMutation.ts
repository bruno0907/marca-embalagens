import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createProduct } from "../services/createProduct"
import { NewProductProps } from "../types"

const useCreateProductMutation = () => useMutation(
  async (newProduct: NewProductProps) => {
    try {
      const { data, error } = await createProduct(newProduct)
  
      if(error) throw Error('Erro ao cadastrar novo produto.')
  
      return data
      
    } catch (error) {
      return error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['products[]']),
    onError: error => console.log('New Product Mutation Error: ', error)
  }
)

export {
  useCreateProductMutation
}
