import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"
import { updateAddress } from "../services/updateAddress"

import { updateProfileService } from "../services/profile/updateProfileService"
import { Profile } from "../services/profile/getProfileService"
import { Address } from "../services/address/getAddressService"

type UpdateProfileMutation = {
  profileData: Profile;
  profileAddress: Address;
}

export const useUpdateProfileMutation = () => useMutation(
  async ({ profileData, profileAddress }: UpdateProfileMutation) => {
    
    const updatedProfile = await updateProfileService(profileData)
    const updatedAddress = await updateAddress(profileAddress)

    return {
      ...updatedProfile.data[0],
      ...updatedAddress.data[0]
    }      
  }, {
    onSuccess: async () => await queryClient.invalidateQueries('profile')
  }
)
