import { supabase } from "../database/supabase"
import { NewProfileProps, ProfileProps } from "../types"

const createProfile = async (profile: NewProfileProps) => {
  return await supabase
    .from<ProfileProps>('profiles')
    .insert(profile)
}

export {
  createProfile
}
