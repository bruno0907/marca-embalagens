import { supabase } from "../../infra/database/supabase";
import { CreateEstimate, Estimate } from "../../models";

export const createEstimate = async (estimate: CreateEstimate) => { 
  return await supabase
    .from<Estimate>('estimates')
    .insert(estimate);
}