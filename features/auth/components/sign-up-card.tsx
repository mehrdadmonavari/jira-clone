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

interface SignUpCardProps {}

const formSchema = z.object({
   email: z.string().email(),
   password: z.string(),
});

export const SignUpCard: React.FC<SignUpCardProps> = () => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: { email: "", password: "" },
   });

   return (
      <Card className="w-full h-full md:w-[487px] border-none shadow-none">
         <CardHeader className="flex justify-center items-center text-center p-7">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
               By signing up, you agree to our{" "}
               <Link href="/privacy">
                  <span className="text-blue-700">Privacy Policy </span>
               </Link>
               and{" "}
               <Link href="terms">
                  <span className="text-blue-700">Terms of Service</span>
               </Link>
            </CardDescription>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-6">
            <form className="space-y-4">
               <Input
                  required
                  type="text"
                  value={""}
                  onChange={() => {}}
                  placeholder="Enter your name"
                  disabled={false}
               />
               <Input
                  required
                  type="email"
                  value={""}
                  onChange={() => {}}
                  placeholder="Enter email address"
                  disabled={false}
               />
               <Input
                  required
                  type="password"
                  value={""}
                  onChange={() => {}}
                  placeholder="Enter email password"
                  disabled={false}
                  min={8}
                  max={256}
               />
               <Button disabled={false} className="w-full" size="lg">
                  Login
               </Button>
            </form>
         </CardContent>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7 flex flex-col gap-y-4">
            <Button disabled={false} variant="secondary" className="w-full" size="lg">
               <FcGoogle className="mr-2 size-5" />
               Login with Google
            </Button>
            <Button disabled={false} variant="secondary" className="w-full" size="lg">
               <FaGithub className="mr-2 size-5" />
               Login with Github
            </Button>
         </CardContent>
      </Card>
   );
};
