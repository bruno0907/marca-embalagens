import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";

import { NewOrderProps, OrderProps } from "../types"

const createOrder = async (order: NewOrderProps) => { 
  return await supabase
    .from<OrderProps>('orders')
    .insert(order);
}

const useCreateOrderMutation = () => useMutation(
  async (newOrder: NewOrderProps) => {
    try {
      const { data, error } = await createOrder(newOrder)
  
      if(error) throw Error('Erro ao cadastrar novo pedido.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['orders[]']),
    onError: error => console.log('New Order Mutation Error: ', error)
  }
)

export {
  useCreateOrderMutation
}
