import React from "react";
import { TaskStatus } from "../types";
import { snakeCaseToTitleCase } from "@/lib/utils";
import {
   CircleCheckIcon,
   CircleDashedIcon,
   CircleDotDashedIcon,
   CircleDotIcon,
   CircleIcon,
   PlusIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";

interface kanbanColumnHeaderProps {
   board: TaskStatus;
   taskCount: number;
}

const statusIconMap: Record<TaskStatus, React.ReactNode> = {
   [TaskStatus.BACKLOG]: <CircleDashedIcon className="size-[18px] text-pink-400" />,
   [TaskStatus.TODO]: <CircleIcon className="size-[18px] text-red-400" />,
   [TaskStatus.IN_PROGRESS]: (
      <CircleDotDashedIcon className="size-[18px] text-yellow-400" />
   ),
   [TaskStatus.IN_REVIEW]: <CircleDotIcon className="size-[18px] text-blue-400" />,
   [TaskStatus.DONE]: <CircleCheckIcon className="size-[18px] text-emerald-400" />,
};

export const KanbanColumnHeader: React.FC<kanbanColumnHeaderProps> = ({
   board,
   taskCount,
}) => {
   const { open } = useCreateTaskModal();
   const icon = statusIconMap[board];

   return (
      <div className="flex items-center justify-between px-2 py-1.5">
         <div className="flex items-center gap-x-2">
            {icon}
            <h2 className="text-sm font-medium">{snakeCaseToTitleCase(board)}</h2>
            <div className="size-5 flex justify-center items-center rounded-md bg-neutral-200 font-medium text-sm text-neutral-700">
               {taskCount}
            </div>
         </div>
         <Button onClick={open} className="size-5" variant="ghost" size="icon">
            <PlusIcon className="size-4 text-neutral-500" />
         </Button>
      </div>
   );
};
