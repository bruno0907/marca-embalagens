import { useQuery } from "react-query"
import { supabase } from "../database/supabase"

export type Product = {
  id: string;
  user_id: string;
  nome: string;
  descricao: string;
  situacao: boolean;
  preco_unitario: number;
}

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const { data, error } = await supabase
      .from<Product>('products')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
  }
}

export const useProductQuery = (id: string) => useQuery(
  ['product', id], 
  () => getProduct(id), {
    staleTime: 1000 * 60 * 10, //10minutes  
  }
)
