import { useQuery } from "react-query"
import { supabase } from "../database/supabase"

export type Supplier = {
  id: string;
  user_id: string;
  natureza_cliente: string;
  produto: string;
  nome: string;
  razao_social: string;
  contato: string;
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;
  situacao_cadastral: boolean;
  outras_informacoes: string;
}

const getSupplier = async (id: string): Promise<Supplier> => {
  try {
    const { data, error } = await supabase
      .from<Supplier>('suppliers')
      .select()
      .eq('id', id)
      .single()
      
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error

  }
}

const useSupplierQuery = (id: string) => useQuery(
  ['supplier', id], 
  () => getSupplier(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  }
)

export {
  useSupplierQuery,
  getSupplier,
}
