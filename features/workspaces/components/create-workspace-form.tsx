"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schemas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DottedSeparator } from "@/components/dotted-separator";
import { useForm } from "react-hook-form";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspaces } from "../api/use-create-workspaces";

interface CreateWorkspaceFormProps {
   onCancle?: () => void;
}

export const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({ onCancle }) => {
   const { mutate, isPending } = useCreateWorkspaces();

   const form = useForm<z.infer<typeof createWorkspaceSchema>>({
      resolver: zodResolver(createWorkspaceSchema),
      defaultValues: {
         name: "",
      },
   });

   const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
      mutate({ json: values });
   };

   return (
      <Card className="w-full h-full border-none shadow-none">
         <CardHeader className="flex p-7">
            <CardTitle className="text-xl fonr-bold">Create a new workspace</CardTitle>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="px-7">
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-y-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Workspace Name</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Enter workspace name" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DottedSeparator className="py-7" />
                  <div className="flex justify-between items-center">
                     <Button
                        onClick={onCancle}
                        disabled={isPending}
                        type="button"
                        variant="secondary"
                        size="lg">
                        Cancle
                     </Button>
                     <Button
                        disabled={isPending}
                        type="submit"
                        variant="primary"
                        size="lg">
                        Create Workspace
                     </Button>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
