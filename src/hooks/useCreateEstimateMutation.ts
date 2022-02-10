import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateEstimate } from "../models";
import { createEstimate } from "../services";

export const useCreateEstimateMutation = () => useMutation(
  async (newEstimate: CreateEstimate) => {
    try {
      const { data, error } = await createEstimate(newEstimate)
  
      if(error) throw Error(error.message)
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['estimate[]'])    
  }
)
