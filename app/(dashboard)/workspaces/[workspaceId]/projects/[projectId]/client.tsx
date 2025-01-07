"use client";

import React from "react";
import Link from "next/link";
import { PencilIcon } from "lucide-react";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { TasksViewSwitcher } from "@/features/tasks/components/tasks-view-switcher";
import { Button } from "@/components/ui/button";
import { useProjectId } from "@/features/projects/hooks/use-project-id";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { PageLoader } from "@/components/page-loader";
import { PageError } from "@/components/page-error";
import { useGetProjectAnalytics } from "@/features/projects/api/use-get-project-analytics";
import { Analytics } from "@/components/analytics";

export const ProjectIdClient: React.FC = () => {
   const projectId = useProjectId();
   const { data: project, isLoading: isLoadingProject } = useGetProject({ projectId });
   const { data: analytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({
      projectId,
   });

   const isLoading = isLoadingProject || isLoadingAnalytics;

   if (isLoading) return <PageLoader />;

   if (!project) return <PageError message="project not found" />;

   return (
      <div className="flex flex-col gap-y-4">
         <div className="flex justify-between items-center">
            <div className="flex item-center gap-x-2">
               <ProjectAvatar
                  image={project.imageUrl}
                  name={project.name}
                  className="size-8"
               />
               <p className="text-lg font-semibold">{project.name}</p>
            </div>
            <div className="">
               <Button variant="secondary" size="sm" asChild>
                  <Link
                     href={`/workspaces/${project.workspaceId}/projects/${project.$id}/settings`}>
                     <PencilIcon className="size-4" />
                     Edit project
                  </Link>
               </Button>
            </div>
         </div>
         {analytics && <Analytics data={analytics} />}
         <TasksViewSwitcher hideProjectFilter />
      </div>
   );
};
