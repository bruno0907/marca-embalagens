import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createOrder } from "../services/createOrder"

import { NewOrderProps } from "../types"

const useCreateOrderMutation = () => {
  return useMutation(
    async (newOrder: NewOrderProps) => {
      const { data, error } = await createOrder(newOrder)
  
      if(error) {
        throw Error('Erro ao cadastrar novo pedido.')
      }
  
      return data
  
    }, {    
      onSuccess: () => queryClient.invalidateQueries(['orders[]']),
      onError: error => console.log('New Order Mutation Error: ', error)
    }
  )
}

export {
  useCreateOrderMutation
}