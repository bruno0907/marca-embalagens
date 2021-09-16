import { queryClient } from "../contexts/queryContext"
import { getUser } from "../hooks/useUserQuery"

const prefetchUser = async (id: string) => {
  return await queryClient.prefetchQuery(
    ['user', id], async () => await getUser(id)
  )
}

export {
  prefetchUser  
}