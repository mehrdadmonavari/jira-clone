import { UserButton } from "@/features/auth/components/user-button";
import React from "react";
import { MobileSidebar } from "./mobile-sidebar";

interface Navbar {}

export const Navbar: React.FC<Navbar> = ({}) => {
   return (
      <nav className="pt-4 px-6 flex justify-between items-center">
         <div className="lg:flex flex-col hidden">
            <h1 className="text-2xl font-semibold">Home</h1>
            <p className="text-muted-foreground">
               Monitor all of your projects and tasks here
            </p>
         </div>
         <MobileSidebar />
         <UserButton />
      </nav>
   );
};
