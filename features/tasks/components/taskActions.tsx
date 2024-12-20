import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";

interface TaskActionsProps {
   id: string;
   projectId: string;
   children: React.ReactNode;
}

export const TaskActions: React.FC<TaskActionsProps> = ({ id, projectId, children }) => {
   return (
      <div className="flex justify-end">
         <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-48" align="end">
               <DropdownMenuItem
                  onClick={() => {}}
                  disabled={false}
                  className="font-medium p-[10px]">
                  <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                  Task Details
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => {}}
                  disabled={false}
                  className="font-medium p-[10px]">
                  <ExternalLinkIcon className="size-4 mr-2 stroke-2" />
                  Open Project
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => {}}
                  disabled={false}
                  className="font-medium p-[10px]">
                  <PencilIcon className="size-4 mr-2 stroke-2" />
                  Edit Task
               </DropdownMenuItem>
               <DropdownMenuItem
                  onClick={() => {}}
                  disabled={false}
                  className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                  <TrashIcon className="size-4 mr-2 stroke-2" />
                  Delete Task
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );
};
