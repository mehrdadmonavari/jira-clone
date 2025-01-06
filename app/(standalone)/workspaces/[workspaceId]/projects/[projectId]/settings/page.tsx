import React from "react";
import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { ProjectIdSettingsClient } from "./client";

const ProjectIdSettingsPage: React.FC = async ({}) => {
   const user = getCurrent();
   if (!user) redirect("/sign-in");

   return <ProjectIdSettingsClient />;
};

export default ProjectIdSettingsPage;
