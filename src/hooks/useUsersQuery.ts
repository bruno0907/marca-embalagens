import { useQuery } from "react-query"
import { getUsers } from "../services"

export const useUsersQuery = (query?: string) => {
  const queryKey = query ? ['user[]', query] : 'user[]'
  
  return useQuery(
    queryKey, 
      () => !query ? getUsers() : getUsers(query), {
      staleTime: 1000 * 60 * 10
    }
  )
}
