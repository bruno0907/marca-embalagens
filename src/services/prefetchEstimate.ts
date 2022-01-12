import { queryClient } from "../contexts/queryContext"
import { getEstimate } from "../hooks/useEstimateQuery"


const prefetchEstimate = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['estimate', id], 
    () => getEstimate(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}

export {
  prefetchEstimate
}
