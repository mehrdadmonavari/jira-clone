import { getCurrent } from "@/features/auth/actions";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
   const user = await getCurrent();

   if (!user) redirect("/sign-in");

   return <div>This is a home page</div>;
};

export default DashboardPage;
