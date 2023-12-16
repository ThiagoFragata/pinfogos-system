'use client'
import Image from 'next/image'
import { Menu } from '../molecules/Menu'

import logo from '@/assets/svg/logo.svg'

import { authChannel } from '@/context/authContext'
import { appFirebase } from '@/services/firebase/config'
import { ToastAction } from '@radix-ui/react-toast'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { ButtonSignOut } from '../atoms/ButtonSignOut'
import { ButtonDialog } from '../molecules/ButtonDialog'
import { useToast } from '../ui/use-toast'

export function Navbar() {
  const { toast } = useToast()
  const auth = getAuth(appFirebase)
  const { replace } = useRouter()

  async function Logout() {
    await signOut(auth)
      .then(() => {
        toast({
          description: 'Logout realizado',
        })
        destroyCookie(undefined, 'auth.token', { path: '/' })
        authChannel.postMessage('signOut')
        replace('/')
      })
      .catch(() => {
        toast({
          title: 'Error ao sair do sistema',
          description:
            'Tente novamente e se o problema persistir entre em conta com o suporte',
          action: <ToastAction altText="Suporte">Suporte</ToastAction>,
        })
      })
  }

  return (
    <div className="flex items-center justify-between">
      <Image src={logo} alt={'Parintins Show Fogos'} width={200} />

      <Menu />

      <ButtonDialog
        title="Deseja sair"
        description="Você realmente deseja sair de sua conta?"
        onPress={Logout}
      >
        <ButtonSignOut />
      </ButtonDialog>
    </div>
  )
}
