import { useMutation } from "react-query";
import { queryClient } from "../contexts/queryContext"
import { Order } from "../models";
import { updateOrder } from "../services";

export const useUpdateOrderMutation = () => useMutation(
  async (order: Order) => {
    const { data, error } = await updateOrder(order)

    if(error) throw new Error(error.message)

    return data
  }, {    
    onSuccess: async response => {
      await queryClient.invalidateQueries(['order', response[0].id]),
      await queryClient.invalidateQueries(['order[]'])
    }
  }
) 
