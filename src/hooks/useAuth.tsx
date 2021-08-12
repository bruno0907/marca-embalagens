import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router'

import { supabase } from "../services/supabase";

import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import axios from "axios";

type AuthContextProps = {
  signIn: (values: SignInProps) => Promise<{
    error: Error
  }>;
  signUp: (values: SignUpProps) => Promise<{
    error: Error
  }>;
  signOut: () => void;
  session: string;
}

type AuthProviderProps = {
  children: ReactNode;  
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  email: string;
  password: string;
  password_verify: string;
}

const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter()

  const [session, setSession] = useState('not-authenticated')

  const signUp = async(values: SignUpProps) => {
    const { email, password } = values

    return await supabase.auth.signUp({
      email,
      password
    })
  }
  
  const signIn = async (values: SignInProps) => {   
    const { email, password } = values

    return await supabase.auth.signIn({
      email,
      password
    })
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
