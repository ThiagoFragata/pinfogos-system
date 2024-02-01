'use client'
import { queryClient } from '@/app/providers'
import { formattedMoney } from '@/functions/formattedMoney'
import { onlyNumbers } from '@/functions/onlyNumbers'
import { api } from '@/services/axios/api'
import { storage } from '@/services/firebase/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { ButtonDefault } from '../atoms/ButtonDefault'
import { ItemForm } from '../molecules/ItemForm'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useToast } from '../ui/use-toast'

export const formSchemaAddProduct = z.object({
  name: z.string().min(1, 'Informe o nome do produto'),
  qtd: z.number().min(1, 'Informe a quantidade do produto'),
  value: z.string().min(1, 'Informe o valor do produto')
})

export default function CreateProductsForm() {
  const { 'user.id': userID } = parseCookies()
  const { toast } = useToast()
  const [thumbnail, setThumbnail] = useState<string>()

  function handleUploadingProduct() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pictureInput: any = document.getElementById('thumbnailProduct')
    const selectedFile = pictureInput.files[0] ?? null

    if (selectedFile !== null) {
      const storageRef = ref(storage, `thumbnails/${userID}/${selectedFile.name}`)

      uploadBytes(storageRef, selectedFile)
        .then(async (snapshot) => {
          toast({
            title: 'Sucesso',
            description: 'Upload realizado com sucesso!'
          })
          setThumbnail(await getDownloadURL(snapshot.ref))
        })
        .catch((e) => {
          console.log('ERR: ', e)
        })
    } else {
      toast({
        title: 'Error',
        description: 'Selecione uma foto do produto!',
        variant: 'default'
      })
    }
  }

  const form = useForm<z.infer<typeof formSchemaAddProduct>>({
    resolver: zodResolver(formSchemaAddProduct),
    defaultValues: {
      name: '',
      value: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchemaAddProduct>) => {
      return api.post('/product', { photo: thumbnail, ...values })
    },
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        description: 'Produto adicionado no estoque'
      })

      queryClient.invalidateQueries({ queryKey: ['products-sales'] })
    },
    onError: (e) => {
      toast({
        title: 'Error',
        description: e.message,
        variant: 'destructive'
      })
    }
  })

  async function onSubmit(values: z.infer<typeof formSchemaAddProduct>) {
    mutate(values)
  }

  return (
    <div>
      <div className="mb-4">
        <Label htmlFor="thumbnailProduct">Foto do produto</Label>
        <Input
          id="thumbnailProduct"
          type="file"
          accept="png/jpg"
          className="border-dashed"
          onChange={handleUploadingProduct}
        />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <ItemForm label="Produto" type="text" placeholder="Informe o nome" field={{ ...field }} />
            )}
          />

          <div className="flex gap-4 w-full justify-between">
            <FormField
              control={form.control}
              name="qtd"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite a quantidade"
                      value={field.value}
                      onChange={(i) => field.onChange(Number(onlyNumbers(i.target.value)))}
                      prefix={'R$ '}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o valor"
                      value={field.value}
                      onChange={(i) => field.onChange(formattedMoney(i.target.value))}
                      prefix={'R$ '}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <ButtonDefault label="Cadastrar" type="submit" variant="default" loading={isPending} />
          </div>
        </form>
      </Form>
    </div>
  )
}
