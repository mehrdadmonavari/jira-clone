"use client";

import React from "react";
import { useCurrent } from "../api/use-current";
import { Loader, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
import { useLogout } from "../api/use-logout";

interface UserButtonprops {}

export const UserButton: React.FC<UserButtonprops> = ({}) => {
   const { data: user, isLoading } = useCurrent();
   const { mutate: logout } = useLogout();

   if (isLoading)
      return (
         <div className="size-10 rounded-full flex justify-self-center items-center bg-neutral-200 border border-neutral-300">
            <Loader className="size-4 animate-spin text-muted-foreground" />
         </div>
      );

   if (!user) return null;

   const { name, email } = user;
   const avatarFallback = name
      ? name.charAt(0).toUpperCase()
      : email.charAt(0).toUpperCase() ?? "U";

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="outline-none relative">
            <Avatar className="size-10 border border-neutral-300 transition hover:opacity-75">
               <AvatarFallback className="bg-neutral-200 font-medium text-neutral-300 flex justify-center items-center">
                  {avatarFallback}
               </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end" side="bottom" className="w-60" sideOffset={10}>
            <div className="flex flex-col justify-center items-center gap-2 px-2.5 py-4">
               <Avatar className="size-[52px] border border-neutral-300">
                  <AvatarFallback className="bg-neutral-200 font-medium text-xl text-neutral-300 flex justify-center items-center">
                     {avatarFallback}
                  </AvatarFallback>
               </Avatar>
               <div className="flex flex-col justify-center items-center">
                  <p className="text-sm font-medium text-neutral-900">{name || "User"}</p>
                  <p className="text-xs text-neutral-500">{email}</p>
               </div>
            </div>
            <DottedSeparator className="mb-1" />
            <DropdownMenuItem
               onClick={() => logout()}
               className="h-10 flex justify-center items-center font-medium text-amber-700 cursor-pointer">
               <LogOut className="size-4 mr-2" />
               Log out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
