import { supabase } from '../../infra/database/supabase'

export const uploadFile = async (file: File, userId: string) => {
  return await supabase.storage
    .from('public')
    .upload(`${userId}/${Date.now()}_${file.name}`, file)
}
