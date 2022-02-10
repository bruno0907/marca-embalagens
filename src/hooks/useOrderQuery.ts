import { useQuery } from "react-query"
import { getOrder } from "../services"

export const useOrderQuery = (id: string) => useQuery(  
  ['order', id], 
  () => {
    if(!id) return
    return getOrder(id)
  }, {
    staleTime: 1000 * 60 * 10, //10minutes  
  }  
)
