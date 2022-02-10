import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateAddress, CreateSupplier } from "../models"
import { createAddress, createSupplier, removeSupplier } from "../services/"

type NewUserMutationProps = {
  supplierData: CreateSupplier;
  addressData: Omit<CreateAddress, 'user_id'>;
}

export const useCreateSupplierMutation = () => useMutation(
  async ({ supplierData, addressData }: NewUserMutationProps) => {
    try {
      const newSupplier = await createSupplier(supplierData)
  
      if(newSupplier.error) throw Error('Error creating new supplier.')
  
      const supplierAddress = {
        user_id: newSupplier.data[0].id,
        ...addressData
      }
  
      const newSupplierAddress = await createAddress(supplierAddress)
  
      if(newSupplierAddress.error) {
        await removeSupplier(newSupplier.data[0].id)
  
        throw Error('Error creating new supplier address.')
      }
  
      const mutationResult = {
        ...newSupplier.data[0],
        ...newSupplierAddress.data[0]
      }
  
      return mutationResult
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['supplier[]']),
    onError: error => console.log('New supplier mutation error: ', error)
  }
)
