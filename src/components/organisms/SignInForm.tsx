"use client";
import { appFirebase } from "@/services/firebase/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchemaSignIn>>({
    resolver: zodResolver(formSchemaSignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchemaSignIn>) {
    setLoading(true);

    const auth = getAuth(appFirebase);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      })
      .finally(() => {
        setLoading(false);
      });
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

        <ButtonDefault
          label={!loading ? "Entrar" : "Enviando"}
          className="w-full"
        />
      </form>
    </Form>
  );
}
