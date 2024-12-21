import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Loader } from "lucide-react";
import React from "react";
import { useGetTask } from "../api/use-get-task";
import { EditTaskForm } from "./edit-task-form";

interface EditTaskFormWrapperProps {
   onCancel: () => void;
   id: string;
}

export const EditTaskFormWrapper: React.FC<EditTaskFormWrapperProps> = ({
   onCancel,
   id,
}) => {
   const workspaceId = useWorkspaceId();

   const { data: initialValues, isLoading: isLoadingTask } = useGetTask({ taskId: id });
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

   const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;
   if (isLoading) {
      return (
         <Card className="w-full h-[714px] border-none shadow-none">
            <CardContent className="flex items-center justify-center h-full">
               <Loader className="size-5 animate-spin text-muted-foreground" />
            </CardContent>
         </Card>
      );
   }

   if (!initialValues) return null;

   return (
      <EditTaskForm
         initialValues={initialValues}
         onCancle={onCancel}
         projectOptions={projectOptions ?? []}
         memberOptions={memberOptions ?? []}
      />
   );
};
