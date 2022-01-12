import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { Product } from "./useProductQuery"

const updateProduct = async (product: Product) => {    
  return await supabase
    .from<Product>('products')    
    .update(product)
    .eq('id', product.id)  
}

const useUpdateProductMutation = () => useMutation(
  async (productToUpdate: Product) => {
    const { data, error } = await updateProduct(productToUpdate)

    if(error) throw new Error('Erro ao atualizar o produto. Tente novamente...')

    return data

  }, {    
    onError: (error, context) => console.log({ error, context }),
    onSuccess: async product => {
      await queryClient.invalidateQueries(['product[]'])
      await queryClient.invalidateQueries(['product', product[0].id])
    }
  }
)

export {
  useUpdateProductMutation
}
