import { queryClient } from "../../contexts/queryContext"
import { getOrder } from ".."

export const prefetchOrder = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['order', id], 
    () => getOrder(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}

