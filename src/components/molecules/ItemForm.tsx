'use client'
import { InputForm, InputFormProps } from '../atoms/InputForm'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'

interface ItemFormProps extends InputFormProps {
  label: string
  description?: string
}

export function ItemForm({
  label,
  description,
  field,
  ...rest
}: ItemFormProps) {
  return (
    <FormItem className="text-left">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <InputForm field={{ ...field }} {...rest} />
      </FormControl>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  )
}
