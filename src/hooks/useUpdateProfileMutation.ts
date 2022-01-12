import { supabase } from "../database/supabase"
import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { updateAddress } from "../services/updateAddress"
import { Address } from "./useAddressQuery"
import { Profile } from "./useProfileQuery"

type UpdateProfileMutation = {
  profileData: Profile;
  profileAddress: Address;
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
