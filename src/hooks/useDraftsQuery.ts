import { useQuery } from "react-query"
import { getDrafts } from "../services"

export const useDraftsQuery = (pattern?: number) => {
  const queryKey = pattern ? ['draft[]', pattern] : ['draft[]']

  return useQuery(
    queryKey, 
    () => !pattern ? getDrafts() : getDrafts(pattern), {
      staleTime: 1000 * 10 * 60,      
    }
  )
}
