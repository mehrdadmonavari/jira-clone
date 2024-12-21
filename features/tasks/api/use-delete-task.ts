import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.tasks)[":taskId"]["$delete"]>;
type ResponseType = InferResponseType<
   (typeof client.api.tasks)[":taskId"]["$delete"],
   200
>;

export const useDeleteTask = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ param }) => {
         const response = await client.api.tasks[":taskId"]["$delete"]({ param });

         if (!response.ok) throw new Error("Faild to delete task");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("task deleted");
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
         queryClient.invalidateQueries({ queryKey: ["task", data.$id] });
      },
      onError: () => {
         toast.error("Faild to delete task");
      },
   });

   return mutation;
};
