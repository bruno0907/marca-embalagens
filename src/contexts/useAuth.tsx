import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { supabase } from "../database/supabase";

import { Session } from "@supabase/supabase-js";

import axios from "axios";

type AuthContextProps = {    
  session: Session;
}

type AuthProviderProps = {
  children: ReactNode;  
}

const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  
  const [session, setSession] = useState<Session>(() => {
    const data = supabase.auth.session()

    if(!data) return null

    return data
  })  

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      const handleAuthChange = async () => {
        await axios.post('/api/auth', {
          event,
          session
        })
      }
      handleAuthChange()
      
      if (event === 'SIGNED_IN') {
        setSession(session)
        return
      }
      
      if (event === 'SIGNED_OUT') {
        setSession(null)
        router.push('/')
        return
      }
    })

    return () => authListener.unsubscribe()

  }, [router])

  return (
    <AuthContext.Provider value={{
      session,      
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export {
  useAuth,
  AuthProvider
}
