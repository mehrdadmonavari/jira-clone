import React from "react";
import { differenceInDays, format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskDateProps {
   value: string;
   className?: string;
}

export const TaskDate: React.FC<TaskDateProps> = ({ value, className }) => {
   const today = new Date();
   const endDate = new Date(value);
   const diffInDays = differenceInDays(endDate, today);

   let textColor = "text-muted-foregrounde";
   if (diffInDays <= 3) textColor = "text-red-500";
   else if (diffInDays <= 7) textColor = "text-orange-500";
   else if (diffInDays <= 14) textColor = "text-yellow-500";

   return (
      <div className={textColor}>
         <span className={cn("truncate", className)}>{format(new Date(value), "PPP")}</span>
      </div>
   );
};
