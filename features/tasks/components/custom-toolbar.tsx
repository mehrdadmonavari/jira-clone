import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";

interface CustomToolbarProps {
   date: Date;
   onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

export const CustomToolbar: React.FC<CustomToolbarProps> = ({ date, onNavigate }) => {
   return (
      <div className="w-full lg:w-auto flex justify-center lg:justify-start items-center mb-4 gap-x-2 ">
         <Button
            onClick={() => onNavigate("PREV")}
            variant="secondary"
            size="icon"
            className="flex items-center">
            <ChevronLeftIcon className="size-4" />
         </Button>
         <div className="w-full lg:w-auto h-8 flex justify-center items-center px-3 py-2 border border-input rounded-md">
            <CalendarIcon className="size-4 mr-2" />
            <p className="text-sm">{format(date, "MMMM yyyy")}</p>
         </div>
         <Button
            onClick={() => onNavigate("NEXT")}
            variant="secondary"
            size="icon"
            className="flex items-center">
            <ChevronRightIcon className="size-4" />
         </Button>
      </div>
   );
};
