"use client";

import React from "react";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { Analytics } from "@/components/analytics";
import { TaskList } from "@/components/task-list";
import { ProjectList } from "@/components/project-list";

export const WorkspaceIdClient: React.FC = ({}) => {
   const workspaceId = useWorkspaceId();

   const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({
      workspaceId,
   });
   const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
      workspaceId,
   });
   const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId });
   const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

   const { open: createProject } = useCreateProjectModal();

   const isLoading =
      isLoadingAnalytics || isLoadingTasks || isLoadingProjects || isLoadingMembers;

   if (isLoading) return <PageLoader />;

   if (!analytics || !projects || !tasks || !members)
      return <PageError message="Failed to load workspace data" />;

   return (
      <div className="h-full flex flex-col space-y-4">
         <Analytics data={analytics} />
         <div className="grid grid-cols1 xl:grid-cols-2 gap-4">
            <TaskList data={tasks.documents} total={tasks.total} />
            <ProjectList data={projects.documents} total={tasks.total} />
         </div>
      </div>
   );
};
