import React from "react";
import { UserButton } from "@/features/auth/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { NavbarTitle } from "./navbar-title";

interface Navbar {}

export const Navbar: React.FC<Navbar> = ({}) => {
   return (
      <nav className="pt-4 px-6 flex justify-between items-center">
         <NavbarTitle />
         <MobileSidebar />
         <UserButton />
      </nav>
   );
};
