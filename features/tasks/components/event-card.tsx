import { Project } from "@/features/projects/types";
import React from "react";
import { TaskStatus } from "../types";
import { cn } from "@/lib/utils";
import { MemberAvatar } from "@/features/members/components/member-avatar";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useRouter } from "next/navigation";

interface EventCardProps {
   id: string;
   title: string;
   project: Project;
   assignee: any;
   status: TaskStatus;
}

const statusColorMap: Record<TaskStatus, string> = {
   [TaskStatus.BACKLOG]: "border-l-pink-500",
   [TaskStatus.TODO]: "border-l-red-500",
   [TaskStatus.IN_PROGRESS]: "border-l-yellow-500",
   [TaskStatus.IN_REVIEW]: "border-l-blue-500",
   [TaskStatus.DONE]: "border-l-emerald-500",
};

export const EventCard: React.FC<EventCardProps> = ({
   id,
   title,
   project,
   assignee,
   status,
}) => {
   const workspaceId = useWorkspaceId();
   const router = useRouter();

   const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      router.push(`/workspaces/${workspaceId}/tasks/${id}`);
   };

   return (
      <div className="px-2">
         <div
            onClick={onClick}
            className={cn(
               "bg-white text-primary text-sm rounded-md border border-l-4 flex flex-col gap-y-1.5 p-1.5 cursor-pointer transition hover:opacity-75",
               statusColorMap[status]
            )}>
            <p className="">{title}</p>
            <div className="flex items-center gap-x-1">
               <MemberAvatar name={assignee?.name} />
               <div className="size-1 rounded-full bg-neutral-300" />
               <ProjectAvatar name={project?.name} image={project?.imageUrl} />
            </div>
         </div>
      </div>
   );
};
