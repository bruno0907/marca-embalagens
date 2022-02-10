import { useQuery } from "react-query"
import { getEstimates } from "../services"

export const useEstimatesQuery = (pattern?: number) => {
  const queryKey = pattern ? ['estimate[]', pattern] : ['estimate[]']

  return useQuery(
    queryKey, 
    () => !pattern ? getEstimates() : getEstimates(pattern), {
      staleTime: 1000 * 10 * 60,      
    }
  )
}
