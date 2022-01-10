import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { supabase } from "../database/supabase"
import { updateAddress } from "../services/updateAddress"
import { AddressProps } from "../types"
import { Profile } from "./useProfileQuery"

type UpdateProfileMutation = {
  profileData: Profile;
  profileAddress: AddressProps;
}

const updateProfile = async (profile: Profile) => {  
  return await supabase
    .from<Profile>('profiles')
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
