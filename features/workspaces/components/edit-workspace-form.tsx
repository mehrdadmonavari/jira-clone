"use client";

import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateWorkspaceSchema } from "../schemas";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Workspace } from "../types";
import { useUpdateWorkspace } from "../api/use-update-workspace";

interface EditWorkspaceFormProps {
   onCancle?: () => void;
   initialValues: Workspace;
}

export const EditWorkspaceForm: React.FC<EditWorkspaceFormProps> = ({
   onCancle,
   initialValues,
}) => {
   const router = useRouter();
   const { mutate, isPending } = useUpdateWorkspace();
   const inputRef = useRef<HTMLInputElement>(null);

   const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
      resolver: zodResolver(updateWorkspaceSchema),
      defaultValues: {
         ...initialValues,
         image: initialValues?.imageUrl ?? "",
      },
   });

   const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
      const finalValues = {
         ...values,
         image: values.image instanceof File ? values.image : "",
      };

      mutate(
         { form: finalValues, param: { workspaceId: initialValues?.$id } },
         {
            onSuccess: ({ data }) => {
               form.reset();
               router.push(`/workspaces/${data.$id}`);
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
         <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
            <Button
               onClick={
                  onCancle
                     ? onCancle
                     : () => router.push(`/workspaces/${initialValues.$id}`)
               }
               variant="secondary"
               size="sm">
               <ArrowLeftIcon className="size-4" />
               back
            </Button>
            <CardTitle className="text-xl fonr-bold">{initialValues?.name}</CardTitle>
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
                              <FormLabel>Workspace Name</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder="Enter workspace name" />
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
                                    <p className="text-sm">Workspace Icon</p>
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
                        Update Workspace
                     </Button>
                  </div>
               </form>
            </Form>
         </CardContent>
      </Card>
   );
};
