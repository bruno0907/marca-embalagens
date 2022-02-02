import { useQuery } from "react-query"
import { supabase } from "../database/supabase"

export type Order = {
  id: string; 
  user_id: string; 
  numero_pedido: number;
  cliente: string; 
  endereco_entrega: string;
  condicao_pagamento: string; 
  pedido: OrderProduct[];
  total: number;
  data_entrega: Date;
  created_at: Date;
}

export type OrderProduct = {
  quantidade: number;
  produto: string;
  valor_unitario: number;
  valor_total: number;  
}

export const getOrder = async (id: string): Promise<Order>=> {
  try {
    const { data, error } = await supabase
      .from<Order>('orders')
      .select()
      .eq('id', id)
      .single()
  
    if(error) throw new Error(error.message)
  
    return data
    
  } catch (error) {
    throw error
    
  }
}

export const useOrderQuery = (id: string) => useQuery(
  ['order', id], 
  () => getOrder(id), {
    staleTime: 1000 * 60 * 10, //10minutes  
  }  
)
