import { Task } from "@/features/tasks/types";
import React from "react";
import { Button } from "./ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { DottedSeparator } from "./dotted-separator";
import Link from "next/link";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { Card, CardContent } from "./ui/card";
import { formatDistanceToNow } from "date-fns";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";

interface TasksListProps {
   data: Task[];
   total: number;
}

export const TasksList: React.FC<TasksListProps> = ({ data, total }) => {
   const workspaceId = useWorkspaceId();

   const { open: createTask } = useCreateTaskModal();

   return (
      <div className="flex flex-col gap-y-4 col-span-1">
         <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center">
               <p className="font-semibold text-lg">Tasks ({total})</p>
               <Button variant="muted" size="icon" onClick={createTask}>
                  <PlusIcon className="size-4 text-neutral-400" />
               </Button>
            </div>
            <DottedSeparator className="my-4" />
            <ul className="flex flex-col gap-y-4">
               {data.slice(0, 3).map((task) => (
                  <li key={task.$id}>
                     <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                        <Card className="shadow-none rounded-lg transition hover:opacity-75">
                           <CardContent className="p-4">
                              <p className="text-lg font-medium truncate">{task.name}</p>
                              <div className="flex items-center gap-x-2">
                                 <p className="flex items-center gap-x-2">
                                    <p>{task.project.name}</p>
                                    <div className="size-1 rounded-full bg-neutral-300" />
                                    <div className="flex items-center text-sm text-muted-foreground">
                                       <CalendarIcon className="size-3 mr-1" />
                                       <span className="truncate">
                                          {formatDistanceToNow(new Date(task.dueDate))}
                                       </span>
                                    </div>
                                 </p>
                              </div>
                           </CardContent>
                        </Card>
                     </Link>
                  </li>
               ))}
               <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                  no tasks found
               </li>
            </ul>
            <Button variant="muted" className="mt-4 w-full" asChild>
               <Link href={`/workspaces/${workspaceId}/tasks`} className="">
                  Show All
               </Link>
            </Button>
         </div>
      </div>
   );
};
