import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";
import React from "react";

interface WorkspaceIdPageProps {}

const WorkspaceIdPage: React.FC<WorkspaceIdPageProps> = async ({}) => {
   const user = await getCurrent();
   if (!user) redirect("/sign-in");

   return <div>
      workspace ID
   </div>;
};

export default WorkspaceIdPage;
