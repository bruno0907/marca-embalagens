import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { OrderItemProps } from "../types"
import { EstimateStatus } from "./useCreateEstimateMutation"

export type Estimate = {
  id: string; 
  user_id: string;
  numero_orcamento: number;
  cliente: string;  
  produtos: OrderItemProps[];
  condicao_pagamento: string; 
  total: number;
  data_entrega: Date;
  status: EstimateStatus;
  descricao_status: string;
  status_data_aprovado: Date;
  observacoes: string;
  created_at: Date;
}

const getEstimates = async (pattern?: number): Promise<Estimate[]> => {
  try {
    const user = supabase.auth.user()
    
    if(!user) throw new Error('User not authenticated')
    
    if(!pattern) {      
      const { data, error } = await supabase
      .from<Estimate>('estimates')
      .select()
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      
      if(error) throw new Error(error.message)
      
      return data      
    }
    
    const { data, error } = await supabase
      .from<Estimate>('estimates')
      .select()
      .eq('user_id', user.id)
      .match({ numero_orcamento: pattern })
      .order('created_at', {
        ascending: false
      })
      
    if(error) throw new Error(error.message)

    return data
    
  } catch (error) {
    throw error
    
  }
}

const useEstimatesQuery = (pattern?: number) => {
  const queryKey = pattern ? ['estimate[]', pattern] : ['estimate[]']

  return useQuery(
    queryKey, 
    () => !pattern ? getEstimates() : getEstimates(pattern), {
      staleTime: 1000 * 10 * 60,
      useErrorBoundary: true,
    }
  )
}

export {
  useEstimatesQuery
}
