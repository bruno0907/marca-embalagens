import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createAddress } from "../services/createAddress"
import { createSupplier } from "../services/createSupplier"
import { removeUser } from "../services/removeUser"
import { NewAddressProps, NewSupplierProps } from "../types"

type NewUserMutationProps = {
  supplierData: NewSupplierProps;
  addressData: Omit<NewAddressProps, 'user_id'>;
}

const useCreateSupplierMutation = () => useMutation(
  async ({ supplierData, addressData }: NewUserMutationProps) => {
    try {
      const newSupplier = await createSupplier(supplierData)
  
      if(newSupplier.error) throw Error('Erro ao cadastrar novo fornecedor.')
  
      const supplierAddress = {
        user_id: newSupplier.data[0].id,
        ...addressData
      }
  
      const newSupplierAddress = await createAddress(supplierAddress)
  
      if(newSupplierAddress.error) {
        await removeUser(newSupplier.data[0].id)
  
        throw Error('Erro ao cadastrar o endereço do fornecedor.')
      }
  
      const mutationResult = {
        ...newSupplier.data[0],
        ...newSupplierAddress.data[0]
      }
  
      return mutationResult
      
    } catch (error) {
      return error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['suppliers[]']),
    onError: error => console.log('New User Mutation Error: ', error)
  }
)

export {
  useCreateSupplierMutation
}
