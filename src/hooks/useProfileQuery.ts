import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { AddressProps, ProfileProps } from "../types"

type ProfileQueryProps = {
  data: ProfileProps;
  address: AddressProps;
}

const getProfile = async (): Promise<ProfileQueryProps> => {
  const user = supabase.auth.user()

  if(!user) throw new Error('Not authenticated')

  const { data: profileData, error: profileError } = await supabase
      .from<ProfileProps>('profiles')
      .select()
      .eq('user_id', user.id)
      .single()

  if(profileError) throw new Error(profileError.message)

  if(!profileData) throw new Error('Profile not found')

  const { data: profileAddress, error: profileAddressError } = await supabase
    .from<AddressProps>('addresses')
    .select()
    .eq('user_id', profileData.id)
    .single()
    
  if(profileAddressError) throw new Error(profileAddressError.message)

  if(!profileAddress) throw new Error('Profile address not found')

  return {
    data: profileData,
    address: profileAddress,
  }

}

const useProfileQuery = () => {
  return useQuery(['profile'], () => {
    return getProfile()

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useProfileQuery
}