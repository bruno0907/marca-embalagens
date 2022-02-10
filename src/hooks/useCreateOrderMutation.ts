import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateOrder } from "../models"
import { createOrder } from "../services"

export const useCreateOrderMutation = () => useMutation(
  async (newOrder: CreateOrder) => {
    try {
      const { data, error } = await createOrder(newOrder)
  
      if(error) throw Error(error.message)
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['order[]'])
  }
)
