import { useQuery } from "react-query"
import { supabase } from "../database/supabase"
import { Address } from "./useAddressQuery"

type ProfileQuery = {
  data: Profile;
  address: Address;
}

export type Profile = {
  id: string;
  user_id: string;    
  username: string;
  nome: string;
  razao_social: string;  
  cpf_cnpj: string;
  rg_ie: string;  
  email: string;
  telefone: string;
  celular: string;
  logo: string;
  situacao_cadastral: boolean;
}

const getProfile = async (): Promise<ProfileQuery> => {
  try {
    const user = supabase.auth.user()
  
    if(!user) throw new Error('User not authenticated')
    
    const { data: profileData, error: profileError } = await supabase
        .from<Profile>('profiles')
        .select()
        .eq('user_id', user.id)
        .single()    
    
    if(profileError) throw new Error(profileError.message)
    
    const { data: profileAddress, error: profileAddressError } = await supabase
      .from<Address>('addresses')
      .select()
      .eq('user_id', profileData.id)
      .single()
      
    if(profileAddressError) throw new Error(profileAddressError.message)
  
    if(!profileAddress) throw new Error('Profile address not found')
  
    return {
      data: profileData,
      address: profileAddress,
    }
    
  } catch (error) {
    throw error
    
  }
}

const useProfileQuery = () => useQuery(
  ['profile'], 
  () => getProfile(), {
    staleTime: 1000 * 10 * 60,
    useErrorBoundary: true,
  }
)

export {
  useProfileQuery
}
