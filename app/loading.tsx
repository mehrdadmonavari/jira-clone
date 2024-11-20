"use client";

import { Loader } from "lucide-react";
import React from "react";

const LoadingPage: React.FC = () => {
   return (
      <div className="h-screen flex flex-col gap-y-4 justify-center items-center">
         <Loader className="size-6 animate-spin" />
      </div>
   );
};

export default LoadingPage;
