import React from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
   title: string;
   value: number;
   variante: "up" | "down";
   increasValue: number;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
   title,
   value,
   variante,
   increasValue,
}) => {
   const iconColor = variante === "up" ? "text-emerald-500" : "text-red-500";
   const increaseValueColor = variante === "up" ? "text-emerald-500" : "text-red-500";
   const Icon = variante === "up" ? FaCaretUp : FaCaretDown;

   return (
      <Card className="shadow-none border-none w-full">
         <CardHeader>
            <div className="flex items-center gap-x-2.5">
               <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
                  <span className="truncate text-base">{title}</span>
               </CardDescription>
               <div className="flex items-center gap-x-1">
                  <Icon className={cn(iconColor, "size-4")} />
                  <span
                     className={cn(increaseValueColor, "truncate text-base font-medium")}>
                     {increasValue}
                  </span>
               </div>
            </div>
            <CardTitle className="3xl font-semibold">{value}</CardTitle>
         </CardHeader>
      </Card>
   );
};
