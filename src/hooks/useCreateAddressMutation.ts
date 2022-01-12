import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { createAddress } from "../services/createAddress"

export type NewAddress = {  
  user_id: string;
  endereco: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  cep: string | undefined;
  complemento: string | undefined;  
  principal: boolean | undefined;
}

const useCreateAddressMutation = () => useMutation(
  async (newAddress: NewAddress) => {
    try {
      const { data, error } = await createAddress(newAddress)
  
      if(error) throw Error('Erro ao cadastrar novo endereço.')
  
      return data
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: address => queryClient.invalidateQueries(['address[]', address[0].user_id]),
    onError: error => console.log('New product mutation error: ', error)
  }
)

export {
  useCreateAddressMutation
}
