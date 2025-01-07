import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type RequerstType = InferRequestType<(typeof client.api.tasks)[":taskId"]["$patch"]>;
type ResponseType = InferResponseType<
   (typeof client.api.tasks)[":taskId"]["$patch"],
   200
>;

export const useUpdateTask = () => {
   const queryClient = useQueryClient();

   const mutation = useMutation<ResponseType, Error, RequerstType>({
      mutationFn: async ({ json, param }) => {
         const response = await client.api.tasks[":taskId"]["$patch"]({ json, param });

         if (!response.ok) throw new Error("Faild to update task");

         return await response.json();
      },
      onSuccess: ({ data }) => {
         toast.success("task updated");
         queryClient.invalidateQueries({ queryKey: ["tasks"] });
         queryClient.invalidateQueries({ queryKey: ["task", data] });
      },
      onError: () => {
         toast.error("Faild to update task");
      },
   });

   return mutation;
};
