import { createContext, ReactNode } from "react";
import { useContext, useState } from "react";
import { api } from "../services/api";
import { supabase } from "../services/supabase";

type AuthContextProps = {
  signIn: (values: AuthProps) => Promise<SessionProps>
  session: string;
}

type SessionProps = string;

type AuthProviderProps = {
  children: ReactNode;
}

type AuthProps = {
  email: string;
  password: string;
}

const AuthContext = createContext({} as AuthContextProps)

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<SessionProps>('')

  const signIn = async ({ email, password }: AuthProps) => {    
    try {
      const response = await supabase.auth.signIn({
        email,
        password
      })

      if(!response) throw new Error('Nome de usuário ou senha inválidos')

      console.log(response)

      setSession('Authenticated')

      return session
    } catch (error) {
      throw new Error(error.message)
    }

  }
  return (
    <AuthContext.Provider value={{
      signIn,
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