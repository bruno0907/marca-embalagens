import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { AddressProps, ProfileProps } from "../types"

const useProfileQuery = () => {
  const user = supabase.auth.user()

  return useQuery(['profile'], async () => {
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
  })
}

export {
  useProfileQuery
}