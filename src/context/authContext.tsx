'use client'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'
import { appFirebase } from '@/services/firebase/config'
import { User, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { destroyCookie, setCookie } from 'nookies'
import { ReactNode, createContext, useEffect, useState } from 'react'
interface CredentialsProps {
  email: string
  password: string

  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface AuthContextData {
  SignIn: (credentials: CredentialsProps) => void
  SignOut: () => void

  AuthenticatedGoogle: User | undefined
}
interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)
export let authChannel: BroadcastChannel

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast()
  const { replace } = useRouter()
  const auth = getAuth(appFirebase)

  const [AuthenticatedGoogle, setAuthenticatedGoogle] = useState<User>()

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signIn':
          replace('/dashboard/sales')
          break
        case 'signOut':
          destroyCookie(undefined, 'auth.token', { path: '/' })
          destroyCookie(undefined, 'user.auth', { path: '/' })
          replace('/')
          break
        default:
          break
      }
    }
  }, [replace])

  async function SignIn({ email, password, setLoading }: CredentialsProps) {
    setLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setAuthenticatedGoogle(user)

        toast({
          description: 'Login realizado com sucesso.'
        })

        setCookie(undefined, 'user.id', user.uid, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })
        setCookie(undefined, 'auth.token', user.refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/'
        })

        authChannel.postMessage('signIn')

        replace('/dashboard/sales')
      })
      .catch(() => {
        toast({
          description: 'Email e/ou senha inválidos!',
          variant: 'destructive'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function SignOut() {
    await signOut(auth)
      .then(() => {
        toast({
          description: 'Logout realizado'
        })
        destroyCookie(undefined, 'auth.token', { path: '/' })
        destroyCookie(undefined, 'user.id', { path: '/' })

        replace('/')
        authChannel.postMessage('signOut')
      })
      .catch(() => {
        toast({
          title: 'Error, tente novamente',
          description: 'Se o problema persistir entre em contato com o suporte',
          action: <ToastAction altText="Suporte">Suporte</ToastAction>
        })
      })
  }

  return <AuthContext.Provider value={{ SignIn, SignOut, AuthenticatedGoogle }}>{children}</AuthContext.Provider>
}
