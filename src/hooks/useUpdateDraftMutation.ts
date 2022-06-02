import { useMutation } from "react-query";
import { queryClient } from "../contexts/queryContext"
import { Draft } from "../models";
import { updateDraft } from "../services";

export const useUpdateDraftMutation = () => useMutation (
  async (draft: Draft) => {
    const { data, error } = await updateDraft(draft)

    if(error) throw new Error(error.message)

    return data
  }, {    
    onSuccess: async response => {
      await queryClient.invalidateQueries(['draft', response[0].id]),
      await queryClient.invalidateQueries(['draft[]'])
    }
  }
) 
