"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface DatePicker {
   value: Date | undefined;
   onChange: (date: Date) => void;
   className?: string;
   placeholder?: string;
}

export const DatePicker: React.FC<DatePicker> = ({
   value,
   onChange,
   className,
   placeholder = "Select date",
}) => {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               size="lg"
               className={cn(
                  "w-full justify-start text-left font-normal px-3",
                  !value && "text-muted-foreground",
                  className
               )}>
               <CalendarIcon className="size-4" />
               {value ? format(value, "PPP") : <span>{placeholder}</span>}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0">
            <Calendar
               mode="single"
               selected={value}
               onSelect={(date) => onChange(date as Date)}
               initialFocus
            />
         </PopoverContent>
      </Popover>
   );
};
