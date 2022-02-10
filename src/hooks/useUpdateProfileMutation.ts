import { useMutation } from "react-query"
import { queryClient } from "../contexts/queryContext"

import { updateProfile, updateAddress } from "../services"
import { Address, Profile } from "../models"

type UpdateProfileMutation = {
  profileData: Profile;
  profileAddress: Address;
}

export const useUpdateProfileMutation = () => useMutation(
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
