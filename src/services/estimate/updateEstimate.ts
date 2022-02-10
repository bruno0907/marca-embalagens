import { supabase } from "../../infra/database/supabase"
import { Estimate } from "../../models"

export const updateEstimate = async (estimate: Estimate) => { 
  return await supabase
    .from<Estimate>('estimates')
    .update(estimate)
    .eq('id', estimate.id)
}