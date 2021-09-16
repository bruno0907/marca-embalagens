import { supabase } from "../services/supabase"
import { UserProps } from "../types"


const getSuppliers = async () => {  
  const user = supabase.auth.user()

  const { data } = await supabase
    .from<UserProps>('users')
    .select('*')
    .eq('user_id', user.id)
    .eq('tipo_cliente', 'Fornecedor')    
    .order('nome')

  return data
}

export { getSuppliers }