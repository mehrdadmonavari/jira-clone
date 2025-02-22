"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { signUpSchema } from "../schemas";
import { useRegister } from "../api/use-register";

interface SignUpCardProps {}

export const SignUpCard: React.FC<SignUpCardProps> = () => {
   const { mutate, isPending } = useRegister();

   const form = useForm<z.infer<typeof signUpSchema>>({
      resolver: zodResolver(signUpSchema),
      defaultValues: { name: "", email: "", password: "" },
   });

   const handleSubmit = (values: z.infer<typeof signUpSchema>) => {
      mutate({ json: values });
   };

   return (
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
         <CardHeader className="flex justify-center items-center text-center p-7">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
               By signing up, you agree to our&nbsp;
               <Link href="/privacy">
                  <span className="text-blue-700">Privacy Policy </span>
               </Link>
               and&nbsp;
               <Link href="terms">
                  <span className="text-blue-700">Terms of Service</span>
               </Link>
            </CardDescription>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-6">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                     name="name"
                     control={form.control}
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <Input
                                 {...field}
                                 type="text"
                                 placeholder="Enter your name"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
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
                     Register
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
            <Button disabled={isPending} variant="secondary" className="w-full" size="lg">
               <FaGithub className="mr-2 size-5" />
               Login with Github
            </Button>
         </CardContent>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7 flex justify-center items-center">
            <p>Already have an account?</p>
            <Link href="/sign-in">
               <span className="text-blue-700">&nbsp;Sign In</span>
            </Link>
         </CardContent>
      </Card>
   );
};
