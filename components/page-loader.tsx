import { Loader } from "lucide-react";
import React from "react";

export const PageLoader: React.FC = () => {
   return (
      <div className="h-[70vh] flex justify-center items-center">
         <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
   );
};
