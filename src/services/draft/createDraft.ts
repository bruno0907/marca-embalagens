import { supabase } from "../../infra/database/supabase";
import { CreateDraft, Draft } from "../../models";

export const createDraft = async (draft: CreateDraft) => { 
  return await supabase
    .from<Draft>('drafts')
    .insert(draft);
}