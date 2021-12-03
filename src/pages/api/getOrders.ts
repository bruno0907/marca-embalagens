import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../database/supabase";

type OrderQueryProps = {
  id: string;
  user_id: string;
  numero_pedido: number;
  created_at: Date;
  total: number;
  users: {
    id: string;
    nome: string;
  }
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {  
  try {
    const { user } = supabase.auth.session()

    if(!user) throw new Error('Not WithAuth')

    const { pattern } = request.body
    
    if(!pattern) {
      console.time()
      const { data, error } = await supabase
      .from<OrderQueryProps>('orders')
      .select(`
      id, 
      numero_pedido,
      created_at, 
      total,
      users ( nome )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      
      console.timeEnd()
      if(error) throw new Error(error.message)
      
      if(!data) throw new Error('No orders found')

      return response.status(200).json(data)
    }
    
    const { data, error } = await supabase
      .from<OrderQueryProps>('orders')
      .select(`
      id, 
      numero_pedido,
      created_at, 
      total,
      users ( nome )
      `)
      .eq('user_id', user.id)
      .match({ numero_pedido: pattern })
      .order('created_at', {
        ascending: false
      })
      
    if(error) throw new Error(error.message)

    if(!data) throw new Error('No orders found')

    response.status(200).json(data)

    return response.end()
    
  } catch (error) {
    return response.status(500).json({
      error: error
    })
  }
}