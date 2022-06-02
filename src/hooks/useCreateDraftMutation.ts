import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateDraft } from "../models";
import { createDraft } from "../services";

export const useCreateDraftMutation = () => useMutation(
  async (draft: CreateDraft) => {
    try {
      const { data, error } = await createDraft(draft)
  
      if(error) throw Error(error.message)
  
      return data
      
    } catch (error) {
      throw error      
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['draft[]'])    
  }
)
