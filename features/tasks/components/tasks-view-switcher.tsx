"use client";

import React, { useCallback } from "react";
import { Loader, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DottedSeparator } from "@/components/dotted-separator";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-tasks";
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban";
import { TaskStatus } from "../types";
import { useBulkUpdateTasks } from "../api/use-bulk-update-tasks";
import { DataCalendar } from "./data-calendar";
import { useProjectId } from "@/features/projects/hooks/use-project-id";

interface TasksViewSwitcherProps {
   hideProjectFilter?: boolean;
}

export const TasksViewSwitcher: React.FC<TasksViewSwitcherProps> = ({
   hideProjectFilter,
}) => {
   const [{ status, projectId, assigneeId, dueDate }] = useTaskFilters();
   const workspaceId = useWorkspaceId();
   const paramProjectId = useProjectId();

   const [view, setView] = useQueryState("task-view", { defaultValue: "table" });

   const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
      workspaceId,
      status,
      projectId: paramProjectId || projectId,
      assigneeId,
      dueDate,
   });
   const { open } = useCreateTaskModal();

   const { mutate: bulkUpdate } = useBulkUpdateTasks();

   const onKanbanChange = useCallback(
      (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
         bulkUpdate({
            json: { tasks },
         });
      },
      [bulkUpdate]
   );

   return (
      <Tabs
         defaultValue={view}
         onValueChange={setView}
         className="flex-1 w-full border rounded-lg">
         <div className="h-full flex flex-col overflow-auto p-4">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2">
               <TabsList className="w-full lg:w-auto">
                  <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                     Table
                  </TabsTrigger>
                  <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                     Kanban
                  </TabsTrigger>
                  <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                     Calendar
                  </TabsTrigger>
               </TabsList>
               <Button onClick={open} className="w-full lg:w-auto" size="sm">
                  <PlusIcon className="size-4" />
                  New
               </Button>
            </div>
            <DottedSeparator className="my-4" />
            <DataFilters hideProjectFilter={hideProjectFilter} />
            <DottedSeparator className="my-4" />
            {isLoadingTasks ? (
               <div className="w-full h-[200px] border rounded-lg flex flex-col items-center justify-center">
                  <Loader className="size-5 animate-spin text-muted-foreground" />
               </div>
            ) : (
               <>
                  <TabsContent value="table" className="mt-0">
                     <DataTable columns={columns} data={tasks?.documents ?? []} />
                  </TabsContent>
                  <TabsContent value="kanban" className="mt-0">
                     <DataKanban
                        onChange={onKanbanChange}
                        data={tasks?.documents ?? []}
                     />
                  </TabsContent>
                  <TabsContent value="calendar" className="mt-0 h-full mb-4">
                     <DataCalendar data={tasks?.documents ?? []} />
                  </TabsContent>
               </>
            )}
         </div>
      </Tabs>
   );
};
