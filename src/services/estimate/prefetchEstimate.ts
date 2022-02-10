import { getEstimate } from ".."
import { queryClient } from "../../contexts/queryContext"

export const prefetchEstimate = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['estimate', id], 
    () => getEstimate(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}
