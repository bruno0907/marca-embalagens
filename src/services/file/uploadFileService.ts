import { supabase } from '../../database/supabase'

const uploadFileService = async (file: File, userId: string) => {
  return await supabase.storage
    .from('public')
    .upload(`${userId}/${Date.now()}_${file.name}`, file)
}

export { uploadFileService }