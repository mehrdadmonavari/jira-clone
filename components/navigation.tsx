import { cn } from "@/lib/utils";
import { SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { GoHome, GoHomeFill, GoCheckCircle, GoCheckCircleFill } from "react-icons/go";

const routes = [
   {
      label: "Home",
      href: "",
      icon: GoHome,
      activeIcone: GoHomeFill,
   },
   {
      label: "My Tasks",
      href: "/tasks",
      icon: GoCheckCircle,
      activeIcone: GoCheckCircleFill,
   },
   {
      label: "Settings",
      href: "/settings",
      icon: SettingsIcon,
      activeIcone: SettingsIcon,
   },
   {
      label: "Members",
      href: "/members",
      icon: UsersIcon,
      activeIcone: UsersIcon,
   },
];

interface NavigationProps {}

export const Navigation: React.FC<NavigationProps> = ({}) => {
   return (
      <ul className="flex flex-col">
         {routes.map((item) => {
            const isActive = false;
            const Icon = isActive ? item.activeIcone : item.icon;

            return (
               <Link key={item.href} href={item.href}>
                  <div
                     className={cn(
                        "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                        isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
                     )}>
                     <Icon className="size-5 text-neutral-500" />
                     {item.label}
                  </div>
               </Link>
            );
         })}
      </ul>
   );
};
