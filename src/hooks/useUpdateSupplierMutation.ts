import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { Supplier } from "./useSupplierQuery"

const updateSupplier = async (supplier: Supplier) => {
  return await supabase
    .from<Supplier>('suppliers')    
    .update(supplier)
    .eq('id', supplier.id)
}

const useUpdateSupplierMutation = () => useMutation(
  async (supplier: Supplier) => {
    const { data, error } = await updateSupplier(supplier)

    if(error) throw Error('Erro ao atualizar o cadastro. Tente novamente.')

    return data
  }, {
    onSuccess: async supplier => {
      await queryClient.invalidateQueries(['supplier', supplier[0].id])
      await queryClient.invalidateQueries(['supplier[]'])
    }
  }
)

export {
  useUpdateSupplierMutation
}
