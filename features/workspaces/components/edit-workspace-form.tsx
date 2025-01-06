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
import { Workspace } from "../types";
import { updateWorkspaceSchema } from "../schemas";
import { useConfirm } from "@/hooks/use-confirm";
import { useUpdateWorkspace } from "../api/use-update-workspace";
import { useDeleteWorkspace } from "../api/use-delete-workspace";
import { useResetInviteCode } from "../api/use-reset-invite-code";

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
   const { mutate: deleteWorkspace, isPending: isDeleteWorkspace } = useDeleteWorkspace();
   const { mutate: resetinviteCode, isPending: isResetingInviteCode } =
      useResetInviteCode();
   const inputRef = useRef<HTMLInputElement>(null);

   const [DeleteDialog, confirmDelete] = useConfirm(
      "Delete Workspace",
      "this action cannot be undone",
      "destructive"
   );
   const [ResetDialog, resetConfirm] = useConfirm(
      "Reset invite link",
      "This will invalidate current invite link",
      "destructive"
   );

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
      );
   };

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) form.setValue("image", file);
   };

   const handleDelete = async () => {
      const ok = await confirmDelete();
      if (!ok) return;

      deleteWorkspace(
         { param: { workspaceId: initialValues.$id } },
         {
            onSuccess: () => {
               // TODO: i dont now how to clear the cash. we need to clear the cash
               router.refresh();
               window.location.href = "/";
            },
         }
      );
   };

   const handleResetInviteCode = async () => {
      const ok = await resetConfirm();
      if (!ok) return;

      resetinviteCode({ param: { workspaceId: initialValues.$id } });
   };

   const handleCopyInviteLink = () => {
      navigator.clipboard
         .writeText(fullInvitelink)
         .then(() => toast.success("Invite link copied to clipboard"));
   };

   const fullInvitelink = `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

   return (
      <div className="flex flex-col gap-y-4">
         <DeleteDialog />
         <ResetDialog />
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
                                    <Input
                                       {...field}
                                       placeholder="Enter workspace name"
                                    />
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
                           disabled={
                              isPending || isDeleteWorkspace || isResetingInviteCode
                           }
                           className={cn(!onCancle && "invisible")}
                           type="button"
                           variant="secondary"
                           size="lg">
                           Cancle
                        </Button>
                        <Button
                           disabled={
                              isPending || isDeleteWorkspace || isResetingInviteCode
                           }
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
         <Card className="w-full h-full border-none shadow-none">
            <CardContent className="p-7">
               <div className="flex flex-col">
                  <h3 className="font-bold">Invite Members</h3>
                  <p className="text-sm text-muted-foreground">
                     use the invite link to add members to your workspaces
                  </p>
                  <div className="mt-4">
                     <div className="flex items-center gap-x-2">
                        <Input disabled value={fullInvitelink} />
                        <Button
                           onClick={handleCopyInviteLink}
                           variant="secondary"
                           className="size-12">
                           <CopyIcon className="size-5" />
                        </Button>
                     </div>
                  </div>
                  <DottedSeparator className="pt-7" />
                  <Button
                     onClick={handleResetInviteCode}
                     disabled={isPending || isDeleteWorkspace || isResetingInviteCode}
                     className="mt-6 w-fit ml-auto"
                     size="sm"
                     variant="destructive"
                     type="button">
                     Reset invite link
                  </Button>
               </div>
            </CardContent>
         </Card>
         <Card className="w-full h-full border-none shadow-none">
            <CardContent className="p-7">
               <div className="flex flex-col">
                  <h3 className="font-bold">Danger zone</h3>
                  <p className="text-sm text-muted-foreground">
                     Deleting a workspace is irreversible and will remove all associated
                     data
                  </p>
                  <DottedSeparator className="pt-7" />
                  <Button
                     onClick={handleDelete}
                     disabled={isPending || isDeleteWorkspace || isResetingInviteCode}
                     className="mt-6 w-fit ml-auto"
                     size="sm"
                     variant="destructive"
                     type="button">
                     Delete workspace
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
   );
};
