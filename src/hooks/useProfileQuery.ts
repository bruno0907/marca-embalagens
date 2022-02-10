import { useQuery } from "react-query"
import { getProfile, getAddresses } from "../services"

export const useProfileQuery = () => useQuery(
  ['profile'], 
  async () => {
    const profile = await getProfile()

    if(profile.error) throw Error('Profile not found')

    const addresses = await getAddresses(profile.data?.id)
    
    if(addresses.error) throw Error('Address not found')

    return {
      profile: profile.data,
      addresses: addresses.data
    }
  }
)
