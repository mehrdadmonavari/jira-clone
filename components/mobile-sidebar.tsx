"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";

interface MobileSidebarProps {}

export const MobileSidebar: React.FC<MobileSidebarProps> = ({}) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const pathname = usePathname();

   useEffect(() => {
      setIsOpen(false);
   }, [pathname]);

   return (
      <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
         <SheetTrigger asChild>
            <Button variant="secondary" className="lg:hidden">
               <MenuIcon className="size-4 text-neutral-500" />
            </Button>
         </SheetTrigger>
         <SheetContent side="left" className="p-0">
            <Sidebar />
         </SheetContent>
      </Sheet>
   );
};
