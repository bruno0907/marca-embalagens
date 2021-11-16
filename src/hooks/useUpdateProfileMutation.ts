import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { AddressProps, NewProfileProps, ProfileProps } from "../types"

type UpdateProfileMutation = {
  profileData: ProfileProps;
  profileAddress: AddressProps;
}

const updateProfile = async (profile: ProfileProps) => {  
  return await supabase
    .from<ProfileProps>('profiles')
    .upsert(profile)
}

const createProfile = async (profile: NewProfileProps) => {
  return await supabase
    .from<ProfileProps>('profiles')
    .insert(profile)
}

const removeProfile = async (id: string) => {
  return await supabase
    .from<ProfileProps>('profiles')
    .delete()
    .eq('id', id)
}

const updateAddress = async (address: AddressProps) => {
  const addressExists = await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('id', address.id)
    .single()

  if(addressExists.error) {
    throw new Error('Endereço não encontrado!')
  }
  
  return await supabase
    .from<AddressProps>('addresses')
    .upsert(address)
    .eq('id', address.id)
  
}

const useUpdateProfileMutation = () => {
  return useMutation(
    async ({profileData, profileAddress }: UpdateProfileMutation) => {
      
      const updatedProfile = await updateProfile(profileData)
      const updatedAddress = await updateAddress(profileAddress)

      return {
        ...updatedProfile.data[0],
        ...updatedAddress.data[0]
      }      
    }, {
      onSuccess: async () => await queryClient.invalidateQueries('profile')
    }
  )
}

export {
  useUpdateProfileMutation
}