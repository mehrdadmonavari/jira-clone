"use client"

import React from "react";
import { usePathname } from "next/navigation";

const pathnameMap = {
   tasks: {
      title: "my tasks",
      description: "View all of your tasks here",
   },
   projects: {
      title: "My Project",
      description: "View tasks of your project here",
   },
};

const defaultMap = {
   title: "home",
   description: "monitor all of your projects and tasks here",
};

export const NavbarTitle: React.FC = ({}) => {
   const pathname = usePathname();
   const pathnameParts = pathname.split("/");
   const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;

   const { title, description } = pathnameMap[pathnameKey] || defaultMap;

   return (
      <div className="lg:flex flex-col hidden">
         <h1 className="text-2xl font-semibold">{title}</h1>
         <p className="text-muted-foreground">{description}</p>
      </div>
   );
};
