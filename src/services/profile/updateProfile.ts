import { supabase } from "../../infra/database/supabase"
import { Profile } from "../../models"

export const updateProfile = async (profile: Profile) => {  
  return await supabase
    .from<Profile>('profiles')
    .upsert(profile)
}

