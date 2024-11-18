"use client";

import React, { Fragment } from "react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, MoreVertical } from "lucide-react";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { Separator } from "@/components/ui/separator";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";

interface MembersListProps {}

export const MembersList: React.FC<MembersListProps> = ({}) => {
   const [ConfirmDialog, confirm] = useConfirm(
      "Remove Member",
      "This member will be removed from the workspace",
      "destructive"
   );
   const workspaceId = useWorkspaceId();
   const { data } = useGetMembers({ workspaceId });
   const { mutate: deleteMember, isPending: isDeletingMember } = useDeleteMember();
   const { mutate: updateMember, isPending: isUpdatingMember } = useUpdateMember();

   const handleUpdateMember = (memberId: string, role: MemberRole) => {
      updateMember({
         json: { role },
         param: { memberId },
      });
   };

   const handleDeleteMember = async (memberId: string) => {
      const ok = await confirm();
      if (!ok) return;

      deleteMember(
         { param: { memberId } },
         {
            onSuccess: () => {
               window.location.href = "/";
            },
         }
      );
   };

   return (
      <Card className="w-full h-full border-none shadow-none">
         <ConfirmDialog />
         <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
            <Button variant="secondary" size="sm" asChild>
               <Link href={`/workspaces/${workspaceId}`}>
                  <ArrowLeftIcon className="size-4" />
                  Bach
               </Link>
            </Button>
            <CardTitle className="font-bold text-xl">Members list</CardTitle>
         </CardHeader>
         <div className="px-7">
            <DottedSeparator />
         </div>
         <CardContent className="p-7">
            {data?.documents.map((member, index) => (
               <Fragment key={member.$id}>
                  <div className="flex items-center gap-2">
                     <MemberAvatar
                        className="size-10"
                        fallbackClassName="text-lg"
                        name={member.name}
                     />
                     <div className="flex flex-col">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-muted-foreground text-xs">{member.email}</p>
                     </div>
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button className="ml-auto" variant="secondary" size="icon">
                              <MoreVertical className="size-4 text-muted-foreground" />
                           </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="bottom" align="end">
                           <DropdownMenuItem
                              onClick={() =>
                                 handleUpdateMember(member.$id, MemberRole.ADMIN)
                              }
                              disabled={isUpdatingMember}
                              className="font-medium">
                              Set as Administrator
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={() =>
                                 handleUpdateMember(member.$id, MemberRole.MEMBER)
                              }
                              disabled={isUpdatingMember}
                              className="font-medium">
                              Set as Member
                           </DropdownMenuItem>
                           <DropdownMenuItem
                              onClick={() => handleDeleteMember(member.$id)}
                              disabled={isDeletingMember}
                              className="font-medium text-amber-700">
                              Remove {member.name}
                           </DropdownMenuItem>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  </div>
                  {index < data.documents.length - 1 && <Separator className="my-2.5" />}
               </Fragment>
            ))}
         </CardContent>
      </Card>
   );
};
