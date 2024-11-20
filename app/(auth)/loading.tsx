"use client";

import { Loader } from "lucide-react";
import React from "react";

const LoadingPage: React.FC = () => {
   return (
      <div className="flex flex-col gap-y-4 justify-center items-center mt-48 md:mt-64">
         <Loader className="size-6 animate-spin" />
      </div>
   );
};

export default LoadingPage;
