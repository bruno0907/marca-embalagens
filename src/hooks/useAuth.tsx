import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'

import { supabase } from "../services/supabase";

import { Session, AuthChangeEvent } from "@supabase/supabase-js";

import axios from "axios";

type AuthContextProps = {
  signIn: (values: AuthProps) => Promise<void>;
  signUp: (values: AuthProps) => Promise<void>;
  signOut: () => void;
  session: string;
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

  const [session, setSession] = useState('not-authenticated')

  const signUp = async (values: AuthProps) => {
    const { email, password } = values

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if(error) {
      throw new Error('O e-mail informado já está cadastrado')
    }

    return
  }
  
  const signIn = async (values: AuthProps) => {   
    const { email, password } = values

    const { error } = await supabase.auth.signIn({
      email,
      password
    })

    if(error) {
      throw new Error('E-mail ou senha inválidos')
    }

    return
  }

  const signOut = () => supabase.auth.signOut()

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)

      if (event === 'SIGNED_IN') {
        setSession('authenticated')
        router.push('/dashboard')
      }

      if (event === 'SIGNED_OUT') {
        setSession('not-authenticated')
        router.push('/')
      }
    })

    checkUser()

    return () => authListener.unsubscribe()    
  })

  async function handleAuthChange(event: AuthChangeEvent, session: Session) {
    await axios.post('/api/auth', {
      event,
      session
    })
  }

  function checkUser() {
    const user = supabase.auth.user()

    if (user) {
      setSession('authenticated')
    }
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      signOut,
      session
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
