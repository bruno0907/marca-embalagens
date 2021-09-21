import { supabase } from "../database/supabase";
import { NewUserProps, UserProps } from "../types";

const createUser = async (user: NewUserProps) => {
  return await supabase
    .from<UserProps>('users')
    .insert(user);
}

export {
  createUser
}