import React from "react";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

interface TaskOvervewiProps {
   task: Task;
}

export const TaskOverview: React.FC<TaskOvervewiProps> = () => {
   return (
      <div className="flex flex-col gap-y-4 col-span-1">
         <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center">
               <p className="text-lg font-semibold">Overview</p>
               <Button variant="secondary" size="sm">
                  <PencilIcon className="size-4" />
                  Edit
               </Button>
            </div>
         </div>
      </div>
   );
};
