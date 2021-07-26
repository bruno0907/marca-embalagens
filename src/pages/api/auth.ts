import { createClient } from '@supabase/supabase-js'
import { NextApiRequest, NextApiResponse } from 'next'

const {
  DATABASE_URL,
  PUBLIC_API_KEY
} = process.env

const supabase = createClient(
  DATABASE_URL,
  PUBLIC_API_KEY
)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body

    const response = await supabase.auth.signIn({
      email,
      password
    })

    if(!response) throw new Error('Usuário ou senha inválidos')

    return response
  } catch (error) {
    
  }
}

export default handler