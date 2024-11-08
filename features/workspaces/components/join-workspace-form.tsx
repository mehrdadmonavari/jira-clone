"use client";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import { useJoinWorkspace } from "../api/use-join-workspace";
import { useInviteCode } from "../hooks/use-invite-code";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface JoinWorkspaceFormProps {
   initialValues: { name: string };
}

export const JoinWorkspaceForm: React.FC<JoinWorkspaceFormProps> = ({
   initialValues,
}) => {
   const router = useRouter();
   const workspaceId = useWorkspaceId();
   const inviteCode = useInviteCode();
   const { mutate, isPending } = useJoinWorkspace();

   const onSubmit = () => {
      mutate(
         { param: { workspaceId }, json: { code: inviteCode } },
         {
            onSuccess: ({ data }) => {
               router.push(`/workspaces/${data.$id}`);
            },
         }
      );
   };

   return (
      <Card className="w-full h-full border-none shadow-none">
         <CardHeader className="p-7">
            <CardTitle className="forn-bold text-xl">Join workspace</CardTitle>
            <CardDescription>
               You&apos;ve been invited to join <strong>{initialValues.name}</strong>{" "}
               workspace
            </CardDescription>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7">
            <div className="flex flex-col lg:flex-row gap-2 justify-between items-center">
               <Button
                  variant="secondary"
                  type="button"
                  size="lg"
                  className="w-full lg:w-fit"
                  asChild
                  disabled={isPending}>
                  <Link href="/">Cancle</Link>
               </Button>
               <Button
                  type="button"
                  size="lg"
                  className="w-full lg:w-fit"
                  onClick={onSubmit}
                  disabled={isPending}>
                  Join workspace
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};
