import { supabase } from "../../infra/database/supabase";
import { CreateUser, User } from "../../models";

export const createUser = async (user: CreateUser) => {
  return await supabase
    .from<User>('users')
    .insert(user);
}