import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { AddressProps, SupplierProps } from "../types"

const getSupplier = async (id: string | string[]) => {
  if(!id) {
    return null
  }    
  
  const { data: supplier, error: supplierError } = await supabase
    .from<SupplierProps>('suppliers')
    .select()
    .eq('id', String(id))
    .single()

    if(supplierError) {
      throw new Error('Fornecedor não encontrado.')
    }

    const { data: addresses, error: addressesError } = await supabase
      .from<AddressProps>('addresses')
      .select()
      .eq('user_id', supplier.id)

    if(addressesError) {
      throw new Error('Endereços do fornecedor não encontrados.')
    }

    return {
      supplier,
      addresses
    }
}

const useSupplierQuery = (id: string | string[]) => {
  return useQuery(['supplier', id], async () => await getSupplier(id), {
    staleTime: 1000 * 60 * 10, //10minutes
    useErrorBoundary: true
  })
}

export {
  getSupplier,
  useSupplierQuery
}