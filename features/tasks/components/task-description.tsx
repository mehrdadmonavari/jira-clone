import React, { useState } from "react";
import { Task } from "../types";
import { Button } from "@/components/ui/button";
import { PencilIcon, XIcon } from "lucide-react";
import { useUpdateTask } from "../api/use-update-task";
import { DottedSeparator } from "@/components/dotted-separator";
import { Textarea } from "@/components/ui/textarea";

interface TaskDescriptionProps {
   task: Task;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({ task }) => {
   const [isEditing, setIsEditing] = useState<boolean>(false);
   const [value, setValue] = useState<typeof task.description>(task.description);

   const { mutate, isPending } = useUpdateTask();

   const handleSave = () => {
      mutate(
         {
            json: { description: value },
            param: { taskId: task.$id },
         },
         { onSuccess: () => {} }
      );
   };

   return (
      <div className="p-4 border rounded-lg">
         <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Overview</p>
            <Button
               onClick={() => setIsEditing((prev) => !prev)}
               variant="secondary"
               size="sm">
               {isEditing ? (
                  <XIcon className="size-4" />
               ) : (
                  <PencilIcon className="size-4" />
               )}
               {isEditing ? "Cancle" : "Edit"}
            </Button>
         </div>
         <DottedSeparator className="my-4" />
         {isEditing ? (
            <div className="flex flex-col gap-y-4">
               <Textarea
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  rows={4}
                  disabled={isPending}
                  placeholder="Add a description..."
               />
               <Button
                  onClick={handleSave}
                  disabled={isPending}
                  className="w-fit ml-auto"
                  size="sm">
                  {isPending ? "Saving..." : "Save Changes"}
               </Button>
            </div>
         ) : (
            <div>
               {task.description || (
                  <span className="text-muted-foreground">No description set</span>
               )}
            </div>
         )}
      </div>
   );
};
