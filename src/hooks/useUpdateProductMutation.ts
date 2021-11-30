import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"

import { ProductProps } from "../types"

const updateProduct = async (product: ProductProps) => {    
  return await supabase
    .from<ProductProps>('products')    
    .update(product)
    .eq('id', product.id)  
}


const useUpdateProductMutation = () => useMutation(
  async (productToUpdate: ProductProps) => {
    const { data, error } = await updateProduct(productToUpdate)

    if(error) throw new Error('Erro ao atualizar o produto. Tente novamente...')

    return data

  }, {    
    onError: (error, context) => console.log({ error, context }),
    onSuccess: async product => {
      await queryClient.invalidateQueries(['products[]'])
      await queryClient.invalidateQueries(['product', product[0].id])
    }
  }
)

export {
  useUpdateProductMutation
}
