import { supabase } from "../database/supabase";

export type NewAddress = {  
  user_id: string;
  endereco: string | undefined;
  bairro: string | undefined;
  cidade: string | undefined;
  estado: string | undefined;
  cep: string | undefined;
  complemento: string | undefined;  
  principal: boolean | undefined;
}

export const createAddressService = async (address: NewAddress) => { 
  return await supabase
    .from<NewAddress>('addresses')
    .insert(address);
}
