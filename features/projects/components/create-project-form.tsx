"use client";

import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProjectSchema } from "../schemas";
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
import { useCreateProject } from "../api/use-create-project";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface CreateProjectFormProps {
   onCancle?: () => void;
}

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ onCancle }) => {
   const router = useRouter();
   const workspaceId = useWorkspaceId();
   const { mutate, isPending } = useCreateProject();
   const inputRef = useRef<HTMLInputElement>(null);

   const form = useForm<z.infer<typeof createProjectSchema>>({
      resolver: zodResolver(createProjectSchema.omit({ workspaceId: true })),
      defaultValues: {
         name: "",
      },
   });

   const onSubmit = (values: z.infer<typeof createProjectSchema>) => {
      const finalValues = {
         ...values,
         workspaceId,
         image: values.image instanceof File ? values.image : "",
      };

      mutate(
         { form: finalValues },
         {
            onSuccess: ({ data }) => {
               form.reset();
               router.push(`/workspaces/${workspaceId}/projects/${data.$id}`);
            },
         }
      );
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) form.setValue("image", file);
   };

   return (
      <Card className="w-full h-full border-none shadow-none">
         <CardHeader className="flex p-7">
            <CardTitle className="text-xl fonr-bold">Create a new project</CardTitle>
         </CardHeader>
         <div className="px-7 mb-7">
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
                              <FormLabel>Project Name</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Enter project name" />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                           <div className="flex flex-col gap-y-2">
                              <div className="flex items-center gap-x-5">
                                 {field.value ? (
                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                       <Image
                                          src={
                                             field.value instanceof File
                                                ? URL.createObjectURL(field.value)
                                                : field.value
                                          }
                                          fill
                                          className="object-cover"
                                          alt="Logo"
                                       />
                                    </div>
                                 ) : (
                                    <Avatar className="size-[72px]">
                                       <AvatarFallback>
                                          <ImageIcon className="size-[36px] text-neutral-400" />
                                       </AvatarFallback>
                                    </Avatar>
                                 )}
                                 <div className="flex flex-col">
                                    <p className="text-sm">Project Icon</p>
                                    <p className="text-sm text-muted-foreground">
                                       JPG, PNG, SVG or JPEG, max 1mb
                                    </p>
                                    <input
                                       className="hidden"
                                       type="file"
                                       accept=".jpg, .png, .jpeg, .svg"
                                       ref={inputRef}
                                       onChange={handleImageChange}
                                       disabled={isPending}
                                    />
                                    {field.value ? (
                                       <Button
                                          onClick={() => {
                                             field.onChange(null);
                                             if (inputRef.current)
                                                inputRef.current.value = "";
                                          }}
                                          disabled={isPending}
                                          type="button"
                                          variant="destructive"
                                          size="xs"
                                          className="w-fit mt-2">
                                          Remove Image
                                       </Button>
                                    ) : (
                                       <Button
                                          onClick={() => inputRef.current?.click()}
                                          disabled={isPending}
                                          type="button"
                                          variant="teritary"
                                          size="xs"
                                          className="w-fit mt-2">
                                          Upload Image
                                       </Button>
                                    )}
                                 </div>
                              </div>
                           </div>
                        )}
                     />
                  </div>
                  <DottedSeparator className="py-7" />
                  <div className="flex justify-between items-center">
                     <Button
                        onClick={onCancle}
                        disabled={isPending}
                        className={cn(!onCancle && "invisible")}
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
                        Create Project
                     </Button>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
