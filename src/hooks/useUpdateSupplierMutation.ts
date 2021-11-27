import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { updateSupplier } from "../services/updateSupplier"
import { SupplierProps } from "../types"

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
