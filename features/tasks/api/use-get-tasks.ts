import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { TaskStatus } from "../types";

interface useGetTasksProps {
   workspaceId: string;
   projectId?: string | null;
   status?: TaskStatus | null;
   search?: string | null;
   assigneeId?: string | null;
   dueDate?: string | null;
}

export const useGetTasks = ({
   workspaceId,
   projectId,
   status,
   search,
   assigneeId,
   dueDate,
}: useGetTasksProps) => {
   const query = useQuery({
      queryKey: ["tasks", workspaceId, projectId, status, search, assigneeId, dueDate],
      queryFn: async () => {
         const response = await client.api.tasks.$get({
            query: {
               workspaceId,
               projectId: projectId ?? undefined,
               status: status ?? undefined,
               search: search ?? undefined,
               assigneeId: assigneeId ?? undefined,
               dueDate: dueDate ?? undefined,
            },
         });

         if (!response.ok) throw new Error("Faild to fetch workspaces");

         const { data } = await response.json();

         return data;
      },
   });

   return query;
};
