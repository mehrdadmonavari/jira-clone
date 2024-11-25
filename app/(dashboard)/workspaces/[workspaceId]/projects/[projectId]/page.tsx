import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { getProject } from "@/features/projects/queries";
import { TasksViewSwitcher } from "@/features/tasks/components/tasks-view-switcher";
import { getWorkspace } from "@/features/workspaces/queries";
import { PencilIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProjectIdPageProps {
   params: {
      workspaceId: string;
      projectId: string;
   };
}

const ProjectIdPage: React.FC<ProjectIdPageProps> = async ({
   params: { workspaceId, projectId },
}) => {
   const workspace = await getWorkspace({ workspaceId });
   if (!workspace) throw new Error("Workspace not found");

   const initialValues = await getProject({ projectId });
   if (!initialValues) throw new Error("Project not found");

   return (
      <div className="flex flex-col gap-y-4">
         <div className="flex justify-between items-center">
            <div className="flex item-center gap-x-2">
               <ProjectAvatar
                  image={initialValues.imageUrl}
                  name={initialValues.name}
                  className="size-8"
               />
               <p className="text-lg font-semibold">{initialValues.name}</p>
            </div>
            <div className="">
               <Button variant="secondary" size="sm" asChild>
                  <Link
                     href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}>
                     <PencilIcon className="size-4" />
                     Edit project
                  </Link>
               </Button>
            </div>
         </div>
         <TasksViewSwitcher />
      </div>
   );
};

export default ProjectIdPage;
