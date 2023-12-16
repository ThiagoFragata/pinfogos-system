'use client'
import { authChannel } from '@/context/authContext'
import { appFirebase } from '@/services/firebase/config'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { setCookie } from 'nookies'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ButtonDefault } from '../atoms/ButtonDefault'
import { ItemForm } from '../molecules/ItemForm'
import { Form, FormField } from '../ui/form'
import { useToast } from '../ui/use-toast'

export const formSchemaSignIn = z.object({
  email: z
    .string()
    .min(1, 'Digite seu e-mail')
    .email('Digite um e-mail válido!'),
  password: z.string().min(1, 'Digite sua senha'),
})

export default function SignInForm() {
  const { toast } = useToast()
  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchemaSignIn>) {
    const auth = getAuth(appFirebase)

    setLoading(true)
    setPersistence(auth, browserSessionPersistence)
      .then(async () => {
        const user = (
          await signInWithEmailAndPassword(auth, values.email, values.password)
        ).user

        toast({
          description: 'Login realizado com sucesso.',
        })

        setCookie(undefined, 'auth.token', user.refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/',
        })

        authChannel.postMessage('signIn')

        replace('/dashboard/sales')
      })
      .catch(() => {
        toast({
          description: 'Email e/ou senha inválidos!',
          variant: 'destructive',
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <ItemForm
              label="E-mail"
              placeholder="Digite seu e-mail"
              field={{ ...field }}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <ItemForm
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              field={{ ...field }}
            />
          )}
        />

        <ButtonDefault loading={loading} label="Entrar" className="w-full" />
      </form>
    </Form>
  )
}
