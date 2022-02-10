import { useQuery } from "react-query"
import { getUser } from "../services"

export const useUserQuery = (id: string) => useQuery(
  ['user', id], 
  () => getUser(id), {
    staleTime: 1000 * 60 * 10    
  }
)
