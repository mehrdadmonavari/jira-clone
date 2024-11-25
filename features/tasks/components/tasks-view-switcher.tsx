import React from "react";
import { Bold, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DottedSeparator } from "@/components/dotted-separator";

interface TasksViewSwitcherProps {}

export const TasksViewSwitcher: React.FC<TasksViewSwitcherProps> = ({}) => {
   return (
      <Tabs defaultValue="table" className="flex-1 w-full border rounded-lg">
         <div className="h-full flex flex-col overflow-auto p-4">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-y-2">
               <TabsList className="w-full lg:w-auto">
                  <TabsTrigger
                     className="h-8 w-full lg:w-auto"
                     value="table">
                     Table
                  </TabsTrigger>
                  <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                     Kanban
                  </TabsTrigger>
                  <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                     Calendar
                  </TabsTrigger>
               </TabsList>
               <Button className="w-full lg:w-auto" size="sm">
                  <PlusIcon className="size-4" />
                  New
               </Button>
            </div>
            <DottedSeparator className="my-4" />
            Data fillters
            <DottedSeparator className="my-4" />
            <>
               <TabsContent value="table" className="mt-0">
                  data table
               </TabsContent>
               <TabsContent value="kanban" className="mt-0">
                  kanban
               </TabsContent>
               <TabsContent value="calendar" className="mt-0">
                  calendar
               </TabsContent>
            </>
         </div>
      </Tabs>
   );
};
