"use client";

import { Button } from "@/components/ui/button";
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from "@/features/auth/api/use-logout";
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

   return (
      <div className="flex flex-col justify-center items-center text-2xl text-center py-8">
         this is vislble obly to outhorized users. if your not, you will redirect to
         signUp/signIn page.
         <Button onClick={() => mutate()} className="px-6 mt-4">
            logout
         </Button>
      </div>
   );
}
