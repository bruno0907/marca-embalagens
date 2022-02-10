
import { queryClient } from "../../contexts/queryContext"
import { getAddress } from ".."


export const prefetchAddress = async (id: string) => await queryClient
  .prefetchQuery(
    ['address', id], 
    () => getAddress(id), {
      staleTime: 1000 * 10 * 10
    }
  )

