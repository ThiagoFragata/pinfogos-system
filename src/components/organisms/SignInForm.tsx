"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ButtonDefault } from "../atoms/ButtonDefault";
import { ItemForm } from "../molecules/ItemForm";
import { Form, FormField } from "../ui/form";

export const formSchemaSignIn = z.object({
  email: z
    .string()
    .min(1, "Digite seu e-mail")
    .email("Digite um e-mail válido!"),
  password: z.string().min(1, "Digite sua senha"),
});

export default function SignInForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchemaSignIn>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    alert("Submit");
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
              placeholder="Digite sua senha"
              field={{ ...field }}
            />
          )}
        />

        <ButtonDefault label="Entrar" className="w-full" />
      </form>
    </Form>
  );
}
