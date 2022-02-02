import { useMutation } from "react-query";
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase";

import { Estimate } from "./useEstimatesQuery";

const updateEstimate = async (estimate: Estimate) => { 
  return await supabase
    .from<Estimate>('estimates')
    .update(estimate)
    .eq('id', estimate.id)
}

export const useUpdateEstimateMutation = () => useMutation (
  async (estimate: Estimate) => {
    const { data, error } = await updateEstimate(estimate)

    if(error) throw new Error('Erro ao atualizar o orçamento')

    return data
  }, {    
    onSuccess: async response => {
      await queryClient.invalidateQueries(['estimate', response[0].id]),
      await queryClient.invalidateQueries(['estimate[]'])
    },
    onError: error => console.log('New estimate mutation error: ', error)
  }
) 
