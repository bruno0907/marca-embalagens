import { supabase } from "../../infra/database/supabase"
import { Draft } from "../../models"

export const updateDraft = async (draft: Draft) => { 
  return await supabase
    .from<Draft>('drafts')
    .update(draft)
    .eq('id', draft.id)
}