"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface ProjectsProps {}

export const Projects: React.FC<ProjectsProps> = ({}) => {
   const pathname = usePathname();

   const { open } = useCreateProjectModal();
   const projectId = null;
   // const projectId = useProjectId();
   const workspaceId = useWorkspaceId();
   const { data: projects } = useGetProjects({ workspaceId });

   return (
      <div className="flex flex-col gap-y-2">
         <div className="flex items-center justify-between">
            <p className="text-xs uppercase text-neutral-500">Projects</p>
            <RiAddCircleFill
               onClick={open}
               className="size-5 text-neutral-500 cursor-pointer transition hover:opacity-75"
            />
         </div>
         {projects?.documents.map((project) => {
            const href = `/workspaces/${workspaceId}/projects/${projectId}`;
            const isActive = pathname === href;
            return (
               <Link href={href}>
                  <div
                     className={cn(
                        "flex items-center gap-2.5 p-2.5 rounded-md cursor-pointer text-neutral-500 transition hover:opacity-75",
                        isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                     )}>
                     <ProjectAvatar image={project.imageUrl} name={project.name} />
                     <span className="truncate">{project.name}</span>
                  </div>
               </Link>
            );
         })}
      </div>
   );
};
