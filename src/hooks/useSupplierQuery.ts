import { useQuery } from "react-query"
import { getSupplier } from "../services"

export const useSupplierQuery = (id: string) => useQuery(
  ['supplier', id], 
  () => {
    if(!id) return
    return getSupplier(id)
  }, {
    staleTime: 1000 * 60 * 10 //10minutes    
  }
)
