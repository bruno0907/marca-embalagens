import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const user = supabase.auth.user()

const getUsers = async () => {
  const { data } = await supabase    
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)
    .eq('tipo_cliente', 'Cliente')    
    .order('nome')

  return data
}

export { getUsers }