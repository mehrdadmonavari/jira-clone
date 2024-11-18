import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

interface MemberAvatarProps {
   name: string;
   className?: string;
   fallbackClassName?: string;
}

export const MemberAvatar: React.FC<MemberAvatarProps> = ({
   name,
   className,
   fallbackClassName,
}) => {
   return (
      <Avatar className={cn("size-5 border border-neutral-300 rounded-full transition", className)}>
         <AvatarFallback
            className={cn(
               "flex justify-center items-center bg-neutral-200 font-medium text-neutral-500",
               fallbackClassName
            )}>
            {name.charAt(0).toUpperCase()}
         </AvatarFallback>
      </Avatar>
   );
};
