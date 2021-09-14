import { supabase } from "../services/supabase";
import { NewUserProps, UserProps } from "../types";

const newUser = async (user: NewUserProps) => {  
  return await supabase
    .from<UserProps>('users')
    .insert(user);
}

export {
  newUser
}