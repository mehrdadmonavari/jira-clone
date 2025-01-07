import React from "react";
import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { WorkspaceIdJoinClient } from "./client";

const WorkspaceIdJoinPage: React.FC = async () => {
   const user = await getCurrent();
   if (!user) redirect("/sign-in");

   return <WorkspaceIdJoinClient />;
};

export default WorkspaceIdJoinPage;
