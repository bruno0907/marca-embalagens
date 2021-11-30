import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";

const createOrder = async (order: NewOrderProps) => { 
  return await supabase
    .from<OrderProps>('orders')
    .insert(order);
}

import { NewOrderProps, OrderProps } from "../types"

const useCreateOrderMutation = () => useMutation(
  async (newOrder: NewOrderProps) => {
    try {
      const { data, error } = await createOrder(newOrder)
  
      if(error) throw Error('Erro ao cadastrar novo pedido.')
  
      return data
      
    } catch (error) {
      return error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['orders[]']),
    onError: error => console.log('New Order Mutation Error: ', error)
  }
)

export {
  useCreateOrderMutation
}
