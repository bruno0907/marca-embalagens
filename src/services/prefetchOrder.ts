import { queryClient } from "../contexts/queryContext"
import { getOrder } from "../hooks/useOrderQuery"

const prefetchOrder = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['order', id], 
    () => getOrder(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}

export {
  prefetchOrder  
}
