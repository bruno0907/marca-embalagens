import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { Product } from "./useProductQuery"

export type NewProduct = {  
  user_id: string;
  nome: string;
  descricao: string;  
  preco_unitario: number;
}

const createProduct = async(product: NewProduct) => {  
  return await supabase
    .from<Product>('products')
    .insert(product)
}

const useCreateProductMutation = () => useMutation(
  async (newProduct: NewProduct) => {
    try {
      const { data, error } = await createProduct(newProduct)
  
      if(error) throw Error('Erro ao cadastrar novo produto.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['product[]']),
    onError: error => console.log('New product mutation error: ', error)
  }
)

export {
  useCreateProductMutation
}
