import { useQuery } from "react-query"
import { getEstimate } from "../services"

export const useEstimateQuery = (id: string) => useQuery(  
  ['estimate', id], 
  async () => {
    if(!id) return
    return await getEstimate(id)
  }, {
    staleTime: 1000 * 60 * 10, //10minutes
  }
)
