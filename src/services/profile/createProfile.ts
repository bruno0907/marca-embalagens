import { supabase } from "../../infra/database/supabase"
import { CreateProfile, Profile } from "../../models"

export const createProfile = async (profile: CreateProfile) => {
  return await supabase
    .from<Profile>('profiles')   
    .insert(profile)
}
