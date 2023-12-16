import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { ReactNode, createContext, useContext, useEffect } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({})

export let authChannel: BroadcastChannel

export function AuthProvider({ children }: AuthProviderProps) {
  const { replace } = useRouter()
  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signIn':
          replace('/dashboard/sales')
          break
        case 'signOut':
          destroyCookie(undefined, 'auth.token', { path: '/' })
          replace('/')
          break
        default:
          break
      }
    }
  }, [replace])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
