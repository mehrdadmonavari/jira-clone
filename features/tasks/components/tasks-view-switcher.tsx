"use client";

import React from "react";
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

interface TasksViewSwitcherProps {}

export const TasksViewSwitcher: React.FC<TasksViewSwitcherProps> = ({}) => {
   const [{ status, projectId, assigneeId, dueDate }] = useTaskFilters();
   const workspaceId = useWorkspaceId();

   const [view, setView] = useQueryState("task-view", { defaultValue: "table" });

   const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
      workspaceId,
      status,
      projectId,
      assigneeId,
      dueDate,
   });
   const { open } = useCreateTaskModal();

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
            <DataFilters />
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
                     kanban
                  </TabsContent>
                  <TabsContent value="calendar" className="mt-0">
                     calendar
                  </TabsContent>
               </>
            )}
         </div>
      </Tabs>
   );
};
