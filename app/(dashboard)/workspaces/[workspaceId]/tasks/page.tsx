import { getCurrent } from "@/features/auth/queries";
import { TasksViewSwitcher } from "@/features/tasks/components/tasks-view-switcher";
import { redirect } from "next/navigation";
import React from "react";

interface TasksPageProps {}

const TasksPage: React.FC<TasksPageProps> = async ({}) => {
   const user = await getCurrent();
   if (!user) redirect("/sign-in");

   return (
      <div className="h-full flex flex-col">
         <TasksViewSwitcher />
      </div>
   );
};

export default TasksPage;
