import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { TaskIdClient } from "./client";

interface TaskIdPageProps {}

const TaskIdPage: React.FC<TaskIdPageProps> = async ({}) => {
   const user = await getCurrent();
   if (!user) redirect("/sign-in");

   return <TaskIdClient />;
};

export default TaskIdPage;
