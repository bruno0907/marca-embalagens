import { useQuery } from "react-query"
import { getUsers } from "../controllers/getUsers"
import { getUsersWithFilter } from "../controllers/getUsersWIthFilter"


const useUsers = (pattern?: string) => {
  const queryKey = pattern ? ['user[]', pattern] : 'user[]'
  
  return useQuery(queryKey, () => {
    if(pattern) {
      return getUsersWithFilter(pattern)
    }
    return getUsers()
    
  }, {
    staleTime: 1000 * 60 * 10,
  })
}

export {
  useUsers,
  getUsers
}