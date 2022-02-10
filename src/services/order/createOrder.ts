import { supabase } from "../../infra/database/supabase";
import { CreateOrder, Order } from "../../models";

export const createOrder = async (order: CreateOrder) => { 
  return await supabase
    .from<Order>('orders')
    .insert(order);
}