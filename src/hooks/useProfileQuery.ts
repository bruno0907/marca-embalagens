import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { AddressProps, ProfileProps } from "../types"

const getProfile = async () => {
  const user = supabase.auth.user()

  if(!user) {
    return null
  }

  const { data: profileData } = await supabase
      .from<ProfileProps>('profiles')
      .select()
      .eq('user_id', user.id)
      .single()

    const { data: profileAddress } = await supabase
      .from<AddressProps>('addresses')
      .select()
      .eq('user_id', profileData.id)
      .single()

    return {
      data: profileData,
      address: profileAddress,
    }

}

const useProfileQuery = () => {
  return useQuery(['profile'], async () => {
    return await getProfile()

  }, {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  })
}

export {
  useProfileQuery
}