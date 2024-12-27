import React from "react";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { OverviewProperty } from "./overview-property";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskOvervewiProps {
   task: Task;
}

export const TaskOverview: React.FC<TaskOvervewiProps> = ({ task }) => {
   const { open } = useEditTaskModal();

   return (
      <div className="flex flex-col gap-y-4 col-span-1">
         <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center">
               <p className="text-lg font-semibold">Overview</p>
               <Button onClick={() => open(task.$id)} variant="secondary" size="sm">
                  <PencilIcon className="size-4" />
                  Edit
               </Button>
            </div>
            <DottedSeparator className="my-4" />
            <div className="flex flex-col gap-y-4">
               <OverviewProperty label="Assignee">
                  <MemberAvatar name={task.assignee.name} className="size-6" />
                  <p className="font-medium text-sm">{task.assignee.name}</p>
               </OverviewProperty>
               <OverviewProperty label="Due date">
                  <TaskDate value={task.dueDate} className="font-medium text-sm" />
               </OverviewProperty>
               <OverviewProperty label="Status">
                  <Badge variant={task.status}>{snakeCaseToTitleCase(task.status)}</Badge>
               </OverviewProperty>
            </div>
         </div>
      </div>
   );
};
