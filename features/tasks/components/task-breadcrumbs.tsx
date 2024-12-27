import { Project } from "@/features/projects/types";
import React from "react";
import { Task } from "../types";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteTask } from "../api/use-delete-task";
import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";

interface TaskBreadcrumbsProps {
   project: Project;
   task: Task;
}

export const TaskBreadcrumbs: React.FC<TaskBreadcrumbsProps> = ({ project, task }) => {
   const router = useRouter();

   const workspaceId = useWorkspaceId();

   const { mutate, isPending } = useDeleteTask();
   const [ConfirmDialog, confirm] = useConfirm(
      "Delete Task",
      "This action cannot be undone",
      "destructive"
   );

   const handleDelete = async () => {
      const ok = await confirm();
      if (!ok) return;

      mutate(
         { param: { taskId: task.$id } },
         {
            onSuccess: () => {
               router.push(`/workspaces/${workspaceId}/tasks`);
            },
         }
      );
   };

   return (
      <div className="flex items-center gap-x-2">
         <ConfirmDialog />
         <ProjectAvatar
            name={project.name}
            image={project.imageUrl}
            className="size-6 lg:size-8"
         />
         <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
            <p className="font-semibold text-sm lg:text-lg text-muted-foreground transition hover:opacity-75">
               {project.name}
            </p>
         </Link>
         <ChevronRightIcon className="size-4 lg:size-5 text-muted-foreground" />
         <p className="font-semibold text-sm lg:text-lg">{task.name}</p>
         <Button
            onClick={handleDelete}
            disabled={isPending}
            className="ml-auto"
            variant="destructive"
            size="sm">
            <TrashIcon className="size-4" />
            <span className="hidden lg:block">Delete Task</span>
         </Button>
      </div>
   );
};
