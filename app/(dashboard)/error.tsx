"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage: React.FC = () => {
   return (
      <div className="flex flex-col gap-y-4 justify-center items-center mt-48 md:mt-64">
         <AlertTriangle className="size-6" />
         <p className="text-sm">Somthing went wrong</p>
         <Button variant="secondary" size="sm">
            <Link href="/">back to home</Link>
         </Button>
      </div>
   );
};

export default ErrorPage;
