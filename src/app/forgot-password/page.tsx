'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ButtonBack } from '@/components/atoms/ButtonBack'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'Campo e-mail é obrigatório!'
    })
    .email('Insira um e-mail válido!')
})

export default function Page() {
  const { back } = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const auth = getAuth()
    const redirectURL = 'https://sistema.parintinsshowfogos.com.br/'

    sendPasswordResetEmail(auth, data.email, {
      url: redirectURL
    })
      .then(() => {
        toast({
          title: 'E-mail enviado com sucesso',
          description: 'Consulte sua caixa de entrada para prosseguir com a recuperação!'
        })
        back()
      })
      .catch((error) => {
        toast({
          title: `Error code: ${error.code}}`,
          description: error.message
        })
      })
  }

  return (
    <div className="flex flex-col items-center justify-center max-w-md min-h-screen mx-auto dark:border dark:border-neutral-950">
      <div className="flex items-center w-full gap-4 mb-8">
        <ButtonBack />
        <div>
          <h2 className="text-xl font-bold">Recuperação de conta</h2>
          <p>Informe seu e-mail</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu e-mail" type="email" {...field} />
                </FormControl>
                <FormDescription>
                  Enviaremos uma mensagem para o e-mail informado com as instruções de recuperação de conta
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </div>
  )
}
