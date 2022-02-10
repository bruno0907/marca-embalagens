import { useQuery } from "react-query"
import { getSuppliers } from "../services"

export const useSuppliersQuery = (pattern?: string) => {
  const queryKey = pattern ? ['supplier[]', pattern] : 'supplier[]'
  
  return useQuery(
    queryKey, 
    () => !pattern ? getSuppliers(): getSuppliers(pattern), {
      staleTime: 1000 * 60 * 10
    }
  )
}
