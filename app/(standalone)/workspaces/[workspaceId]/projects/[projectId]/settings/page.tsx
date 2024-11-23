import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import React from "react";

interface ProjectIdSettingsPageProps {
   params: {
      workspaceId: string;
      projectId: string;
   };
}

const ProjectIdSettingsPage: React.FC<ProjectIdSettingsPageProps> = async ({
   params: { workspaceId, projectId },
}) => {
   const user = getCurrent();
   if (!user) redirect("/sign-in");

   const workspace = await getWorkspace({ workspaceId });
   if (!workspace) throw new Error("Workspace not found");

   const initialValues = await getProject({ projectId });
   if (!initialValues) throw new Error("Project not found");

   return (
      <div className="w-full lg:max-w-xl">
         <EditProjectForm initialValues={initialValues} />
      </div>
   );
};

export default ProjectIdSettingsPage;
