import React from "react";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { DottedSeparator } from "./dotted-separator";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";

interface ProjectsListProps {
   data: Project[];
   total: number;
}

export const ProjectsList: React.FC<ProjectsListProps> = ({ data, total }) => {
   const workspaceId = useWorkspaceId();

   const { open: createProject } = useCreateProjectModal();

   return (
      <div className="flex flex-col gap-y-4 col-span-1">
         <div className="bg-white border rounded-lg p-4">
            <div className="flex justify-between items-center">
               <p className="font-semibold text-lg">Projects ({total})</p>
               <Button variant="secondary" size="icon" onClick={createProject}>
                  <PlusIcon className="size-4 text-neutral-400" />
               </Button>
            </div>
            <DottedSeparator className="my-4" />
            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               {data.map((project) => (
                  <li key={project.$id}>
                     <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                        <Card className="shadow-none rounded-lg transition hover:opacity-75">
                           <CardContent className="p-4 flex items-center gap-x-2.5">
                              <ProjectAvatar
                                 name={project.name}
                                 image={project.imageUrl}
                                 className="size-10"
                                 fallbackClassName="text-lg"
                              />
                              <p className="text-lg font-medium truncate">
                                 {project.name}
                              </p>
                           </CardContent>
                        </Card>
                     </Link>
                  </li>
               ))}
               <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                  no projects found
               </li>
            </ul>
         </div>
      </div>
   );
};
