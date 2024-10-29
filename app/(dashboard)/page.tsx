import { getCurrent } from "@/features/auth/actions";
import { UserButton } from "@/features/auth/components/user-button";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
   const user = await getCurrent();

   if (!user) redirect("/sign-in");

   return <UserButton />;
};

export default DashboardPage;
