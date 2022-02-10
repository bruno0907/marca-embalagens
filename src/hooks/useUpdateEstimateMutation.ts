import { useMutation } from "react-query";
import { queryClient } from "../contexts/queryContext"
import { Estimate } from "../models";
import { updateEstimate } from "../services";

export const useUpdateEstimateMutation = () => useMutation (
  async (estimate: Estimate) => {
    const { data, error } = await updateEstimate(estimate)

    if(error) throw new Error(error.message)

    return data
  }, {    
    onSuccess: async response => {
      await queryClient.invalidateQueries(['estimate', response[0].id]),
      await queryClient.invalidateQueries(['estimate[]'])
    }
  }
) 
