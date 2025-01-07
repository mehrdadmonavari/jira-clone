import React from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { AnalyticsCard } from "./analytics-card";
import { DottedSeparator } from "./dotted-separator";
import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

interface AnalyticsProps {
   // data?: {
   //    taskCount: number;
   //    taskDifference: number;
   //    projectCount?: number;
   //    projectDifference?: number;
   //    assignedTaskCount: number;
   //    assignedTaskDiffrences: number;
   //    completedTaskCount: number;
   //    completedTaskDifferences: number;
   //    incompleteTaskCount?: number;
   //    incompleteTaskDifferences?: number;
   //    overdueTaskCount: number;
   //    overdueTaskDifferences: number;
   // };
}

export const Analytics: React.FC<ProjectAnalyticsResponseType> = ({ data }) => {
   return (
      <ScrollArea className="w-full rounded-lg border whitespace-nowrap shrink-0">
         <div className="w-full flex flex-row">
            <div className="flex items-center flex-1">
               <AnalyticsCard
                  title="Total tasks"
                  value={data.taskCount}
                  variante={data.taskDifference > 0 ? "up" : "down"}
                  increasValue={data.taskDifference}
               />
               <DottedSeparator direction="vertical" />
            </div>
            <div className="flex items-center flex-1">
               <AnalyticsCard
                  title="Assigned Tasks"
                  value={data.assignedTaskCount}
                  variante={data.assignedTaskDiffrences > 0 ? "up" : "down"}
                  increasValue={data.assignedTaskDiffrences}
               />
               <DottedSeparator direction="vertical" />
            </div>
            <div className="flex items-center flex-1">
               <AnalyticsCard
                  title="Completed Tasks"
                  value={data.completedTaskCount}
                  variante={data.completedTaskDifferences > 0 ? "up" : "down"}
                  increasValue={data.completedTaskDifferences}
               />
               <DottedSeparator direction="vertical" />
            </div>
            <div className="flex items-center flex-1">
               <AnalyticsCard
                  title="Overdue Tasks"
                  value={data.overdueTaskCount}
                  variante={data.overdueTaskDifferences > 0 ? "up" : "down"}
                  increasValue={data.overdueTaskDifferences}
               />
               <DottedSeparator direction="vertical" />
            </div>
            <div className="flex items-center flex-1">
               <AnalyticsCard
                  title="Incomplete Tasks"
                  value={data?.incompleteTaskCount}
                  variante={data?.incompleteTaskDifferences > 0 ? "up" : "down"}
                  increasValue={data?.incompleteTaskDifferences}
               />
            </div>
         </div>
         <ScrollBar orientation="horizontal" />
      </ScrollArea>
   );
};
