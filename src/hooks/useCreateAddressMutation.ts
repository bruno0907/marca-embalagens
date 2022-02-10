import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateAddress } from "../models"
import { createAddress } from '../services'

export const useCreateAddressMutation = () => useMutation(
  async (newAddress: CreateAddress) => {
    const { data, error } = await createAddress(newAddress)

    if(error) throw Error(error.message)

    return data

  }, {    
    onSuccess: address => queryClient.invalidateQueries(['address[]', address[0].user_id])    
  }
)
