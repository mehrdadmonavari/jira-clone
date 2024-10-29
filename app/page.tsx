"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
import { UserButton } from "@/features/auth/components/user-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
   const router = useRouter();
   const { data, isLoading } = useCurrent();
   const { mutate } = useLogout();

   useEffect(() => {
      if (!data && !isLoading) router.push("/sign-in");
   }, [data]);

   if (isLoading)
      <div className="flex justify-center items-center text-2xl text-center py-10">
         Loading ...
      </div>;

   return <UserButton />;
}
