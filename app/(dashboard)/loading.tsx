import { Loader } from "lucide-react";
import React from "react";

interface DashboardLoadingProps {}

const DashboardLoading: React.FC<DashboardLoadingProps> = ({}) => {
   return (
      <div className="min-h-screen flex justify-center items-center">
         <Loader className="size-10 animate-spin text-muted-foreground" />
      </div>
   );
};

export default DashboardLoading;
