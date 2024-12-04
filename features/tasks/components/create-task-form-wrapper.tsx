import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import React from "react";
import { CreateTaskForm } from "./create-task-form";

interface CreateTaskFormWrapperProps {
   onCancel: () => void;
}

export const CreateTaskFormWrapper: React.FC<CreateTaskFormWrapperProps> = ({
   onCancel,
}) => {
   const workspaceId = useWorkspaceId();

   const { data: Projects, isLoading: isLoadingProjects } = useGetProjects({
      workspaceId,
   });
   const { data: members, isLoading: isLoadingMembers } = useGetMembers({
      workspaceId,
   });

   const projectOptions = Projects?.documents.map((project) => {
      return {
         id: project.$id,
         name: project.name,
         imageUrl: project.imageUrl,
      };
   });
   const memberOptions = members?.documents.map((member) => {
      return {
         id: member.$id,
         name: member.name,
      };
   });

   const isLoading = isLoadingProjects || isLoadingMembers;
   if (isLoading) {
      <Card className="w-full h-[714px] border-none shadow-none">
         <CardContent className="flex items-center justify-center h-full">
            <Loader className="size-5 animate-spin text-muted-foreground" />
         </CardContent>
      </Card>;
   }

   return (
      <CreateTaskForm
         onCancle={onCancel}
         projectOptions={projectOptions ?? []}
         memberOptions={memberOptions ?? []}
      />
   );
};
