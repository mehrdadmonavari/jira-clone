import { getCurrent } from "@/features/auth/queries";
import { getWorkspaceInfo } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import React from "react";

interface WorkspaceIdJoinPageProps {
   params: {
      workspaceId: string;
   };
}

const WorkspaceIdJoinPage: React.FC<WorkspaceIdJoinPageProps> = async ({ params }) => {
   const user = await getCurrent();
   if (!user) redirect("/sign-in");

   const workspace = await getWorkspaceInfo({
      workspaceId: params.workspaceId,
   });

   return <div>{JSON.stringify(workspace)}</div>;
};

export default WorkspaceIdJoinPage;
