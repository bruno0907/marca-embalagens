import { supabase } from "../../database/supabase"

export type Address = {
  id: string;
  user_id: string;
  endereco: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  complemento: string; 
  principal: boolean; 
}

export const getAddressService = async (id: string) => {  
  return await supabase
    .from<Address>('addresses')
    .select()
    .eq('id', id)
    .single()
}