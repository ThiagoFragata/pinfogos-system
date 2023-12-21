'use client'
import { queryClient } from '@/app/providers'
import notImg from '@/assets/svg/notImg.svg'
import { formattedMoney } from '@/functions/formattedMoney'
import { onlyNumbers } from '@/functions/onlyNumbers'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'
import { storage } from '@/services/firebase/config'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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

interface EditProductFormProps {
  product: ProductProps
}

const formSchemaEditProduct = z.object({
  name: z.string().min(1, 'Informe o nome do produto'),
  qtd: z.number().min(0, 'Informe a quantidade do produto'),
  value: z.string().min(1, 'Informe o valor do produto')
})

export default function EditProductForm({ product }: EditProductFormProps) {
  const { 'user.id': userID } = parseCookies()
  const { toast } = useToast()
  const { replace } = useRouter()
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

  const form = useForm<z.infer<typeof formSchemaEditProduct>>({
    resolver: zodResolver(formSchemaEditProduct),
    defaultValues: {
      name: product.name,
      qtd: 0,
      value: product.value
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: z.infer<typeof formSchemaEditProduct>) => {
      return api.put(`product?product-id=${product.id}`, {
        photo: thumbnail,
        qtd: product.qtd + values.qtd,
        name: values.name,
        value: values.value
      })
    },
    onSuccess: () => {
      toast({
        title: 'Sucesso',
        description: 'Produto atualizado no estoque'
      })

      queryClient.invalidateQueries({ queryKey: ['products'] })
      replace('/dashboard/product-stock')
    },
    onError: (e) => {
      toast({
        title: 'Error',
        description: e.message,
        variant: 'destructive'
      })
    }
  })

  async function onSubmit(values: z.infer<typeof formSchemaEditProduct>) {
    mutate(values)
  }

  return (
    <div className="flex gap-8 justify-between items-center">
      <Image
        src={product.photo ? product.photo : notImg}
        alt={product.name}
        className="border mx-auto"
        width={300}
        height={300}
      />

      <div className="flex-1 space-y-8">
        <div>
          <Label htmlFor="thumbnailProduct">{product.photo ? 'Atualizar thumbnail' : 'Adicionar thumbnail'}</Label>
          <Input
            id="thumbnailProduct"
            type="file"
            accept="png/jpg"
            className="border-dashed mt-2 mb-4"
            onChange={handleUploadingProduct}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <ItemForm label="Atualizar nome" type="text" placeholder="Informe o nome" field={{ ...field }} />
              )}
            />

            <div className="flex gap-4 w-full justify-between">
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Atualizar Valor</FormLabel>
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

              <FormField
                control={form.control}
                name="qtd"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Adicionar mais</FormLabel>
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
            </div>

            <div className="flex gap-2">
              <ButtonDefault label="Atualizar" type="submit" variant="default" loading={isPending} />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
