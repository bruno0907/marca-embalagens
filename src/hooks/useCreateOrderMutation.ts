import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";
import { Order, OrderProduct } from "./useOrderQuery";

export type NewOrder = {  
  user_id: string; 
  numero_pedido: number;
  cliente: string; 
  endereco_entrega: string;
  condicao_pagamento: string; 
  pedido: OrderProduct[]; 
  total: number; 
  data_entrega: Date;  
}

const createOrder = async (order: NewOrder) => { 
  return await supabase
    .from<Order>('orders')
    .insert(order);
}

const useCreateOrderMutation = () => useMutation(
  async (newOrder: NewOrder) => {
    try {
      const { data, error } = await createOrder(newOrder)
  
      if(error) throw Error('Erro ao cadastrar novo pedido.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['order[]']),
    onError: error => console.log('New order mutation error: ', error)
  }
)

export {
  useCreateOrderMutation
}
