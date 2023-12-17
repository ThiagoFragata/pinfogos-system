import { ControllerRenderProps } from 'react-hook-form'
import * as z from 'zod'
import { formSchemaSignIn } from '../organisms/SignInForm'
import { Input, InputProps } from '../ui/input'

export interface InputFormProps extends InputProps {
  field?: ControllerRenderProps<z.infer<typeof formSchemaSignIn>>
}

export function InputForm({ placeholder, type, field }: InputFormProps) {
  return <Input placeholder={placeholder} type={type} {...field} />
}
