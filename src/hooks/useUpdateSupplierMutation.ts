import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"

import { SupplierProps } from "../types"

const updateSupplier = async (supplier: SupplierProps) => {
  return await supabase
    .from<SupplierProps>('suppliers')    
    .update(supplier)
    .eq('id', supplier.id)
}

const useUpdateSupplierMutation = () => useMutation(
  async (supplier: SupplierProps) => {
    const { data, error } = await updateSupplier(supplier)

    if(error) throw Error('Erro ao atualizar o cadastro. Tente novamente.')

    return data
  }, {
    onSuccess: async supplier => {
      await queryClient.invalidateQueries(['supplier', supplier[0].id])
      await queryClient.invalidateQueries(['suppliers[]'])
    }
  }
)

export {
  useUpdateSupplierMutation
}
