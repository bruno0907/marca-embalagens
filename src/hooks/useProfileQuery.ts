import { useQuery, UseQueryResult } from "react-query"
import { Address } from "../services/address/getAddressService"
import { getAddressesService } from "../services/addresses/getAddressesService"
import { getProfileService, Profile } from "../services/profile/getProfileService"

type ProfileQuery = {
  profile: Profile;
  addresses: Address[];
}

export const useProfileQuery = (): UseQueryResult<ProfileQuery> => useQuery(
  ['profile'], 
  async () => {
    const profile = await getProfileService()

    if(profile.error) throw Error('Profile not found')

    const address = await getAddressesService(profile.data?.id)
    
    if(address.error) throw Error('Address not found')

    const response: ProfileQuery = {
      profile: profile.data,
      addresses: address.data
    }

    return response

  }, {
    staleTime: 1000 * 10 * 60
  }
)
