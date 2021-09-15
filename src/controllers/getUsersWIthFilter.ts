import { supabase } from "../services/supabase"
import { UserProps } from "../types"

const user = supabase.auth.user()

const getUsersWithFilter = async (pattern: string) => { 
  const { data } = await supabase
    .from<UserProps>('users')
    .select()
    .eq('user_id', user.id)
    .eq('tipo_cliente', 'Cliente')
    .ilike('nome', `${pattern}%`)
    .order('nome')

  return data
}

export { getUsersWithFilter }
