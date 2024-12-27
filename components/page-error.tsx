import { AlertTriangle } from "lucide-react";
import React from "react";

interface PageErrorProps {
   message?: string;
}

export const PageError: React.FC<PageErrorProps> = ({ message = "Something went wrong" }) => {
   return (
      <div className="h-full flex flex-col justify-center items-center">
         <AlertTriangle className="size-6 mb-2 text-muted-foreground" />
         <p className="font-medium text-sm text-muted-foreground">{message}</p>
      </div>
   );
};
