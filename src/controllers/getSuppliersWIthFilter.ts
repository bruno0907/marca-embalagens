import { supabase } from "../services/supabase"
import { UserProps } from "../types"


const getSuppliersWithFilter = async (pattern: string) => { 
  const user = supabase.auth.user()
  
  const { data } = await supabase
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)
    .eq('tipo_cliente', 'Fornecedores')
    .ilike('nome', `${pattern}%`)
    .order('nome')

  return data
}

export { getSuppliersWithFilter }
