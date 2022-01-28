import { supabase } from "../../database/supabase"
import { Profile } from "../../hooks/useProfileQuery"

const updateProfileService = async (profile: Profile) => {  
  return await supabase
    .from<Profile>('profiles')
    .upsert(profile)
}

export {
  updateProfileService
}
