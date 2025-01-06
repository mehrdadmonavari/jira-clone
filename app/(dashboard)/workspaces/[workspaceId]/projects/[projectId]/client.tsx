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

export const ProjectIdClient: React.FC = () => {
   const projectId = useProjectId();
   const { data, isLoading } = useGetProject({ projectId });

   if (isLoading) return <PageLoader />;

   if (!data) return <PageError message="project not found" />;

   return (
      <div className="flex flex-col gap-y-4">
         <div className="flex justify-between items-center">
            <div className="flex item-center gap-x-2">
               <ProjectAvatar image={data.imageUrl} name={data.name} className="size-8" />
               <p className="text-lg font-semibold">{data.name}</p>
            </div>
            <div className="">
               <Button variant="secondary" size="sm" asChild>
                  <Link
                     href={`/workspaces/${data.workspaceId}/projects/${data.$id}/settings`}>
                     <PencilIcon className="size-4" />
                     Edit project
                  </Link>
               </Button>
            </div>
         </div>
         <TasksViewSwitcher hideProjectFilter />
      </div>
   );
};
