"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { signInSchema } from "../schemas";
import { useLogin } from "../api/use-login";
import { signUpWithGithub } from "@/lib/oauth";

interface SignInCardProps {}

export const SignInCard: React.FC<SignInCardProps> = () => {
   const { mutate, isPending } = useLogin();

   const form = useForm<z.infer<typeof signInSchema>>({
      resolver: zodResolver(signInSchema),
      defaultValues: { email: "", password: "" },
   });

   const handleSubmit = (values: z.infer<typeof signInSchema>) => {
      mutate({ json: values });
   };

   return (
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
         <CardHeader className="flex justify-center items-center text-center p-7">
            <CardTitle className="text-2xl">Welcome back!</CardTitle>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-6">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                     name="email"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="text"
                                 placeholder="Enter email address"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     name="password"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="password"
                                 placeholder="Enter password"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button disabled={isPending} className="w-full" size="lg">
                     Login
                  </Button>
               </form>
            </Form>
         </CardContent>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7 flex flex-col gap-y-4">
            <Button disabled={isPending} variant="secondary" className="w-full" size="lg">
               <FcGoogle className="mr-2 size-5" />
               Login with Google
            </Button>
            <Button
               onClick={() => signUpWithGithub()}
               type="button"
               disabled={isPending}
               variant="secondary"
               className="w-full"
               size="lg">
               <FaGithub className="mr-2 size-5" />
               Login with Github
            </Button>
         </CardContent>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7 flex justify-center items-center">
            <p>Don't have an account?</p>
            <Link href="/sign-up">
               <span className="text-blue-700">&nbsp;Sign Up</span>
            </Link>
         </CardContent>
      </Card>
   );
};
