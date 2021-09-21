import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { supabase } from "../database/supabase";

import { Session, User } from "@supabase/supabase-js";

import axios from "axios";

type AuthContextProps = {
  signIn: (values: AuthProps) => Promise<Session | Error>;
  signUp: (values: AuthProps) => Promise<Session | User | Error>;
  signOut: () => Promise<unknown>;
  session: Session;
}

type AuthProviderProps = {
  children: ReactNode;  
}

type AuthProps = {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()
  const [session, setSession] = useState<Session>(() => {
    const data = supabase.auth.session()

    if(!data) {
      return null
    }

    return data
  })  

  const signUp = async (values: AuthProps) => {
    const { email, password } = values

    const { error, data } = await supabase.auth.signUp({
      email,
      password
    })

    if(error) {
      throw new Error('O e-mail informado já está cadastrado')
    }

    return data
  }
  
  const signIn = async (values: AuthProps) => {   
    const { email, password } = values

    const { error, data } = await supabase.auth.signIn({
      email,
      password
    })

    if(error) {
      throw new Error('E-mail ou senha inválidos')
    }

    return data
  }

  const signOut = async () => await supabase.auth.signOut()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      async function handleAuthChange() {
        await axios.post('/api/auth', {
          event,
          session
        })
      }
      handleAuthChange()
      
      if (event === 'SIGNED_IN') {
        setSession(session)
      }
      
      if (event === 'SIGNED_OUT') {
        setSession(null)
        router.push('/')
      }      
    })

    return () => authListener.unsubscribe()
  }, [router])

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      signOut,
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
