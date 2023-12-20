/* eslint-disable @typescript-eslint/no-explicit-any */
import { ControllerRenderProps } from 'react-hook-form'
import * as z from 'zod'
import { Input, InputProps } from '../ui/input'

export interface InputFormProps extends InputProps {
  field: ControllerRenderProps<z.infer<any>>
}

export function InputForm({ placeholder, type, field }: InputFormProps) {
  return <Input placeholder={placeholder} type={type} {...field} />
}
