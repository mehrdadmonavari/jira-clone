import React from "react";
import { Task } from "../types";
import { TaskActions } from "./task-actions";
import { MoreHorizontal } from "lucide-react";
import { DottedSeparator } from "@/components/dotted-separator";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { TaskDate } from "./task-date";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";

interface KanbanCardProps {
   task: Task;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task }) => {
   return (
      <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
         <div className="flex justify-between items-start gap-x-2">
            <p className="text-sm line-clamp-2">{task.name}</p>
            <TaskActions id={task.id} projectId={task.projectId}>
               <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 transition hover:opacity-75" />
            </TaskActions>
         </div>
         <DottedSeparator />
         <div className="flex items-center gap-x-1.5">
            <MemberAvatar name={task.assignee.name} fallbackClassName="text-[10px]" />
            <div className="size-1 rounded-full bg-neutral-300" />
            <TaskDate value={task.dueDate} className="text-sm" />
         </div>
         <div className="flex items-center gap-x-1.5">
            <ProjectAvatar
               name={task.project.name}
               image={task.project.imageUrl}
               fallbackClassName="text-[10px]"
            />
            <span className="text-xs font-medium">{task.project.name}</span>
         </div>
      </div>
   );
};
