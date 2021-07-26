import { createClient } from "@supabase/supabase-js"

const URL = process.env.NEXT_PUBLIC_DATABASE_URL
const API = process.env.NEXT_PUBLIC_PUBLIC_API_KEY

const supabase = createClient(
  URL,
  API
)

export { supabase }