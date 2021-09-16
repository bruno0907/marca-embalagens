import { useQuery } from "react-query"
import { getSuppliers } from "../controllers/getSuppliers"
import { getSuppliersWithFilter } from "../controllers/getSuppliersWIthFilter"

const useSuppliers = (pattern?: string) => {
  const queryKey = pattern ? ['suppliers[]', pattern] : 'suppliers[]'
  
  return useQuery(queryKey, () => {
    if(pattern) {
      return getSuppliersWithFilter(pattern)
    }
    return getSuppliers()
    
  }, {
    staleTime: 1000 * 60 * 10,
  })
}

export {
  useSuppliers,
  getSuppliers
}