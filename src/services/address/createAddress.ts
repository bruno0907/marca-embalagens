import { supabase } from "../../infra/database/supabase";

import { CreateAddress } from "../../models";

export const createAddress = async (address: CreateAddress) => { 
  return await supabase
    .from<CreateAddress>('addresses')
    .insert(address);
}
