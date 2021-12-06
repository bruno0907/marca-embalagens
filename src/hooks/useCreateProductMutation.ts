import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"

import { NewProductProps, ProductProps } from "../types"

const createProduct = async(product: NewProductProps) => {  
  return await supabase
    .from<ProductProps>('products')
    .insert(product)
}

const useCreateProductMutation = () => useMutation(
  async (newProduct: NewProductProps) => {
    try {
      const { data, error } = await createProduct(newProduct)
  
      if(error) throw Error('Erro ao cadastrar novo produto.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['products[]']),
    onError: error => console.log('New Product Mutation Error: ', error)
  }
)

export {
  useCreateProductMutation
}
