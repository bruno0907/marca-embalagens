import { useQuery } from "react-query"
import { getDraft } from "../services"

export const useDraftQuery = (id: string) => useQuery(  
  ['draft', id], 
  async () => {
    if(!id) return
    return await getDraft(id)
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)
