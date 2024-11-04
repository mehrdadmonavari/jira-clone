import { getCurrent } from "@/features/auth/actions";
import { getWorkspaces } from "@/features/workspaces/actions";
// import { CreateWorkspaceForm } from "@/features/workspaces/components/create-workspace-form";
import { redirect, useRouter } from "next/navigation";

const DashboardPage = async () => {
   const user = await getCurrent();
   if (!user) redirect("/sign-in");

   const workspaces = await getWorkspaces();
   if (workspaces.total === 0) redirect("/workspaces/create");
   else redirect(`/workspaces/${workspaces.documents[0].$id}`);

   return <div className="bg-neutral-500 p-4">{/* <CreateWorkspaceForm /> */}</div>;
};

export default DashboardPage;
