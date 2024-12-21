import React from "react";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface TaskActionsProps {
   id: string;
   projectId: string;
   children: React.ReactNode;
}

export const TaskActions: React.FC<TaskActionsProps> = ({ id, projectId, children }) => {
   const workspaceId = useWorkspaceId();
   const router = useRouter();

   const [ConfirmDialog, confirm] = useConfirm(
      "Delete task",
      "This action cannot be undone",
      "destructive"
   );
   const { mutate, isPending } = useDeleteTask();

   const onDelete = async () => {
      const ok = await confirm();
      if (!ok) return;

      mutate({ param: { taskId: id } });
   };

   const onOpenTask = () => {
      router.push(`/workspaces/${workspaceId}/task/${id}`)
   }

   const onOpenProject = () => {
      router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
   }

   return (
      <div className="flex justify-end">
         <ConfirmDialog />
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
               <DropdownMenuItem
                  onClick={onOpenTask}
                  disabled={isPending}
                  className="font-medium p-[10px]">
                  <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                  Task Details
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={onOpenProject}
                  disabled={isPending}
                  className="font-medium p-[10px]">
                  <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                  Open Project
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => {}}
                  disabled={isPending}
                  className="font-medium p-[10px]">
                  <PencilIcon className="size-4 mr-2 stroke-2" />
                  Edit Task
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={onDelete}
                  disabled={isPending}
                  className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                  <TrashIcon className="size-4 mr-2 stroke-2" />
                  Delete Task
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
