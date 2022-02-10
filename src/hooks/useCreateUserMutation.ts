import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { CreateAddress, CreateUser } from "../models";
import { createAddress, createUser, removeUser } from "../services";

type NewUserMutation = {
  userData: CreateUser;
  addressData: Omit<CreateAddress, 'user_id'>;
}

export const useCreateUserMutation = () => useMutation(
  async ({ userData, addressData }: NewUserMutation) => {
    try {
      const newUserData = await createUser(userData)
  
      if(newUserData.error) throw new Error('Error creating new user.')
  
      const userAddress = {
        user_id: newUserData.data[0].id,
        ...addressData
      }
  
      const newUserAddress = await createAddress(userAddress)
  
      if(newUserAddress.error) {
        await removeUser(newUserData.data[0].id)
  
        throw new Error('Error creating new user address.')
      }
  
      const mutationResult = {
        ...newUserData.data[0],
        ...newUserAddress.data[0]
      }
  
      return mutationResult
      
    } catch (error) {
      throw error
      
    }

  }, {    
    onSuccess: () => queryClient.invalidateQueries(['user[]'])    
  }
)
