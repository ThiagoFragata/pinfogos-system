<<<<<<< HEAD
import { ControllerRenderProps } from 'react-hook-form'
import * as z from 'zod'
import { formSchemaSignIn } from '../organisms/SignInForm'
import { Input, InputProps } from '../ui/input'

export interface InputFormProps extends InputProps {
=======
import { HTMLInputTypeAttribute } from 'react'
import { ControllerRenderProps } from 'react-hook-form'
import * as z from 'zod'
import { formSchemaSignIn } from '../organisms/SignInForm'
import { Input } from '../ui/input'

export interface InputFormProps {
  placeholder?: string
  type?: HTMLInputTypeAttribute | undefined
>>>>>>> main
  field: ControllerRenderProps<z.infer<typeof formSchemaSignIn>>
}

export function InputForm({ placeholder, type, field }: InputFormProps) {
  return <Input placeholder={placeholder} type={type} {...field} />
}
