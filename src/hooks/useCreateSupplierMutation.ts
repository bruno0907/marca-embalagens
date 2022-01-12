import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { createAddress } from "../services/createAddress"
import { NewAddress } from "./useCreateAddressMutation"
import { Supplier } from "./useSupplierQuery"

export type NewSupplier = {  
  user_id: string;
  natureza_cliente: string;
  produto: string;
  nome: string;
  razao_social: string;
  contato: string;
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;  
  outras_informacoes: string;
}  

const createSupplier = async (supplier: NewSupplier) => {
  return await supabase
    .from<Supplier>('suppliers')
    .insert(supplier)
}

const removeSupplier = async (id: string) => {
  return await supabase
    .from<Supplier>('suppliers')
    .delete()
    .eq('id', id)
}

type NewUserMutationProps = {
  supplierData: NewSupplier;
  addressData: Omit<NewAddress, 'user_id'>;
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
        await removeSupplier(newSupplier.data[0].id)
  
        throw Error('Erro ao cadastrar o endereço do fornecedor.')
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

export {
  useCreateSupplierMutation
}
