"use client" 

import type { FC } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/presentation/components/ui/form"

interface LoginFormProps {
   
}

import { z } from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { LoginValidation, loginSchema } from '@/presentation/schemas/login.schema';



export const LoginForm : FC<LoginFormProps> = ({  }) => {

   const form = useForm<LoginValidation>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "correo@correo.com",
         password: "Abc123"
      },
   })

   const onLogin = async (values: LoginValidation) => {

      const res = await signIn('credentials', {
         email: values.email,
         password: values.password,
         callbackUrl: "/",
         redirect: true,
      });

   }

   return (
      <div>
         
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                     <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                     <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit">Iniciar Sesión</Button>
            </form>
         </Form>

      </div>
   );
};
