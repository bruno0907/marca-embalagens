import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { updateAddress } from "../services/updateAddress"
import { AddressProps, ProfileProps } from "../types"

type UpdateProfileMutation = {
  profileData: ProfileProps;
  profileAddress: AddressProps;
}

const updateProfile = async (profile: ProfileProps) => {  
  return await supabase
    .from<ProfileProps>('profiles')
    .upsert(profile)
}

const useUpdateProfileMutation = () => useMutation(
  async ({ profileData, profileAddress }: UpdateProfileMutation) => {
    
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

export {
  useUpdateProfileMutation
}
