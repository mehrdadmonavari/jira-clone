"use client";

import React, { useRef } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
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
import { ArrowLeftIcon, CopyIcon, ImageIcon } from "lucide-react";
import { Project } from "../types";
import { updateProjectSchema } from "../schemas";
import { useConfirm } from "@/hooks/use-confirm";
import { useUpdateProject } from "../api/use-update-project";
import { useDeleteProject } from "../api/use-delete-project";

interface EditProjectFormProps {
   onCancle?: () => void;
   initialValues: Project;
}

export const EditProjectForm: React.FC<EditProjectFormProps> = ({
   onCancle,
   initialValues,
}) => {
   const router = useRouter();
   const { mutate, isPending } = useUpdateProject();
   const { mutate: deleteProject, isPending: isDeletingProject } = useDeleteProject();
   const inputRef = useRef<HTMLInputElement>(null);

   const [DeleteDialog, confirmDelete] = useConfirm(
      "Delete Project",
      "this action cannot be undone",
      "destructive"
   );

   const form = useForm<z.infer<typeof updateProjectSchema>>({
      resolver: zodResolver(updateProjectSchema),
      defaultValues: {
         ...initialValues,
         image: initialValues?.imageUrl ?? "",
      },
   });

   const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
      const finalValues = {
         ...values,
         image: values.image instanceof File ? values.image : "",
      };

      mutate({ form: finalValues, param: { projectId: initialValues?.$id } });
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) form.setValue("image", file);
   };

   const handleDelete = async () => {
      const ok = await confirmDelete();
      if (!ok) return;

      deleteProject(
         { param: { projectId: initialValues.$id } },
         {
            onSuccess: () => {
               window.location.href = `/workspaces/${initialValues.workspaceId}`;
            },
         }
      );
   };

   return (
      <div className="flex flex-col gap-y-4">
         <DeleteDialog />
         <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
               <Button
                  onClick={
                     onCancle
                        ? onCancle
                        : () =>
                             router.push(
                                `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`
                             )
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
                                          disabled={isPending || isDeletingProject}
                                       />
                                       {field.value ? (
                                          <Button
                                             onClick={() => {
                                                field.onChange(null);
                                                if (inputRef.current)
                                                   inputRef.current.value = "";
                                             }}
                                             disabled={isPending || isDeletingProject}
                                             type="button"
                                             variant="destructive"
                                             size="xs"
                                             className="w-fit mt-2">
                                             Remove Image
                                          </Button>
                                       ) : (
                                          <Button
                                             onClick={() => inputRef.current?.click()}
                                             disabled={isPending || isDeletingProject}
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
                           disabled={isPending || isDeletingProject}
                           className={cn(!onCancle && "invisible")}
                           type="button"
                           variant="secondary"
                           size="lg">
                           Cancle
                        </Button>
                        <Button
                           disabled={isPending || isDeletingProject}
                           type="submit"
                           variant="primary"
                           size="lg">
                           Update Project
                        </Button>
                     </div>
                  </form>
               </Form>
            </CardContent>
         </Card>
         <Card className="w-full h-full border-none shadow-none">
            <CardContent className="p-7">
               <div className="flex flex-col">
                  <h3 className="font-bold">Danger zone</h3>
                  <p className="text-sm text-muted-foreground">
                     Deleting a project is irreversible and will remove all associated
                     data
                  </p>
                  <DottedSeparator className="pt-7" />
                  <Button
                     onClick={handleDelete}
                     disabled={isPending || isDeletingProject}
                     className="mt-6 w-fit ml-auto"
                     size="sm"
                     variant="destructive"
                     type="button">
                     Delete project
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};
