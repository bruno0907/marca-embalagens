import { queryClient } from "../../contexts/queryContext"
import { getSupplier } from ".."

export const prefetchSupplier = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['supplier', id], 
    () => getSupplier(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}

