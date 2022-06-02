import { getDraft } from ".."
import { queryClient } from "../../contexts/queryContext"

export const prefetchDraft = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['draft', id], 
    () => getDraft(id), {
      staleTime: 1000 * 60 * 10
    }
  )
}
